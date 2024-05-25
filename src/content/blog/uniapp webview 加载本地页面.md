---
title: "uniapp webview 加载本地页面"
pubDate: 2024-05-25
draft: false
description: "uniapp webview 加载本地页面"
tags: ["uniapp"]
---

uniapp 加载本地页面或者下载 cdn zip 包，解压加载

使用 uniapp 插件 wrs-httpserver，插件市场下载，要收费，以后有空自己写

```javascript
httpServer.serverRunning("dataosha");

// process.env.NODE_ENV 判断环境
```

httpServer.js

```javascript
import $mConfig from "@/config/index.config.js";
var HttpServer = (function () {
  var instance;

  function init() {
    // 单例对象的初始化代码
    return {
      wrsHttpserver: uni.requireNativePlugin("wrs-httpserver"),
      startServer: function (callback) {
        // 方法实现
        String.prototype.endWith = function (endStr) {
          let d = this.length - endStr.length;
          return d >= 0 && this.lastIndexOf(endStr) == d;
        };
        // _www ,_doc,_documents,_downloads
        var staticWebs = [];
        var paths = ["_www", "_downloads"];
        for (var i = 0; i < paths.length; i++) {
          var path = paths[i];
          var absPath = plus.io.convertLocalFileSystemURL(path);
          // Android获取的absPath以/结尾，iOS获取的absPath不是/结尾
          if (absPath.endWith("/")) {
            absPath = absPath.substring(0, absPath.length - 1);
          }
          switch (i) {
            // _www
            case 0:
              break;
            // _downloads
            case 1:
              {
                staticWebs.push(
                  {
                    urlPath: "/dataosha", // 站点请求的url
                    directoryPath: absPath + "/dataosha", // web站点文件绝对路径，这个路径是绝对路径
                  },
                  {
                    urlPath: "/maoshen", // 站点请求的url
                    directoryPath: absPath + "/maoshen", // web站点文件绝对路径，这个路径是绝对路径
                  },
                  {
                    urlPath: "/fortuneCat", // 站点请求的url
                    directoryPath: absPath + "/fortuneCat", // web站点文件绝对路径，这个路径是绝对路径
                  },
                  {
                    urlPath: "/catHaulingHouse", // 站点请求的url
                    directoryPath: absPath + "/catHaulingHouse", // web站点文件绝对路径，这个路径是绝对路径
                  }
                );
              }
              break;
            default:
              break;
          }
          console.log("path:" + path + "  绝对路径:" + absPath);
        }
        // var appid = plus.runtime.appid;
        var params = {
          port: 8030, // 端口
          staticWebs: staticWebs,
        };
        // 启动http service
        this.wrsHttpserver.startServer(params, (resp) => {
          if (resp.code == 0) {
            callback && callback(true);
          } else {
            console.log("httpServer启动失败:" + resp.msg);
            callback && callback(false);
          }
        });
      },
      stopServer: function () {
        this.wrsHttpserver.stopServer();
      },
      serverRunning: function (name) {
        console.log("serverRunning==>", this.wrsHttpserver);
        var obj = this.wrsHttpserver.isRuning();
        if (obj.isRuning) {
          console.log("httpServer服务正在运行");
          this.navigate(true, name);
        } else {
          console.log("httpServer服务没有运行");
          this.startServer((isSuc) => {
            console.log("httpServer服务开启运行");
            this.navigate(isSuc, name);
          });
        }
      },
      flag: true,
      navigate: async function (isSuc, name) {
        if (!this.flag) return;
        this.flag = false;
        setTimeout(() => {
          this.flag = true;
        }, 500);
        if (!isSuc) {
          // 本地服务没启动
          this.jumpCdn(name);
        } else {
          // 本地服务启动
          uni.request({
            url: `${
              $mConfig.hostUrl
            }/${name}/package/version.json?t=${new Date().getTime()}`,
            success: (onlineRes) => {
              console.log("游戏线上版本：", onlineRes.data.stamp);
              if (onlineRes.data.type && onlineRes.data.type == 2) {
                this.jumpCdn(name);
              } else {
                const version = `http://127.0.0.1:8030/${name}/package/version.json?t=${new Date().getTime()}`;
                uni.request({
                  url: version, //仅为示例，并非真实接口地址。
                  success: (localRes) => {
                    console.log("游戏本地版本：", localRes.data.stamp);
                    if (!localRes.data.stamp) {
                      this.jumpCdn(name);
                      this.downLoad(name);
                    } else {
                      if (onlineRes.data.stamp > localRes.data.stamp) {
                        this.jumpCdn(name);
                        this.downLoad(name);
                      } else {
                        this.jumpLocal(name);
                      }
                    }
                  },
                  fail: (err) => {
                    console.log("获取内部游戏版本失败", err);
                    this.jumpCdn(name);
                  },
                });
              }
            },
          });
        }
      },
      jumpCdn(name) {
        const url = `/pages/webview/webview?url=${
          $mConfig.hostUrl
        }/${name}/index.html?t=${new Date().getTime()}`;
        console.log("打开cdn:", url);
        uni.navigateTo({
          url: url,
        });
      },
      jumpLocal(name) {
        const url = `/pages/webview/webview?url=http://127.0.0.1:8030/${name}/index.html?t=${new Date().getTime()}`;
        console.log("打开本地:", url);
        uni.navigateTo({
          url: url,
        });
      },
      downLoad(name) {
        uni.downloadFile({
          url: `${$mConfig.hostUrl}/${name}/package/web.zip`, //仅为示例，并非真实的资源
          success: (res) => {
            if (res.statusCode === 200) {
              console.log("下载成功");
              var zipfile = res.tempFilePath;
              // 下载后的压缩文件解压到_downloads目录
              var targetPath = `_downloads/${name}`;
              var absPath = plus.io.convertLocalFileSystemURL(targetPath);
              // 经测试，修正在华为Android 10的系统上解压的解压目录，Android上使用绝对路径
              switch (uni.getSystemInfoSync().platform) {
                case "android":
                  targetPath = plus.io.convertLocalFileSystemURL(targetPath);
                  break;
                case "ios":
                  targetPath = `_downloads/${name}`;
                  break;
                default:
                  break;
              }
              plus.zip.decompress(
                zipfile,
                targetPath,
                function () {
                  var path = plus.io.convertLocalFileSystemURL(targetPath);
                  console.log("解压成功绝对路径:" + path);
                  // this.startServer();
                  const version = `http://127.0.0.1:8030/${name}/package/version.json?t=${new Date().getTime()}`;
                  uni.request({
                    url: version, //仅为示例，并非真实接口地址。
                    success: (localRes) => {
                      console.log("游戏本地版本：", localRes.data.stamp);
                    },
                    fail: (err) => {
                      console.log("获取内部游戏版本失败", err);
                    },
                  });
                },
                function (error) {
                  console.log("解压解压失败：" + error);
                }
              );
            } else {
              console.log("下载失败");
            }
          },
        });
      },
    };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }
      return instance;
    },
  };
})();

// 使用单例对象
export var httpServer = HttpServer.getInstance();
```

webview.vue

```vue
<template>
  <view style="background: #2b335e">
    <web-view
      ref="webView"
      class="web"
      :src="src"
      style="background: #2b335e"
      :webview-styles="webviewStyles"
      @message="handleMessage"
    ></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentWebview: null,
      wv: null,
      src: "",
      webviewStyles: {
        background: "rgb(43 51 94)",
      },
    };
  },
  created() {
    console.log("开启webview");
  },
  desotryed() {
    console.log("关闭webview");
  },
  onLoad(options) {
    console.log("===onLoad===");
    if (options && options.url) {
      this.src = options.url;
      // this.$store.commit('setWebviewStatus', 1);
      console.log("打开的页面是：", this.src);
    }
  },
  onUnload() {
    // this.$store.commit('setWebviewStatus', 0);
  },
  onReady() {
    console.log("===onReady===");
    // #ifdef APP-PLUS
    this.currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
    setTimeout(() => {
      this.wv = this.currentWebview.children()[0];
      console.log("wv1", this.wv);
    }, 200); //如果是页面初始化调用时，需要延时一下
    // #endif
  },
  onShow() {
    console.log("===onShow===");
  },

  methods: {
    handleMessage(evt) {
      if (!this.wv) {
        this.wv = this.currentWebview.children()[0];
        if (!this.wv) {
          this.$mHelper.toast(`handleMessage error:${this.wv}`);
          return;
        }
      }
      // console.log('evt.detail==>', evt.detail);
      // console.log('wv2==>', this.wv);
      const actionName = evt.detail.data[0].actionName;
      const callBackFunctionName = evt.detail.data[0].callBackFunctionName;
      const params = evt.detail.data[0].params;
      switch (actionName) {
        case "uni_getCommonHeader":
          this.wv.evalJS(
            `${callBackFunctionName}(${JSON.stringify(this.$http.config)})`
          );
          break;
        case "uni_openPage":
          console.log("===", params.url);
          uni.navigateTo({
            url: "/pages/webview/subWebview?url=" + params.url,
          });
          break;
        case "uni_request":
          this.$http
            .post(params.url, params.data)
            .then((res) => {
              this.wv.evalJS(`${callBackFunctionName}(${JSON.stringify(res)})`);
            })
            .catch((err) => {
              this.$mHelper.toast(`${err}`);
            });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
```

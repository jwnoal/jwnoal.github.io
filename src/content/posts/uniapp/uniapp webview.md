---
title: "uniapp webview与h5交互"
published: 2023-11-18
draft: false
description: "uniapp webview与h5交互"
tags: ["uniapp"]
category: "代码"
---

```js
<template>
	<view style="background: #2b335e">
		<web-view ref="webView" class="web" :src="mySrc" @message="handleMessage"
			:webview-styles="webviewStyles"></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wv: null,
				mySrc: '',
				webviewStyles: {
					progress: false,
					top: uni.getSystemInfoSync().statusBarHeight,
					height: uni.getSystemInfoSync().screenHeight - uni.getSystemInfoSync().statusBarHeight,
				},
		};
	},
	created() {
		console.log('开启webview');
	},
	desotryed() {
		console.log('关闭webview');
	},
	onLoad(options) {
		console.log('===onLoad===');
		if (options && options.url) {
			this.mySrc = options.url;
			console.log('打开的页面是：', this.mySrc);
		}
	},
	onUnload() {
		// this.$store.commit('setWebviewStatus', 0);
	},
	onReady() {
		console.log("===onReady===");
			// #ifdef APP-PLUS
			this.currentWebview = this.$scope
				.$getAppWebview();
			setTimeout(() => {
				this.wv = this.currentWebview.children()[0];
				console.log("wv", this.wv);
			}, 1000); //如果是页面初始化调用时，需要延时一下
			// #endif
	},
	onShow() {
		console.log('===onShow===');
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
			const actionName = evt.detail.data[0].actionName;
			const callBackFunctionName = evt.detail.data[0].callBackFunctionName;
			const params = evt.detail.data[0].params;
			switch (actionName) {
				case 'uni_getCommonHeader':
					this.wv.evalJS(
						`${callBackFunctionName}(${JSON.stringify(this.$http.config)})`
					);
					break;
				case 'uni_openPage':
					console.log('===', params.url)
					uni.navigateTo({
						url: '/pages/webview/subWebview?url=' + encodeURIComponent(params.url),
					});
					break;
				case 'uni_request':
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

### h5 部分

pMessage.ts  
uni.webview.1.5.4.js：
https://gitcode.net/dcloud/hello-uni-app-x/-/blob/alpha/hybrid/html/uni.webview.1.5.5.js

```js
import * as uni from "./uni.webview.1.5.4.js";

onMounted(() => {
  nextTick(() => {
    document.addEventListener("UniAppJSBridgeReady", function () {
      console.log("UniAppJSBridgeReady");
      (window as any).uni.webView.getEnv((res: any) => {
        console.log("getEnv", res); // { plus: true }
        if (res.plus) {
        //   useGlobalStore().setUapp(true);
        }
      });
    });
  });
});

export const pMessage = (name, params) => {
  return new Promise((resolve) => {
    const windowName = `window_${name}_${params?.name}_${new Date().getTime()}`;
    // console.log("发送：", params.url || name);
    window[windowName] = (res) => {
      window[windowName] = null;
      // console.log("收到：", params.url || name, res);
      resolve(res);
    };
    uni.postMessage({
      data: {
        actionName: name,
        callBackFunctionName: windowName,
        params: params,
      },
    });
  });
};

export const navigateBack = () => {
  uni.navigateBack();
};
```

---
title: 'uniapp webview'
pubDate: 2023-11-18
draft: false
description: "uniapp webview"
tags: ["uniapp"]
---

```
<template>
	<view>
		<web-view
			ref="webView"
			style="background-color: #333"
			:webview-styles="webviewStyles"
			class="web"
			:src="url"
			@message="handleMessage"
		></web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wv: null,
			url: '',
			webviewStyles: {
				background: 'rbg(48,57,102)',
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
			this.url = options.url;
			// this.$store.commit('setWebviewStatus', 1);
			console.log('打开的页面是：', this.url);
		}
	},
	onUnload() {
		// this.$store.commit('setWebviewStatus', 0);
	},
	onReady() {
		console.log('===onReady===');
		// #ifdef APP-PLUS
		var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效
		setTimeout(() => {
			this.wv = currentWebview.children()[0];
			console.log('wv1', this.wv);
		}, 0); //如果是页面初始化调用时，需要延时一下
		// #endif
	},
	onShow() {
		console.log('===onShow===');
	},

	methods: {
		handleMessage(evt) {
			console.log('evt.detail==>', evt.detail);
			console.log('wv2==>', this.wv);
			switch (evt.detail.data[0].actionName) {
				case 'uni_getCommonHeader':
					this.wv.evalJS(
						"window_uni_getCommonHeader('" +
							JSON.stringify(this.$http.config) +
							"')"
					);
					break;
				case 'uni_openPage':
					console.log('打开新的webview', evt.detail.data[0].params.url);
					uni.navigateTo({
						url:
							'/pages/webview/subWebview?url=' + evt.detail.data[0].params.url,
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
```
import * as uni from "./uni.webview.1.5.4.js";
uni.getEnv(function (res) {
  console.log("当前环境：" + JSON.stringify(res));
});

export const pMessage = (name, params) => {
  return new Promise((resolve) => {
    window[`window_${name}`] = (res) => {
      resolve(res);
    };
    uni.postMessage({
      data: {
        actionName: name,
        params: params,
      },
    });
  });
};

export const navigateBack = () => {
  uni.navigateBack();
};

```

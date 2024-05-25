---
title: 'uniappX app空架子'
pubDate: 2024-05-25
draft: false
description: "uniappX app空架子"
tags: ["uniapp"]
---

#### 创建uniapp x项目
![](https://cdn.jiangwei.zone/blog/20240525122718.png)

#### 创建页面
pages/index/index.uvue  
```vue
<template>
	<view class="content" :style="{'padding-top': safeAreaTop +'px'}">
		<web-view src="https://baidu.com" @message="handdleMessage" :webview-styles='webviewStyles'>
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '',
				safeAreaTop: 0,
				webviewStyles: {
					progress: false
				},
				webviewContext: null as WebviewContext | null,
			}
		},
		onLoad() {
			console.log('onLoad');
			// 获取应用包信息
		},
		onReady() {
			console.log('onReady');
			// #ifdef APP
			// TODO web 实现createWebviewContext
			this.webviewContext = uni.createWebviewContext('web-view', this)
			// #endif
		},
		created() {
			console.log('created');
			const systemInfo = uni.getSystemInfoSync()
			this.safeAreaTop = systemInfo.safeArea.top
		},
		mounted() {
			console.log('mounted');
		},
		methods: {
			testAlert() {
				this.webviewContext?.evalJS("alert('hello uni-app x')");
			},
			handdleMessage(event : UniWebViewMessageEvent) {
				console.log(event.detail.data);
				const data = event.detail.data;
				const actionName = data[0].get('actionName');
				const params : UTSJSONObject = data[0].get('params') as UTSJSONObject;
				switch (actionName) {
					case 'uni_openPage':
						const url : string = params.get('url') as string;
						uni.navigateTo({ url: '/pages/webview/index?url=' + encodeURIComponent(url) });
						break;

				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.content {
		height: 100%;
		background-color: #090817;
	}
</style>
```
pages/webview/index.uvue
```vue
<template>
	<view class="content">
		<web-view :src="src">
		</web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: '',
				// safeAreaTop: 0,
				webviewContext: null as WebviewContext | null,
			}
		},
		onLoad(options) {
			console.log('===onLoad===');
			this.src = options['url'] ?? '';
			console.log('打开的页面是：', this.src);
		},
		onReady() {
			// #ifdef APP
			// TODO web 实现createWebviewContext
			this.webviewContext = uni.createWebviewContext('web-view', this)
			// #endif
		},
		created() {
			// this.safeAreaTop = uni.getSystemInfoSync().safeArea.top
		},
		methods: {

		}
	}
</script>

<style scoped lang="scss">
	.content {
		height: 100%;
		background-color: #090817;
	}
</style>
```

pages.json  
```
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "",
				"navigationStyle": "custom",
				"backgroundColor": "#090817",
				"navigationBarBackgroundColor": "#090817",
				"navigationBarTextStyle": "black"

			}
		},
		{
			"path": "pages/webview/index",
			"style": {
				"navigationBarTitleText": "",
				"navigationStyle": "",
				"navigationBarBackgroundColor": "#ffffff"
				// "backgroundColor": "#090817"
				// "navigationBarTextStyle": "black"
		
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "uni-app x",
		"navigationBarBackgroundColor": "#090817",
		"backgroundColor": "#090817"
	},
	"uniIdRouter": {}
}
```


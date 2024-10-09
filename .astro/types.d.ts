declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"16personalities.md": {
	id: "16personalities.md";
  slug: "16personalities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"30-seconds-of-code.md": {
	id: "30-seconds-of-code.md";
  slug: "30-seconds-of-code";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"3500个常用字.md": {
	id: "3500个常用字.md";
  slug: "3500个常用字";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"MessageBus 单例.md": {
	id: "MessageBus 单例.md";
  slug: "messagebus-单例";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"NVM的使用.md": {
	id: "NVM的使用.md";
  slug: "nvm的使用";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"Svelte的写法记录.md": {
	id: "Svelte的写法记录.md";
  slug: "svelte的写法记录";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"androd打包免费生产证书.md": {
	id: "androd打包免费生产证书.md";
  slug: "androd打包免费生产证书";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"astro博客新增评论系统waline.md": {
	id: "astro博客新增评论系统waline.md";
  slug: "astro博客新增评论系统waline";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"canvas实现刮奖效果.md": {
	id: "canvas实现刮奖效果.md";
  slug: "canvas实现刮奖效果";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"charles 激活码计算器.md": {
	id: "charles 激活码计算器.md";
  slug: "charles-激活码计算器";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator tween动画.md": {
	id: "cocos/cocos creator tween动画.md";
  slug: "cocos/cocos-creator-tween动画";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 修改打包后的默认加载界面.md": {
	id: "cocos/cocos creator 修改打包后的默认加载界面.md";
  slug: "cocos/cocos-creator-修改打包后的默认加载界面";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 判断是否是调试模式.md": {
	id: "cocos/cocos creator 判断是否是调试模式.md";
  slug: "cocos/cocos-creator-判断是否是调试模式";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 坐标转换.md": {
	id: "cocos/cocos creator 坐标转换.md";
  slug: "cocos/cocos-creator-坐标转换";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 多点匀速运动.mdx": {
	id: "cocos/cocos creator 多点匀速运动.mdx";
  slug: "cocos/cocos-creator-多点匀速运动";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cocos/cocos creator 弹幕.mdx": {
	id: "cocos/cocos creator 弹幕.mdx";
  slug: "cocos/cocos-creator-弹幕";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cocos/cocos creator 快速替换所有字体.md": {
	id: "cocos/cocos creator 快速替换所有字体.md";
  slug: "cocos/cocos-creator-快速替换所有字体";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 新增打包自定义扩展.md": {
	id: "cocos/cocos creator 新增打包自定义扩展.md";
  slug: "cocos/cocos-creator-新增打包自定义扩展";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 模拟点击.md": {
	id: "cocos/cocos creator 模拟点击.md";
  slug: "cocos/cocos-creator-模拟点击";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 滑动屏幕更改相机位置.md": {
	id: "cocos/cocos creator 滑动屏幕更改相机位置.md";
  slug: "cocos/cocos-creator-滑动屏幕更改相机位置";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"cocos/cocos creator 获取不规则图形中的随机一个点.mdx": {
	id: "cocos/cocos creator 获取不规则图形中的随机一个点.mdx";
  slug: "cocos/cocos-creator-获取不规则图形中的随机一个点";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"cocos/cocos creator 贝塞尔曲线运动.mdx": {
	id: "cocos/cocos creator 贝塞尔曲线运动.mdx";
  slug: "cocos/cocos-creator-贝塞尔曲线运动";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"css 控制video control.md": {
	id: "css 控制video control.md";
  slug: "css-控制video-control";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"css 自定义字体.md": {
	id: "css 自定义字体.md";
  slug: "css-自定义字体";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"electron 重新定义Menu(禁用刷新，缩放，打开控制台).md": {
	id: "electron 重新定义Menu(禁用刷新，缩放，打开控制台).md";
  slug: "electron-重新定义menu禁用刷新缩放打开控制台";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"git 常用命令.md": {
	id: "git 常用命令.md";
  slug: "git-常用命令";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"github上重要的js仓库集合.md": {
	id: "github上重要的js仓库集合.md";
  slug: "github上重要的js仓库集合";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"h5 生成jwt.md": {
	id: "h5 生成jwt.md";
  slug: "h5-生成jwt";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"h5 页面失焦判断.md": {
	id: "h5 页面失焦判断.md";
  slug: "h5-页面失焦判断";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"h5使用pixi播放spine动画.md": {
	id: "h5使用pixi播放spine动画.md";
  slug: "h5使用pixi播放spine动画";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"input 数字框不显示箭头.md": {
	id: "input 数字框不显示箭头.md";
  slug: "input-数字框不显示箭头";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"input 的整理.md": {
	id: "input 的整理.md";
  slug: "input-的整理";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"js 保留几个汉字或字符.md": {
	id: "js 保留几个汉字或字符.md";
  slug: "js-保留几个汉字或字符";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"js 判断机型.md": {
	id: "js 判断机型.md";
  slug: "js-判断机型";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"js工具.md": {
	id: "js工具.md";
  slug: "js工具";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"js的一些好用的库.md": {
	id: "js的一些好用的库.md";
  slug: "js的一些好用的库";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mac 使用adb.md": {
	id: "mac 使用adb.md";
  slug: "mac-使用adb";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"matter.js实现重力小球.md": {
	id: "matter.js实现重力小球.md";
  slug: "matterjs实现重力小球";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pc 滚动条不占位.md": {
	id: "pc 滚动条不占位.md";
  slug: "pc-滚动条不占位";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"sentry 监控系统.md": {
	id: "sentry 监控系统.md";
  slug: "sentry-监控系统";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shell 生成文件.md": {
	id: "shell 生成文件.md";
  slug: "shell-生成文件";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tab快速点击数据串的问题.md": {
	id: "tab快速点击数据串的问题.md";
  slug: "tab快速点击数据串的问题";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ts 集合.md": {
	id: "ts 集合.md";
  slug: "ts-集合";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ts实现Window自定义方法不报错.md": {
	id: "ts实现Window自定义方法不报错.md";
  slug: "ts实现window自定义方法不报错";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp setup 中写onload和onReachBottom.md": {
	id: "uniapp/uniapp setup 中写onload和onReachBottom.md";
  slug: "uniapp/uniapp-setup-中写onload和onreachbottom";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp webview 加载本地页面.md": {
	id: "uniapp/uniapp webview 加载本地页面.md";
  slug: "uniapp/uniapp-webview-加载本地页面";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp webview.md": {
	id: "uniapp/uniapp webview.md";
  slug: "uniapp/uniapp-webview";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp xcode安装ipa.md": {
	id: "uniapp/uniapp xcode安装ipa.md";
  slug: "uniapp/uniapp-xcode安装ipa";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 使用unibest搭建项目框架.md": {
	id: "uniapp/uniapp 使用unibest搭建项目框架.md";
  slug: "uniapp/uniapp-使用unibest搭建项目框架";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 小程序使用unocss.md": {
	id: "uniapp/uniapp 小程序使用unocss.md";
  slug: "uniapp/uniapp-小程序使用unocss";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 小程序实现图片上传和删除.md": {
	id: "uniapp/uniapp 小程序实现图片上传和删除.md";
  slug: "uniapp/uniapp-小程序实现图片上传和删除";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 小程序实现微信支付功能.md": {
	id: "uniapp/uniapp 小程序实现微信支付功能.md";
  slug: "uniapp/uniapp-小程序实现微信支付功能";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 小程序实现订阅通知功能.md": {
	id: "uniapp/uniapp 小程序实现订阅通知功能.md";
  slug: "uniapp/uniapp-小程序实现订阅通知功能";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 小程序获取位置.md": {
	id: "uniapp/uniapp 小程序获取位置.md";
  slug: "uniapp/uniapp-小程序获取位置";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 开发的微信小程序获取头像昵称.md": {
	id: "uniapp/uniapp 开发的微信小程序获取头像昵称.md";
  slug: "uniapp/uniapp-开发的微信小程序获取头像昵称";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 微信授权登录.md": {
	id: "uniapp/uniapp 微信授权登录.md";
  slug: "uniapp/uniapp-微信授权登录";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 拉起QQ.md": {
	id: "uniapp/uniapp 拉起QQ.md";
  slug: "uniapp/uniapp-拉起qq";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 接阿里的人脸认证.md": {
	id: "uniapp/uniapp 接阿里的人脸认证.md";
  slug: "uniapp/uniapp-接阿里的人脸认证";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 支付宝授权登录（提现）.md": {
	id: "uniapp/uniapp 支付宝授权登录（提现）.md";
  slug: "uniapp/uniapp-支付宝授权登录提现";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp 遇到的问题.md": {
	id: "uniapp/uniapp 遇到的问题.md";
  slug: "uniapp/uniapp-遇到的问题";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniappX  app空架子.md": {
	id: "uniapp/uniappX  app空架子.md";
  slug: "uniapp/uniappx--app空架子";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/uniapp网页端使用pixi播放spine动画.md": {
	id: "uniapp/uniapp网页端使用pixi播放spine动画.md";
  slug: "uniapp/uniapp网页端使用pixi播放spine动画";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"uniapp/unicloud 多表联查.md": {
	id: "uniapp/unicloud 多表联查.md";
  slug: "uniapp/unicloud-多表联查";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"unity笔记.md": {
	id: "unity笔记.md";
  slug: "unity笔记";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vscode 插件.md": {
	id: "vscode 插件.md";
  slug: "vscode-插件";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vite vue3上线配置.md": {
	id: "vue/vite vue3上线配置.md";
  slug: "vue/vite-vue3上线配置";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vite vue3使用unocss.md": {
	id: "vue/vite vue3使用unocss.md";
  slug: "vue/vite-vue3使用unocss";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vite 打包上线后文件因缓存报错.md": {
	id: "vue/vite 打包上线后文件因缓存报错.md";
  slug: "vue/vite-打包上线后文件因缓存报错";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vite 打包图片压缩插件.md": {
	id: "vue/vite 打包图片压缩插件.md";
  slug: "vue/vite-打包图片压缩插件";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue axios封装.md": {
	id: "vue/vue axios封装.md";
  slug: "vue/vue-axios封装";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue css变量.md": {
	id: "vue/vue css变量.md";
  slug: "vue/vue-css变量";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue svg组件(webpack).md": {
	id: "vue/vue svg组件(webpack).md";
  slug: "vue/vue-svg组件webpack";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue 不定高度瀑布流组件.md": {
	id: "vue/vue 不定高度瀑布流组件.md";
  slug: "vue/vue-不定高度瀑布流组件";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue 事件参数带even和自定义参数.md": {
	id: "vue/vue 事件参数带even和自定义参数.md";
  slug: "vue/vue-事件参数带even和自定义参数";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue 滑动头部渐变背景.md": {
	id: "vue/vue 滑动头部渐变背景.md";
  slug: "vue/vue-滑动头部渐变背景";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue 组件递归调用自己.md": {
	id: "vue/vue 组件递归调用自己.md";
  slug: "vue/vue-组件递归调用自己";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue 路由缓存.md": {
	id: "vue/vue 路由缓存.md";
  slug: "vue/vue-路由缓存";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue 路由返回不刷新.md": {
	id: "vue/vue 路由返回不刷新.md";
  slug: "vue/vue-路由返回不刷新";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue3 使用swiper.md": {
	id: "vue/vue3 使用swiper.md";
  slug: "vue/vue3-使用swiper";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue3.0的多种写法，你喜欢哪种呢？.md": {
	id: "vue/vue3.0的多种写法，你喜欢哪种呢？.md";
  slug: "vue/vue30的多种写法你喜欢哪种呢";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue全局toast组件.md": {
	id: "vue/vue全局toast组件.md";
  slug: "vue/vue全局toast组件";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue数据请求referrer为域名.md": {
	id: "vue/vue数据请求referrer为域名.md";
  slug: "vue/vue数据请求referrer为域名";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vue/vue虚拟列表.mdx": {
	id: "vue/vue虚拟列表.mdx";
  slug: "vue/vue虚拟列表";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"vue/控制台出现removed in Dart Sass 2.0.0.md": {
	id: "vue/控制台出现removed in Dart Sass 2.0.0.md";
  slug: "vue/控制台出现removed-in-dart-sass-200";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"websocket封装.md": {
	id: "websocket封装.md";
  slug: "websocket封装";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wechat 微信授权登录，并且下载app.md": {
	id: "wechat 微信授权登录，并且下载app.md";
  slug: "wechat-微信授权登录并且下载app";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"七牛云的云存储.md": {
	id: "七牛云的云存储.md";
  slug: "七牛云的云存储";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"使用chatgpt生成图片.md": {
	id: "使用chatgpt生成图片.md";
  slug: "使用chatgpt生成图片";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"使用github actions 部署到服务器.md": {
	id: "使用github actions 部署到服务器.md";
  slug: "使用github-actions-部署到服务器";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"使用picgo上传图片到七牛云.md": {
	id: "使用picgo上传图片到七牛云.md";
  slug: "使用picgo上传图片到七牛云";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"全键盘.md": {
	id: "全键盘.md";
  slug: "全键盘";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"公安备案接入服务商如何填写.md": {
	id: "公安备案接入服务商如何填写.md";
  slug: "公安备案接入服务商如何填写";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"准时的setTimeout.md": {
	id: "准时的setTimeout.md";
  slug: "准时的settimeout";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"创建与查看ssh.md": {
	id: "创建与查看ssh.md";
  slug: "创建与查看ssh";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"判断机型.md": {
	id: "判断机型.md";
  slug: "判断机型";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"原生js XMLHttpRequest.md": {
	id: "原生js XMLHttpRequest.md";
  slug: "原生js-xmlhttprequest";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"各种工具网站.md": {
	id: "各种工具网站.md";
  slug: "各种工具网站";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"在vscode中配置net core环境.md": {
	id: "在vscode中配置net core环境.md";
  slug: "在vscode中配置net-core环境";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"在博客中在线编辑vue.mdx": {
	id: "在博客中在线编辑vue.mdx";
  slug: "在博客中在线编辑vue";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"宝塔面板.md": {
	id: "宝塔面板.md";
  slug: "宝塔面板";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"常用的Sass.md": {
	id: "常用的Sass.md";
  slug: "常用的sass";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"微信公众号网页授权登录公用.md": {
	id: "微信公众号网页授权登录公用.md";
  slug: "微信公众号网页授权登录公用";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"微信公众号页面授权登录.md": {
	id: "微信公众号页面授权登录.md";
  slug: "微信公众号页面授权登录";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"微信公众号页面配置分享好友和朋友圈.md": {
	id: "微信公众号页面配置分享好友和朋友圈.md";
  slug: "微信公众号页面配置分享好友和朋友圈";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"微信小程序报错fail url not in domain list.md": {
	id: "微信小程序报错fail url not in domain list.md";
  slug: "微信小程序报错fail-url-not-in-domain-list";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"微信聊天机器人.md": {
	id: "微信聊天机器人.md";
  slug: "微信聊天机器人";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的错题.md": {
	id: "我的错题.md";
  slug: "我的错题";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/1.来到魔法世界.md": {
	id: "我的魔法不太一样/1.来到魔法世界.md";
  slug: "我的魔法不太一样/1来到魔法世界";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/2.魔法起源.md": {
	id: "我的魔法不太一样/2.魔法起源.md";
  slug: "我的魔法不太一样/2魔法起源";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/3.回不去了.md": {
	id: "我的魔法不太一样/3.回不去了.md";
  slug: "我的魔法不太一样/3回不去了";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/4.觉醒.md": {
	id: "我的魔法不太一样/4.觉醒.md";
  slug: "我的魔法不太一样/4觉醒";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/5.开始冥想.md": {
	id: "我的魔法不太一样/5.开始冥想.md";
  slug: "我的魔法不太一样/5开始冥想";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/6.完成第一个魔法.md": {
	id: "我的魔法不太一样/6.完成第一个魔法.md";
  slug: "我的魔法不太一样/6完成第一个魔法";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"我的魔法不太一样/7.暗影钉.md": {
	id: "我的魔法不太一样/7.暗影钉.md";
  slug: "我的魔法不太一样/7暗影钉";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"搜索引擎收录地址.md": {
	id: "搜索引擎收录地址.md";
  slug: "搜索引擎收录地址";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"搭建vite2.0+vue3.0+ts+多页面打包+多环境+gzip+图片压缩框架.md": {
	id: "搭建vite2.0+vue3.0+ts+多页面打包+多环境+gzip+图片压缩框架.md";
  slug: "搭建vite20vue30ts多页面打包多环境gzip图片压缩框架";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"浏览器兼容性问题.md": {
	id: "浏览器兼容性问题.md";
  slug: "浏览器兼容性问题";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"浏览器禁止双指或点击放大.md": {
	id: "浏览器禁止双指或点击放大.md";
  slug: "浏览器禁止双指或点击放大";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"演唱会抢票.md": {
	id: "演唱会抢票.md";
  slug: "演唱会抢票";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"移动端最新适配方案pxtoviewport.md": {
	id: "移动端最新适配方案pxtoviewport.md";
  slug: "移动端最新适配方案pxtoviewport";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"移动端滑动穿透方案及demo.md": {
	id: "移动端滑动穿透方案及demo.md";
  slug: "移动端滑动穿透方案及demo";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"移动端适配方案pxtorem.md": {
	id: "移动端适配方案pxtorem.md";
  slug: "移动端适配方案pxtorem";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"自定义滚动条样式.md": {
	id: "自定义滚动条样式.md";
  slug: "自定义滚动条样式";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"自用防抖.md": {
	id: "自用防抖.md";
  slug: "自用防抖";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"节流与防抖.md": {
	id: "节流与防抖.md";
  slug: "节流与防抖";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"花式console.md": {
	id: "花式console.md";
  slug: "花式console";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"英文字母数字标点符号.md": {
	id: "英文字母数字标点符号.md";
  slug: "英文字母数字标点符号";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"获取浏览器是否有上一页.md": {
	id: "获取浏览器是否有上一页.md";
  slug: "获取浏览器是否有上一页";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"近乎完美的横向弹幕.md": {
	id: "近乎完美的横向弹幕.md";
  slug: "近乎完美的横向弹幕";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"配置astro markdown code 主题.md": {
	id: "配置astro markdown code 主题.md";
  slug: "配置astro-markdown-code-主题";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"面试题 内存泄漏及垃圾回收机制.md": {
	id: "面试题 内存泄漏及垃圾回收机制.md";
  slug: "面试题-内存泄漏及垃圾回收机制";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"面试题 算法.md": {
	id: "面试题 算法.md";
  slug: "面试题-算法";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"面试题 设计模式.md": {
	id: "面试题 设计模式.md";
  slug: "面试题-设计模式";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"面试题.md": {
	id: "面试题.md";
  slug: "面试题";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};
"spec": {
"about.md": {
	id: "about.md";
  slug: "about";
  body: string;
  collection: "spec";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../src/content/config.js");
}

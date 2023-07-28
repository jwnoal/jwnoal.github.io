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
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof AnyEntryMap> = AnyEntryMap[C][keyof AnyEntryMap[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
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
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
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
		"blog": {
"30-seconds-of-code.md": {
	id: "30-seconds-of-code.md";
  slug: "30-seconds-of-code";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"3500个常用字.md": {
	id: "3500个常用字.md";
  slug: "3500个常用字";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"CocosCreator 修改打包后的默认加载界面.md": {
	id: "CocosCreator 修改打包后的默认加载界面.md";
  slug: "cocoscreator-修改打包后的默认加载界面";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"MessageBus 单例.md": {
	id: "MessageBus 单例.md";
  slug: "messagebus-单例";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"NVM的使用.md": {
	id: "NVM的使用.md";
  slug: "nvm的使用";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Svelte的写法记录.md": {
	id: "Svelte的写法记录.md";
  slug: "svelte的写法记录";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"canvas实现刮奖效果.md": {
	id: "canvas实现刮奖效果.md";
  slug: "canvas实现刮奖效果";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cocos creator 快速替换所有字体.md": {
	id: "cocos creator 快速替换所有字体.md";
  slug: "cocos-creator-快速替换所有字体";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cocos creator 新增打包自定义扩展.md": {
	id: "cocos creator 新增打包自定义扩展.md";
  slug: "cocos-creator-新增打包自定义扩展";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cocos creator模拟点击.md": {
	id: "cocos creator模拟点击.md";
  slug: "cocos-creator模拟点击";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cocos 滑动屏幕更改相机位置.md": {
	id: "cocos 滑动屏幕更改相机位置.md";
  slug: "cocos-滑动屏幕更改相机位置";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"electron 重新定义Menu(禁用刷新，缩放，打开控制台).md": {
	id: "electron 重新定义Menu(禁用刷新，缩放，打开控制台).md";
  slug: "electron-重新定义menu禁用刷新缩放打开控制台";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"h5 页面失焦判断.md": {
	id: "h5 页面失焦判断.md";
  slug: "h5-页面失焦判断";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"input 的整理.md": {
	id: "input 的整理.md";
  slug: "input-的整理";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"js工具.md": {
	id: "js工具.md";
  slug: "js工具";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"matter.js实现重力小球.md": {
	id: "matter.js实现重力小球.md";
  slug: "matterjs实现重力小球";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ts实现Window自定义方法不报错.md": {
	id: "ts实现Window自定义方法不报错.md";
  slug: "ts实现window自定义方法不报错";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue css变量.md": {
	id: "vue css变量.md";
  slug: "vue-css变量";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue svg组件(webpack).md": {
	id: "vue svg组件(webpack).md";
  slug: "vue-svg组件webpack";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue 不定高度瀑布流组件.md": {
	id: "vue 不定高度瀑布流组件.md";
  slug: "vue-不定高度瀑布流组件";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue 组件递归调用自己.md": {
	id: "vue 组件递归调用自己.md";
  slug: "vue-组件递归调用自己";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue 路由返回不刷新.md": {
	id: "vue 路由返回不刷新.md";
  slug: "vue-路由返回不刷新";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue3.0的多种写法，你喜欢哪种呢？.md": {
	id: "vue3.0的多种写法，你喜欢哪种呢？.md";
  slug: "vue30的多种写法你喜欢哪种呢";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vue全局toast组件.md": {
	id: "vue全局toast组件.md";
  slug: "vue全局toast组件";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"常用的Sass.md": {
	id: "常用的Sass.md";
  slug: "常用的sass";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"搭建vite2.0+vue3.0+ts+多页面打包+多环境+gzip+图片压缩框架.md": {
	id: "搭建vite2.0+vue3.0+ts+多页面打包+多环境+gzip+图片压缩框架.md";
  slug: "搭建vite20vue30ts多页面打包多环境gzip图片压缩框架";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"移动端滑动穿透方案及demo.md": {
	id: "移动端滑动穿透方案及demo.md";
  slug: "移动端滑动穿透方案及demo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"节流与防抖.md": {
	id: "节流与防抖.md";
  slug: "节流与防抖";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"近乎完美的横向弹幕.md": {
	id: "近乎完美的横向弹幕.md";
  slug: "近乎完美的横向弹幕";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"demo": {
"markdown-style-guide.md": {
	id: "markdown-style-guide.md";
  slug: "markdown-style-guide";
  body: string;
  collection: "demo";
  data: any
} & { render(): Render[".md"] };
"using-mdx.mdx": {
	id: "using-mdx.mdx";
  slug: "using-mdx";
  body: string;
  collection: "demo";
  data: any
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}

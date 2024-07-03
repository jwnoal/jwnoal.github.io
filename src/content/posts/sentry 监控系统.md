---
title: "sentry 监控系统"
published: 2024-05-02
draft: false
description: "sentry 监控系统"
tags: ["h5", "sentry", "监控系统"]
category: "代码"
---

```shell
npm install --save @sentry/vue
npm install @sentry/vite-plugin --save-dev
```

main.js

```js
import * as Sentry from "@sentry/vue";

const app = createApp(App);
Sentry.init({
  app,
  environment: import.meta.env.VITE_APP_ENV,
  dsn: "xxx",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", "example.com", /^\//],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
```

vite.config.js

```js
import { sentryVitePlugin } from "@sentry/vite-plugin";
sentryVitePlugin({
        // url: "https://sentry.******.com/", // 默认sentry的后台地址，可以不配置。如果搭建的有个人版的sentry，填写搭建的地址
        org: "noal", // 组织
        project: "cloudgame", // 项目
        release: {
          name: "cloudgame", // 版本号 （不确定是否加hash）
          uploadLegacySourcemaps: { paths: ["dist"] },
          cleanArtifacts: true, // 是否清除上传后的源文件
        }, // 版本
        sourcemaps: {
          assets: "dist/assets/**",
          ignore: ["node_modules"],
          filesToDeleteAfterUpload: "dist/**/*.map",
        },
        authToken:
          "xxx", // 秘钥
      }),
```

authToken: 登录 sentry 后，Settings/user/Auth Tokens  
![](https://cdn.jiangwei.zone/blog/1714632130366.jpg)

sourcemaps: 登录 sentry 后，Settings/Projects/xxx/Source Maps  
![](https://cdn.jiangwei.zone/blog/1714632458269.jpg)

参考链接

- [sentry 官网](https://sentry.io/)
- [sentry vue](https://docs.sentry.io/platforms/javascript/guides/vue/)
- [sentry vite](https://docs.sentry.io/platforms/javascript/sourcemaps/uploading/vite/)
- [bolg](https://blog.csdn.net/qq_39961695/article/details/135844544)

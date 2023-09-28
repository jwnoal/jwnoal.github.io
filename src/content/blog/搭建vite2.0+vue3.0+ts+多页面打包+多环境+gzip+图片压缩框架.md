---
title: '搭建vite2.0+vue3.0+ts+多页面打包+多环境+gzip+图片压缩框架'
description: '搭建vite2.0+vue3.0+ts+多页面打包+多环境+gzip+图片压缩框架'
pubDate: '2023-07-23'
heroImage: 'https://cdn.jump.icu/blog/photo-1459257831348-f0cdd359235f.jpeg?e=1695894004&token=kuB5U4N5PSSOqgf4GbFghXC_Bf19VLJkWswS4KlO:Cfs57ahNbazEuOMg61x-yOYKNOc='
---

#### 首先安装vite
```
npm init @vitejs/app
yarn create @vitejs/app
```

####  使用预设模板创建框架
```
yarn create @vitejs/app my-vue-app --template vue
```
支持的模板预设包括：

vanilla
vue
vue-ts
react
react-ts
preact
preact-ts
lit-element
lit-element-ts

#### 使用scss
```
npm i --save-d sass
<style lang="scss"> 即可
```

#### 使用@路径
```
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve("./src")
    }
  }
});
```

#### 环境区分

1. 新增 .env.dev .env.test .env.prod 三个文件
```
VITE_PROJECT_ENV = 'prod'
```
(必须VITE开头)
在ts中可使用 import.meta.env.VITE_PROJECT_ENV 区分

2. package.json
```
"build": "vue-tsc --noEmit && VITE_PROJECT_ENV=prod vite build"
```
在vite.config.ts中使用 process.env.VITE_PROJECT_ENV === "prod"

#### 多页面打包
```
const pageEntry = {};

(function () {
  // 遍历文件夹中含有main.ts的文件夹路径
  const allEntry = glob.sync("./src/views/**/main.ts");
  // 获取模板
  const temp = fs.readFileSync("./index.html");
  // 创建pages文件夹存放多页面模板
  if (!fs.existsSync("./pages")) {
    fs.mkdirSync("./pages");
  }
  // 创建多页面模板
  allEntry.forEach((entry: string) => {
    const pathArr = entry.split("/");
    const name = pathArr[pathArr.length - 2];
    // 判断文件是否存在
    try {
      fs.accessSync(`./pages/${name}.html`);
    } catch (err) {
      console.log(`创建${name}.html文件`);
      const index = temp.toString().indexOf("</body>");
      const content =
        temp.toString().slice(0, index) +
        `<script type="module" src=".${entry}"></script>` +
        temp.toString().slice(index);
      fs.writeFile(`./pages/${name}.html`, content, err => {
        if (err) console.log(err);
      });
    }
    // input中的配置
    pageEntry[name] = path.resolve(__dirname, `/pages/${name}.html`);
  });
})();
//views文件夹中添加文件即可，会获取里面的文件夹名在pages中生产模板

build: {
    outDir: isProd ? "dist" : "pre",
    rollupOptions: {
      input: pageEntry
    }
  }
```
#### gzip
```
import viteCompression from 'vite-plugin-compression';
plugins: [vue(), viteCompression()],
```

#### 图片压缩
```
import viteImagemin from "vite-plugin-imagemin";
plugins: [vue(), viteImagemin()],
```

改良：
1. tsconfig.json新增：
```
"baseUrl": ".",
"paths": {
  "@/*": ["src/*"]
}
```
使页面引入ts不报错 import api from "@/api";

2. 打包新增判断，pages已经有对应html的时候不进行创建文件

#### 完整配置
```
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import glob from "glob";
import fs from "fs";
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
const isProd = process.env.VITE_PROJECT_ENV === "prod";
const pageEntry = {};

(function () {
  // 遍历文件夹中含有main.ts的文件夹路径
  const allEntry = glob.sync("./src/views/**/main.ts");
  // 获取模板
  const temp = fs.readFileSync("./index.html");
  // 创建pages文件夹存放多页面模板
  if (!fs.existsSync("./pages")) {
    fs.mkdirSync("./pages");
  }
  // 创建多页面模板
  allEntry.forEach((entry: string) => {
    const pathArr = entry.split("/");
    const name = pathArr[pathArr.length - 2];
    // 判断文件是否存在
    try {
      fs.accessSync(`./pages/${name}.html`);
    } catch (err) {
      console.log(`创建${name}.html文件`);
      const index = temp.toString().indexOf("</body>");
      const content =
        temp.toString().slice(0, index) +
        `<script type="module" src=".${entry}"></script>` +
        temp.toString().slice(index);
      fs.writeFile(`./pages/${name}.html`, content, err => {
        if (err) console.log(err);
      });
    }
    // input中的配置
    pageEntry[name] = path.resolve(__dirname, `/pages/${name}.html`);
  });
})();

export default defineConfig({
  server: {
    fs: {
      strict: false
    }
  },
  plugins: [
    vue(),
    viteCompression({
      ext: ".gz",
      algorithm: "gzip",
      deleteOriginFile: false
    }),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 20
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src")
    }
  },
  build: {
    outDir: isProd ? "dist" : "pre",
    rollupOptions: {
      input: pageEntry
    }
  }
});

```
#### 项目地址
https://github.com/jwnoal/vite_vue3


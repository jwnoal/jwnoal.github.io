---
title: "使用github actions 部署到服务器"
published: 2024-06-27
draft: false
description: "使用github actions 部署到服务器"
tags: ["github"]
category: "代码"
---

1. 创建 yml 文件  
   在.github/workflows 目录下创建一个 yml 文件，文件名可以自己取，比如 deploy.yml。

2. 配置 yml 文件  
    编辑 deploy.yml 文件，内容如下：

   ```yaml
   name: Deploy to Server

    on:
    push:
    branches: - master # 更改为你的目标分支
    jobs:
    build-and-deploy:
    runs-on: ubuntu-latest
    steps: # 官方 action, 将代码拉取到虚拟机 - name: Checkout
    uses: actions/checkout@v3

        # 安装node.js
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18.x"

      - name: Install Dependencies
        run: |
          npm install
          # 如果是其他语言，比如Python, Ruby等，更改安装命令

      - name: Build
        run: |
          npm run build
          # 如果有其他构建步骤，添加到这里

      - name: Deploy to Server
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.PRIVATE_KEY }}
          ARGS: "-avz --delete"
          SOURCE: "./dist/*"
          REMOTE_HOST: ${{ secrets.HOST }}
          REMOTE_PORT: "22"
          REMOTE_USER: "root"
          TARGET: "/www/wwwroot/jiangwei.zone"
   ```

3. 配置 secrets
   secrets.PRIVATE_KEY secrets.REMOTE_HOST 需要自己去 github 项目设置中添加，具体操作如下：
   ![](https://cdn.jiangwei.zone/blog/20240627154508.png)
   secrets.HOST 为 服务器 ip
   secrets.PRIVATE_KEY 为服务器私钥，需要自己去服务器上生成

生成 ssh 公钥私钥对：

```shell

ssh-keygen -t rsa -b 4096
cd ~/.ssh && cat id_rsa.pub >> authorized_keys

```

如果本就有，记得要将公钥复制到 authorized_keys。

复制私钥到 secrets 时，需要在末尾多添加一个空行，否则会报错。 255。

记得配置服务器文件的权限。


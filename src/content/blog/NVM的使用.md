---
title: 'NVM的使用'
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
tags: ["astro", "blogging", "learning in public"]
---

## NVM是什么?
NVM是node版本管理工具，当多个项目使用不同node版本的时候，就可以用它来快速切换
## 安装NVM
1. 卸载原有node
```
sudo npm uninstall npm -g
sudo rm -rf /usr/local/lib/node /usr/local/lib/node_modules /var/db/receipts/org.nodejs.*
sudo rm -rf /usr/local/include/node /Users/$USER/.npm
sudo rm /usr/local/bin/node
sudo rm /usr/local/share/man/man1/node.1
sudo rm /usr/local/lib/dtrace/node.d
```
node -v npm-v 来验证是否卸载成功
2. 安装git
略
3. 安装nvm
[github](https://github.com/nvm-sh/nvm) 中能找到安装命令
``
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
``
或
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```
4. 安装完后查看打印的命令：
```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```
将此命令粘贴到.bash_profile文件中，输入vim ~/.bash_profile会打开这个文件，将上面内容粘贴进去。然后点击esc,输入:wq保存并退出。还可以在打开访达，在mac用户的根目录下使用shift+command+.显示隐藏文件。会看到.bash_profile文件，打开，粘贴进去保存就行。
输入node -v你会发现提示命令不存在，输入source ~/.bash_file再重新输入node -v就好了。
完成后输入
```
nvm
```
出现
```
node version manger
```

#### nvm常用命令
```
nvm install stable ## 安装最新稳定版 node
nvm install <version> ## 安装指定版本
nvm uninstall <version> ## 删除已安装的指定版本
nvm use <version> ## 切换使用指定的版本node
nvm ls ## 列出所有安装的版本
nvm ls-remote ## 列出所有远程服务器的版本
nvm current ## 显示当前的版本
nvm alias <name> <version> ## 给不同的版本号添加别名
nvm unalias <name> ## 删除已定义的别名
nvm reinstall-packages <version> ## 在当前版本 node 环境下，重新   全局安装指定版本号的 npm 包
nvm alias default [node版本号] ##设置默认版本
```




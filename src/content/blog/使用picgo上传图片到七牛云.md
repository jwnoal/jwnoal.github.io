---
title: '使用picgo上传图片到七牛云'
pubDate: 2024-01-09
draft: false
description: "使用picgo上传图片到七牛云"
tags: ["picgo"]
---

下载地址[https://github.com/Molunerfinn/PicGo/releases](https://github.com/Molunerfinn/PicGo/releases)

mac安装完后打开如果提示安装包已损坏  
```shell
sudo xattr -d com.apple.quarantine "/Applications/PicGo.app"
```

#### 配置七牛图床
在使用之前，需要配置，这里我们演示了七牛图床的配置。  

1、AccessKey和SecretKey：可以在七牛云控制台，秘钥管理页面找到你的配置  

2、存储空间名 Bucket：空间名称  

3、访问网址：域名  

4、存储区域：七牛云的存储区域（华东 z0，华北 z1，华南 z2，北美 na0，东南亚 as0 ），根据你空间所在的区域，填对应的代码  

5、储存路径（七牛云文件夹）

![](https://cdn.jiangwei.zone/blog/20240109124112.png)
![](https://cdn.jiangwei.zone/blog/20240109124136.png)
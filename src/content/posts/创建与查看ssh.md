---
title: "创建与查看ssh"
published: 2023-11-18
draft: false
description: "创建与查看ssh"
tags: ["ssh"]
---

### 查看 ssh 公钥

a. 打开你的 git bash 窗口

b. 进入 .ssh 目录：`cd ~/.ssh  `

c. 找到 id_rsa.pub 文件：`ls `

d. 查看公钥：`cat id_rsa.pub` 或者 `vim id_rsa.pub `

或者:  
`cat ~/.ssh/id_rsa.pub`

### 生成公钥

`ssh-keygen`

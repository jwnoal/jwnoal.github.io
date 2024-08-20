---
title: "git 常用命令"
published: 2024-07-22
draft: false
description: "git 常用命令"
tags: ["git"]
category: "工具"
---

文档地址：[https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html](https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

新增远程仓库：

```zsh
git remote add origin https://new_url.com
```

更改远程仓库：

1. 直接更改

```zsh
git remote set-url origin https://new_url.com
```

2. 先删除原有远程仓库
   再添加新的远程仓库

```zsh
git remote rm origin
git remote add origin https://new_url.com
```

3.修改 config 文件
打开.git 目录，修改 config 文件里面的 url 替换就 OK 了。

查看远程仓库

```zsh
git remote -v
```

删除远程分支

```zsh
git push origin --delete <branch_name>
```

重置当前分支的 HEAD 为指定 commit，同时重置暂存区和工作区，与指定 commit 一致

```zsh
git reset --hard [commit]
```

强行推送当前分支到远程仓库，即使有冲突

```zsh
git push [remote] --force
```

可以查看所有分支的所有操作记录

```zsh
git reflog
```

dev merge 到 test 过滤掉 dist 目录

1. 在项目根目录下创建或编辑 .gitattributes 文件

```zsh
echo "dist merge=ours" > .gitattributes
```

2. 创建或编辑.git/config 文件：

```zsh
echo -e "[merge \"ours\"]\nname = \"Keep ours merge\"\ndriver = true" >> .git/config
```

```zsh
# 确认 .gitattributes 文件内容
cat .gitattributes
# 输出应为：
# dist merge=ours

# 确认 .git/config 文件内容
cat .git/config
# 输出应包含：
# [merge "ours"]
# name = "Keep ours merge"
# driver = true

```
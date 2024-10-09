---
title: "在vscode中配置net core环境"
published: 2024-10-08
draft: false
description: "在vscode中配置net core环境"
tags: ["unity"]
category: "代码"
---

vs code 安装插件
![](https://cdn.jiangwei.zone/blog/20241008210607.png)

下载.net SDK
[地址](https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/sdk-8.0.402-macos-x64-installer?journey=vs-code)

配置环境变量

1. **打开终端**：你可以通过在Spotlight中搜索“终端”来找到它。

2. **查找 .NET SDK 安装路径**：默认情况下，.NET SDK会安装在`/usr/local/share/dotnet`。你可以通过以下命令来确认安装位置：
   ```bash
   ls /usr/local/share/dotnet
   ```

3. **编辑配置文件**：
    - 如果你使用的是`zsh`，可以编辑`~/.zshrc`文件：
      ```bash
      nano ~/.zshrc
      ```
    - 如果你使用的是`bash`，可以编辑`~/.bash_profile`或`~/.bashrc`文件：
      ```bash
      nano ~/.bash_profile
      ```

4. **添加环境变量**：在文件的末尾添加以下行：
   ```bash
   export DOTNET_ROOT=/usr/local/share/dotnet
   export PATH=$PATH:$DOTNET_ROOT
   ```

5. **保存并退出**：如果你使用的是`nano`编辑器，可以按`CTRL + O`保存，按`CTRL + X`退出。

6. **加载配置**：使改动生效，可以运行：
   - 对于`zsh`：
     ```bash
     source ~/.zshrc
     ```
   - 对于`bash`：
     ```bash
     source ~/.bash_profile
     ```

7. **验证安装**：你可以运行以下命令来验证.NET SDK是否配置成功：
   ```bash
   dotnet --version
   ```

如果你能看到.NET SDK的版本号，说明环境变量配置成功。

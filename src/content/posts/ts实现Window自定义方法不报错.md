---
title: "ts实现Window自定义方法不报错"
published: 2022-07-01
draft: false
description: "ts实现Window自定义方法不报错"
tags: ["ts"]
---

//index.d.ts

```
declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
  }
}
```

---
title: 'ts实现Window自定义方法不报错'
description: 'ts实现Window自定义方法不报错'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
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
---
title: 'ts实现Window自定义方法不报错'
pubDate: 2022-07-01
draft: false
description: "This is the first post of my new Astro blog."
tags: ["astro", "blogging", "learning in public"]
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
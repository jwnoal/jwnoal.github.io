---
title: 'MessageBus 单例'
description: 'MessageBus 单例'
pubDate: '2023-07-23'
heroImage: '/blog-placeholder-4.jpg'
---

MessageBus.ts
```js
class MessageBus {
  private static instance: MessageBus;

  private handlers: { [key: string]: any[] } = {};

  private constructor() {}

  public static getInstance(): MessageBus {
    if (!MessageBus.instance) {
      MessageBus.instance = new MessageBus();
    }
    return MessageBus.instance;
  }

  public on(eventName: string, handler: Function, context) {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push({ handler: handler, context: context });
  }

  public off(eventName: string, handler: Function, context) {
    if (!this.handlers[eventName]) {
      return;
    }
    for (let i = 0; i < this.handlers[eventName].length; i++) {
      if (
        this.handlers[eventName][i].handler == handler &&
        this.handlers[eventName][i].context == context
      ) {
        this.handlers[eventName].splice(i, 1);
        break;
      }
    }
  }

  public emit(eventName: string, args?: any, debug = false) {
    if (!this.handlers[eventName]) {
      return;
    }
    this.handlers[eventName].forEach(({ handler, context }) => {
      if (debug) {
        console.log("收到" + eventName + "事件,args==>", args, context.node);
      }
      handler.call(context, args);
    });
  }
}

export default MessageBus.getInstance();



```

调用
```js
import MessageBus from "./utils/MessageBus";
MessageBus.emit(GameEmit.GameStart,{})
MessageBus.on(GameEmit.GameStart, this.event, this)
MessageBus.off(GameEmit.GameStart, this.event,this)
```
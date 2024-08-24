---
title: "websocket封装"
published: 2024-08-24
draft: false
description: "websocket封装"
tags: ["ts"]
category: "代码"
---

搬运：[https://mp.weixin.qq.com/s/DmmUa-0OPFcTpf5jW232rw](https://mp.weixin.qq.com/s/DmmUa-0OPFcTpf5jW232rw)


```ts
import WebSocketClient from "./WebSocketClient";

// 创建实例
const ws = new WebSocketClient("ws://localhost:3200");

// 连接
ws.connect();
// 同原生方法
ws.onopen(() => {});
// 同原生方法
ws.onclose(() => {});
// 同原生方法
ws.onerror(() => {});
// 同原生方法
ws.onmessage(() => {
  // 同原生方法
  ws.send("自定义发送的数据");
});
```

```ts
// WebSocketClient.ts
import { EventDispatcher } from "./dispatcher";

export class WebSocketClient extends EventDispatcher {
  // #socket链接
  private url = ""; // #socket实例
  private socket: WebSocket | null = null; // #重连次数
  private reconnectAttempts = 0; // #最大重连数
  private maxReconnectAttempts = 5; // #重连间隔
  private reconnectInterval = 10000; // 10 seconds // #发送心跳数据间隔
  private heartbeatInterval = 1000 * 30; // #计时器id
  private heartbeatTimer?: NodeJS.Timeout; // #彻底终止ws
  private stopWs = false; // *构造函数
  constructor(url: string) {
    super();
    this.url = url;
  }

  // >生命周期钩子
  onopen(callBack: Function) {
    this.addEventListener("open", callBack);
  }
  onmessage(callBack: Function) {
    this.addEventListener("message", callBack);
  }
  onclose(callBack: Function) {
    this.addEventListener("close", callBack);
  }
  onerror(callBack: Function) {
    this.addEventListener("error", callBack);
  }

  // >消息发送
  public send(message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error("[WebSocket] 未连接");
    }
  }

  // !初始化连接
  public connect(): void {
    if (this.reconnectAttempts === 0) {
      this.log("WebSocket", `初始化连接中...          ${this.url}`);
    }
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      return;
    }
    this.socket = new WebSocket(this.url); // !websocket连接成功

    this.socket.onopen = (event) => {
      this.stopWs = false; // 重置重连尝试成功连接
      this.reconnectAttempts = 0; // 在连接成功时停止当前的心跳检测并重新启动
      this.startHeartbeat();
      this.log(
        "WebSocket",
        `连接成功,等待服务端数据推送[onopen]...     ${this.url}`
      );
      this.dispatchEvent("open", event);
    };

    this.socket.onmessage = (event) => {
      this.dispatchEvent("message", event);
      this.startHeartbeat();
    };

    this.socket.onclose = (event) => {
      if (this.reconnectAttempts === 0) {
        this.log("WebSocket", `连接断开[onclose]...    ${this.url}`);
      }
      if (!this.stopWs) {
        this.handleReconnect();
      }
      this.dispatchEvent("close", event);
    };

    this.socket.onerror = (event) => {
      if (this.reconnectAttempts === 0) {
        this.log("WebSocket", `连接异常[onerror]...    ${this.url}`);
      }
      this.closeHeartbeat();
      this.dispatchEvent("error", event);
    };
  }

  // > 断网重连逻辑
  private handleReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      this.log(
        "WebSocket",
        `尝试重连... (${this.reconnectAttempts}/${this.maxReconnectAttempts})       ${this.url}`
      );
      setTimeout(() => {
        this.connect();
      }, this.reconnectInterval);
    } else {
      this.closeHeartbeat();
      this.log("WebSocket", `最大重连失败，终止重连: ${this.url}`);
    }
  }

  // >关闭连接
  public close(): void {
    if (this.socket) {
      this.stopWs = true;
      this.socket.close();
      this.socket = null;
      this.removeEventListener("open");
      this.removeEventListener("message");
      this.removeEventListener("close");
      this.removeEventListener("error");
    }
    this.closeHeartbeat();
  }

  // >开始心跳检测 -> 定时发送心跳消息
  private startHeartbeat(): void {
    if (this.stopWs) return;
    if (this.heartbeatTimer) {
      this.closeHeartbeat();
    }
    this.heartbeatTimer = setInterval(() => {
      if (this.socket) {
        this.socket.send(JSON.stringify({ type: "heartBeat", data: {} }));
        this.log("WebSocket", "送心跳数据...");
      } else {
        console.error("[WebSocket] 未连接");
      }
    }, this.heartbeatInterval);
  }

  // >关闭心跳
  private closeHeartbeat(): void {
    clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = undefined;
  }
}
```

```ts
// dispatcher.ts
class Log {
  private static console = true;
  log(title: string, text: string) {
    if (!Log.console) return;
    if (import.meta.env.MODE === "production") return;
    const color = "#ff4d4f";
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      "background:transparent"
    );
  }
  closeConsole() {
    Log.console = false;
  }
}
export class EventDispatcher extends Log {
  private listeners: { [type: string]: Function[] } = {};

  protected addEventListener(type: string, listener: Function) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    if (this.listeners[type].indexOf(listener) === -1) {
      this.listeners[type].push(listener);
    }
  }

  protected removeEventListener(type: string) {
    this.listeners[type] = [];
  }

  protected dispatchEvent(type: string, data: any) {
    const listenerArray = this.listeners[type] || [];
    if (listenerArray.length === 0) return;
    listenerArray.forEach((listener) => {
      listener.call(this, data);
    });
  }
}
```

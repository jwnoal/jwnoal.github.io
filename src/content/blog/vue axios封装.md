---
title: "vue axios封装"
pubDate: 2024-04-21
draft: false
description: "vue axios封装"
tags: ["vue"]
---
```js
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { showToast } from "vant";
import { GetChannel } from "./Util";
import { useUserStore } from "@/store/modules/user";

// 函数返回唯一的请求key
function getRequestKey(config: any) {
  let { method, url, params, data } = config;
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&");
}

// 添加请求信息
let pendingRequest = new Map();
function addPendingRequest(config: any) {
  let requestKey = getRequestKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingRequest.has(requestKey)) {
        pendingRequest.set(requestKey, cancel);
      }
    });
}

// 取消重复请求，移除重复请求信息
function removePendingRequest(config: any) {
  let requestKey = getRequestKey(config);
  if (pendingRequest.has(requestKey)) {
    // 如果是重复的请求，则执行对应的cancel函数
    let cancel = pendingRequest.get(requestKey);
    cancel(requestKey);
    // 将前一次重复的请求移除
    pendingRequest.delete(requestKey);
  }
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000,
  headers: {
    // "Content-Type": "application/json",
  },
});

service.interceptors.request.use(
  (config: any) => {
    // 检查是否存在重复请求，若存在则取消已发的请求
    removePendingRequest(config);
    // 把当前请求信息添加到pendingRequest对象中
    addPendingRequest(config);

    // 设置headers
    const token = sessionStorage.getItem("token");
    const channel = GetChannel();
    // const trade_no = GetCookie("EESKINS_TRACK_NO") || undefined;
    const DeviceID = localStorage.getItem("clientIdentifier");

    config.headers = {
      ...config.headers,
      App: "cloudgame",
      Platform: "h5",
      Version: "1.0.0",
      Source: channel,
      DeviceID: DeviceID || "",
      Authorization: token ? "bearer " + token : "",
    };
    // if (config.method === "post") {
    //   config.data = {
    //     track_no: trade_no,
    //     ...config.data,
    //   };
    // } else if (config.method === "get") {
    //   config.params = {
    //     track_no: trade_no,
    //     ...config.params,
    //   };
    // }
    return config;
  },
  (error: AxiosError) => {
    console.log("request error" + error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 从pendingRequest对象中移除请求
    removePendingRequest(response.config);

    // 处理返回数据
    const res = response.data;
    if (res.status_code == 1000) {
      return res.data;
    } else {
      showToast(res.message);
      if (res.status_code == 1101) {
        useUserStore().logOut();
      }
      return Promise.reject(res.message || "Error");
    }
  },
  (error) => {
    // console.log("response error", error);
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("expires");
          if (response.config && response.config.url.includes("refresh")) {
            localStorage.removeItem("refresh_token");
          } else {
            useUserStore().autoLogin();
          }
          break;
        default:
          break;
      }
    }
    return Promise.reject(error.code == "ERR_CANCELED" ? "" : error.message);
  }
);

export function httpGet<P, R>(url: string, params?: P): Promise<R> {
  return service.get(url, { params });
}

export function httpPost<P, R>(url: string, params?: P): Promise<R> {
  return service.post(url, { ...params });
}

```
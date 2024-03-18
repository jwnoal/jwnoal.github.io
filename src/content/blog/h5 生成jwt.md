---
title: "h5 生成jwt"
pubDate: 2024-03-18
draft: false
description: "h5 生成jwt"
tags: ["h5", "js"]
---

```js
import CryptoJS from "crypto-js";

function base64UrlEncode(str: any) {
  var encodedSource = CryptoJS.enc.Base64.stringify(str);
  var reg = new RegExp("/", "g");
  encodedSource = encodedSource
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(reg, "_");
  return encodedSource;
}

export function generateToken(sessionId: string) {
  let header = JSON.stringify({
    alg: "HS256",
    typ: "JWT",
  });

  const payload = {
    iss: "cloudgame", // 随便写点啥，由客户自定义
    aud: "mp", // 固定值 mp
    iat: ~~(new Date().getTime() / 1000), // 当前时间戳，秒级
    exp: ~~(new Date().getTime() / 1000) + 2 * 60 * 60, // token 过期时间，大于等于1分钟小于2小时即可
    customer: "moving", // 客户标识，对每个客户而言唯一
  };
  
  const user_payload = {
    ...payload,
    type: "auth",
    user: "123456",
    queue: "standard",
    session: sessionId,
  };

  const secretKey = "qwer";

  const before_sign =
    base64UrlEncode(CryptoJS.enc.Utf8.parse(header)) +
    "." +
    base64UrlEncode(CryptoJS.enc.Utf8.parse(JSON.stringify(user_payload)));
  let signature: any = CryptoJS.HmacSHA256(before_sign, secretKey);
  signature = base64UrlEncode(signature);
  const final_sign = before_sign + "." + signature;
  return final_sign;
}

```

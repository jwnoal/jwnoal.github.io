---
title: "原生js XMLHttpRequest"
pubDate: 2023-11-18
draft: false
description: "原生js XMLHttpRequest"
tags: ["js"]
---

```
function sendRequest(url, params, method = "POST") {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    if (method == "GET") {
      const objectToQueryString = (queryParameters) => {
        return queryParameters
          ? Object.entries(queryParameters).reduce(
              (queryString, [key, val], index) => {
                const symbol = queryString.length === 0 ? "?" : "&";
                queryString +=
                  typeof val === "string" ? `${symbol}${key}=${val}` : "";
                return queryString;
              },
              ""
            )
          : "";
      };
      xhr.open(method, url + objectToQueryString(params), true);
    } else {
      xhr.open(method, url, true);
    }

    const headers = {};

    // 设置请求头
    xhr.setRequestHeader(
      "Content-type",
      "application/json; charset=utf-8"
    );
    for (let header in headers) {
      if (headers.hasOwnProperty(header)) {
        xhr.setRequestHeader(header, headers[header]);
      }
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          console.error(
            `${method} request failed with status ${xhr.status}`
          );
          reject();
        }
      }
    };

    xhr.onerror = function () {
      console.error(`${method} request failed`);
      reject();
    };

    xhr.send(JSON.stringify(params));
  });
}
```

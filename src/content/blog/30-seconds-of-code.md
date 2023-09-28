---
title: "30-seconds-of-code"
description: "30-seconds-of-code"
pubDate: "2023-07-23"
heroImage: "https://cdn.jump.icu/blog/photo-1501747315-124a0eaca060.jpeg?e=1695896093&token=kuB5U4N5PSSOqgf4GbFghXC_Bf19VLJkWswS4KlO:Kduvwnlh2cGHm7Ggddj93V53t5Y="
---

## 30 Seconds

#### 时间加减天数 addDaysToDate

```js
const addDaysToDate = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d.toISOString().split("T")[0];
};
addDaysToDate("2020-10-15", 10); // '2020-10-25'
```

#### 时间加减分钟 addMinutesToDate

```js
const addMinutesToDate = (date, n) => {
  const d = new Date(date);
  d.setTime(d.getTime() + n * 60000);
  return d.toISOString().split(".")[0].replace("T", " ");
};
addMinutesToDate("2020-10-19 12:00:00", 10); // '2020-10-19 12:10:00'
addMinutesToDate("2020-10-19", -10); // '2020-10-18 23:50:00'
```

#### 所有标签添加事件 addEventListenerAll

```js
const addEventListenerAll = (targets, type, listener, options, useCapture) => {
  targets.forEach((target) =>
    target.addEventListener(type, listener, options, useCapture)
  );
};
addEventListenerAll(document.querySelectorAll("a"), "click", () =>
  console.log("Clicked a link")
);
```

#### 给 dom 添加多个事件 addMultipleListeners

```js
const addMultipleListeners = (el, types, listener, options, useCapture) => {
  types.forEach((type) =>
    el.addEventListener(type, listener, options, useCapture)
  );
};
addMultipleListeners(
  document.querySelector(".my-element"),
  ["click", "mousedown"],
  () => {
    console.log("hello!");
  }
);
```

#### 判断数据有无重复项 allUnique

```js
const allUnique = (arr) => arr.length === new Set(arr).size;
allUnique([1, 2, 3, 4]); // true
allUnique([1, 1, 2, 3]); // false
```

#### 数组是否全符合条件 arr.every

```js
const all = (arr, fn = Boolean) => arr.every(fn);
all([4, 2, 3], (x) => x > 1); // true
all([1, 2, 3]); // true
```

#### 参数是否全为 true and

```js
const and = (a, b) => a && b;
and(true, true); // true
and(true, false); // false
and(false, false); // false
```

#### 参数有一个为 true any

```js
const any = (arr, fn = Boolean) => arr.some(fn);
any([0, 1, 2, 0], (x) => x >= 2); // true
any([0, 0, 1, 0]); // true
```

#### 将数组分组，每组几项 chunk

```js
const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

#### 将数组分组，每组必须包含几项 aperture

```js
const aperture = (n, arr) =>
  n > arr.length ? [] : arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));
aperture(2, [1, 2, 3, 4]); // [[1, 2], [2, 3], [3, 4]]
aperture(3, [1, 2, 3, 4]); // [[1, 2, 3], [2, 3, 4]]
aperture(5, [1, 2, 3, 4]); // []
```

#### 将数组分成几组 chunkIntoN

```js
const chunkIntoN = (arr, n) => {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};
chunkIntoN([1, 2, 3, 4, 5, 6, 7], 4); // [[1, 2], [3, 4], [5, 6], [7]]
```

#### 判断对象中所有 key 是否在数组里面 assertValidKeys

```js
const assertValidKeys = (obj, keys) =>
  Object.keys(obj).every((key) => keys.includes(key));
assertValidKeys({ id: 10, name: "apple" }, ["id", "name"]); // true
assertValidKeys({ id: 10, name: "apple" }, ["id", "type"]); // false
```

#### base64 解码 atob

```js
const atob = (str) => Buffer.from(str, "base64").toString("binary");
atob("Zm9vYmFy"); // 'foobar'
```

#### base64 加密 btoa

```js
const btoa = (str) => Buffer.from(str, "binary").toString("base64");
btoa("foobar"); // 'Zm9vYmFy'
```

#### 计算平均数 average

```js
const average = (...nums) =>
  nums.reduce((acc, val) => acc + val, 0) / nums.length;
average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

#### 计算对象 key 平均数 averageBy

```js
const averageBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0) / arr.length;
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (o) => o.n); // 5
averageBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 5
```

#### 将数组按条件分组 bifurcateBy

```js
const bifurcateBy = (arr, fn) =>
  arr.reduce(
    (acc, val, i) => (acc[fn(val, i) ? 0 : 1].push(val), acc),
    [[], []]
  );
bifurcateBy(["beep", "boop", "foo", "bar"], (x) => x[0] === "b");
// [ ['beep', 'boop', 'bar'], ['foo'] ]
```

#### 判断是否触底 bottomVisible

```js
const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight ||
    document.documentElement.clientHeight);
bottomVisible(); // true
```

#### 冒泡排序 bubbleSort

```js
const bubbleSort = (arr) => {
  let swapped = false;
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    swapped = false;
    for (let j = 0; j < a.length - i; j++) {
      if (a[j + 1] < a[j]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swapped = true;
      }
    }
    if (!swapped) return a;
  }
  return a;
};
bubbleSort([2, 1, 4, 3]); // [1, 2, 3, 4]
```

#### 桶排序 bucketSort

```js
const bucketSort = (arr, size = 5) => {
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const buckets = Array.from(
    { length: Math.floor((max - min) / size) + 1 },
    () => []
  );
  arr.forEach((val) => {
    buckets[Math.floor((val - min) / size)].push(val);
  });
  return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
};
bucketSort([6, 3, 4, 1]); // [1, 3, 4, 6]
```

#### 计算字节 byteSize

```js
const byteSize = (str) => new Blob([str]).size;
byteSize("😀"); // 4
byteSize("Hello World"); // 11
```

#### 使用凯撒密码加解密 caesarCipher

```js
const caesarCipher = (str, shift, decrypt = false) => {
  const s = decrypt ? (26 - shift) % 26 : shift;
  const n = s > 0 ? s : 26 + (s % 26);
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + n) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + n) % 26) + 97);
      return l;
    })
    .join("");
};
caesarCipher("Hello World!", -3); // 'Ebiil Tloia!'
caesarCipher("Ebiil Tloia!", 23, true); // 'Hello World!'
```

#### 首字母大写 capitalize

```js
const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join("").toLowerCase() : rest.join(""));
capitalize("fooBar"); // 'FooBar'
capitalize("fooBar", true); // 'Foobar'
```

#### 每个单词首字母大写 capitalizeEveryWord

```js
const capitalizeEveryWord = (str) =>
  str.replace(/\b[a-z]/g, (char) => char.toUpperCase());
capitalizeEveryWord("hello world!"); // 'Hello World!'
```

#### 首字母小写 decapitalize

```js
const decapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() +
  (upperRest ? rest.join("").toUpperCase() : rest.join(""));
decapitalize("FooBar"); // 'fooBar'
decapitalize("FooBar", true); // 'fOOBAR'
```

#### 转数组 castArray

```js
const castArray = (val) => (Array.isArray(val) ? val : [val]);
castArray("foo"); // ['foo']
castArray([1]); // [1]
```

#### 摄氏度转华氏度 celsiusToFahrenheit

```js
const celsiusToFahrenheit = (degrees) => 1.8 * degrees + 32;
celsiusToFahrenheit(33); // 91.4
```

#### 华氏度转摄氏度 fahrenheitToCelsius

```js
const fahrenheitToCelsius = (degrees) => ((degrees - 32) * 5) / 9;
fahrenheitToCelsius(32); // 0
```

#### 克隆正则表达式 cloneRegExp

```js
const cloneRegExp = (regExp) => new RegExp(regExp.source, regExp.flags);
const regExp = /lorem ipsum/gi;
const regExp2 = cloneRegExp(regExp); // regExp !== regExp2
```

#### 数组中查找最接近的数 closest

```js
const closest = (arr, n) =>
  arr.reduce((acc, num) => (Math.abs(num - n) < Math.abs(acc - n) ? num : acc));
closest([6, 1, 3, 7, 9], 5); // 6
```

#### 返回第一个定义的非空参数 coalesce

```js
const coalesce = (...args) => args.find((v) => ![undefined, null].includes(v));
coalesce(null, undefined, "", NaN, "Waldo"); // ''
```

#### 返回第一个为 true 的参数 coalesceFactory

```js
const coalesceFactory =
  (valid) =>
  (...args) =>
    args.find(valid);
const customCoalesce = coalesceFactory(
  (v) => ![null, undefined, "", NaN].includes(v)
);
customCoalesce(undefined, null, NaN, "", "Waldo"); // 'Waldo'
```

#### 彩色打印 colorize

```js
const colorize = (...args) => ({
  black: `\x1b[30m${args.join(" ")}`,
  red: `\x1b[31m${args.join(" ")}`,
  green: `\x1b[32m${args.join(" ")}`,
  yellow: `\x1b[33m${args.join(" ")}`,
  blue: `\x1b[34m${args.join(" ")}`,
  magenta: `\x1b[35m${args.join(" ")}`,
  cyan: `\x1b[36m${args.join(" ")}`,
  white: `\x1b[37m${args.join(" ")}`,
  bgBlack: `\x1b[40m${args.join(" ")}\x1b[0m`,
  bgRed: `\x1b[41m${args.join(" ")}\x1b[0m`,
  bgGreen: `\x1b[42m${args.join(" ")}\x1b[0m`,
  bgYellow: `\x1b[43m${args.join(" ")}\x1b[0m`,
  bgBlue: `\x1b[44m${args.join(" ")}\x1b[0m`,
  bgMagenta: `\x1b[45m${args.join(" ")}\x1b[0m`,
  bgCyan: `\x1b[46m${args.join(" ")}\x1b[0m`,
  bgWhite: `\x1b[47m${args.join(" ")}\x1b[0m`,
});
console.log(colorize("foo").red); // 'foo' (red letters)
console.log(colorize("foo", "bar").bgBlue); // 'foo bar' (blue background)
console.log(colorize(colorize("foo").yellow, colorize("foo").green).bgWhite);
// 'foo bar' (first word in yellow letters, second word in green letters, white background for both)
```

#### 输出对象相同 key commonKeys

```js
const commonKeys = (obj1, obj2) =>
  Object.keys(obj1).filter((key) => obj2.hasOwnProperty(key));
commonKeys({ a: 1, b: 2 }, { a: 2, c: 1 }); // ['a']
```

#### 数组移除假值 compact

```js
const compact = (arr) => arr.filter(Boolean);
compact([0, 1, false, 2, "", 3, "a", "e" * 23, NaN, "s", 34]);
// [ 1, 2, 3, 'a', 's', 34 ]
```

#### 对象数组深度移除假值 compactObject

```js
const compactObject = (val) => {
  const data = Array.isArray(val) ? val.filter(Boolean) : val;
  return Object.keys(data).reduce(
    (acc, key) => {
      const value = data[key];
      if (Boolean(value))
        acc[key] = typeof value === "object" ? compactObject(value) : value;
      return acc;
    },
    Array.isArray(val) ? [] : {}
  );
};
const obj = {
  a: null,
  b: false,
  c: true,
  d: 0,
  e: 1,
  f: "",
  g: "a",
  h: [null, false, "", true, 1, "a"],
  i: { j: 0, k: false, l: "a" },
};
compactObject(obj);
// { c: true, e: 1, g: 'a', h: [ true, 1, 'a' ], i: { l: 'a' } }
```

#### 压缩字符串的空格为一个 compactWhitespace

```js
const compactWhitespace = (str) => str.replace(/\s{2,}/g, " ");
compactWhitespace("Lorem    Ipsum"); // 'Lorem Ipsum'
compactWhitespace("Lorem \n Ipsum"); // 'Lorem Ipsum'
```

#### 判断字符是否有空格 containsWhitespace

```js
const containsWhitespace = (str) => /\s/.test(str);
containsWhitespace("lorem"); // false
containsWhitespace("lorem ipsum"); // true
```

#### 复制 copyToClipboard

```js
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};
copyToClipboard("Lorem ipsum"); // 'Lorem ipsum' copied to clipboard.
```

#### 将数组按条件计算个数 countBy

```js
const countBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
countBy([6.1, 4.2, 6.3], Math.floor); // {4: 1, 6: 2}
countBy(["one", "two", "three"], "length"); // {3: 2, 5: 1}
countBy([{ count: 5 }, { count: 10 }, { count: 5 }], (x) => x.count);
// {5: 2, 10: 1}
```

#### 统计一个值在数组中出现的次数 countOccurrences

```js
const countOccurrences = (arr, val) =>
  arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
countOccurrences([1, 1, 2, 1, 2, 3], 1); // 3
```

#### 统计字符串出现的次数 countSubstrings

```js
const countSubstrings = (str, searchValue) => {
  let count = 0,
    i = 0;
  while (true) {
    const r = str.indexOf(searchValue, i);
    if (r !== -1) [count, i] = [count + 1, r + 1];
    else return count;
  }
};
countSubstrings("tiktok tok tok tik tok tik", "tik"); // 3
countSubstrings("tutut tut tut", "tut"); // 4
```

#### 如果目录不存在就创建目录 node

```js
const fs = require("fs");

const createDirIfNotExists = (dir) =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
createDirIfNotExists("test");
// creates the directory 'test', if it doesn't exist
```

#### 创建 eventbus

```js
const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    (this.hub[event] || []).forEach((handler) => handler(data));
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = [];
    this.hub[event].push(handler);
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex((h) => h === handler);
    if (i > -1) this.hub[event].splice(i, 1);
    if (this.hub[event].length === 0) delete this.hub[event];
  },
});

const handler = (data) => console.log(data);
const hub = createEventHub();
let increment = 0;

// Subscribe: listen for different types of events
hub.on("message", handler);
hub.on("message", () => console.log("Message event fired"));
hub.on("increment", () => increment++);

// Publish: emit events to invoke all handlers subscribed to them, passing the data to them as an argument
hub.emit("message", "hello world"); // logs 'hello world' and 'Message event fired'
hub.emit("message", { hello: "world" }); // logs the object and 'Message event fired'
hub.emit("increment"); // `increment` variable is now 1

// Unsubscribe: stop a specific handler from listening to the 'message' event
hub.off("message", handler);
```

#### 生成时间范围内所有日期 dateRangeGenerator

```js
const dateRangeGenerator = function* (start, end, step = 1) {
  let d = start;
  while (d < end) {
    yield new Date(d);
    d.setDate(d.getDate() + step);
  }
};
[...dateRangeGenerator(new Date("2021-06-01"), new Date("2021-06-04"))];
// [ 2021-06-01, 2021-06-02, 2021-06-03 ]
```

#### 获取一年有几天 dayOfYear

```js
const dayOfYear = (date) =>
  Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
dayOfYear(new Date()); // 361
```

#### 获取一个月有几天 daysInMonth

```js
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
daysInMonth(2020, 12)); // 31
daysInMonth(2024, 2)); // 29
```

#### 获取几天前的日期 daysAgo

```js
const daysAgo = (n) => {
  let d = new Date();
  d.setDate(d.getDate() - Math.abs(n));
  return d.toISOString().split("T")[0];
};
daysAgo(20); // 2020-09-16 (if current date is 2020-10-06)
```

#### 获取几天后的日期 daysFromNow

```js
const daysFromNow = (n) => {
  let d = new Date();
  d.setDate(d.getDate() + Math.abs(n));
  return d.toISOString().split("T")[0];
};
daysFromNow(5); // 2020-10-13 (if current date is 2020-10-08)
```

#### 防抖

```js
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};
window.addEventListener(
  "resize",
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

#### 防抖 异步

```js
const debouncePromise = (fn, ms = 0) => {
  let timeoutId;
  const pending = [];
  return (...args) =>
    new Promise((res, rej) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const currentPending = [...pending];
        pending.length = 0;
        Promise.resolve(fn.apply(this, args)).then(
          (data) => {
            currentPending.forEach(({ resolve }) => resolve(data));
          },
          (error) => {
            currentPending.forEach(({ reject }) => reject(error));
          }
        );
      }, ms);
      pending.push({ resolve: res, reject: rej });
    });
};
const fn = (arg) =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000, ["resolved", arg]);
  });
const debounced = debouncePromise(fn, 200);
debounced("foo").then(console.log);
debounced("bar").then(console.log);
// Will log ['resolved', 'bar'] both times
```

#### 深拷贝

```js
const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};
const a = { foo: "bar", obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```

#### 数组扁平

```js
const deepFlatten = (arr) =>
  [].concat(...arr.map((v) => (Array.isArray(v) ? deepFlatten(v) : v)));
deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]
```

#### 深度冻结

```js
const deepFreeze = (obj) => {
  Object.keys(obj).forEach((prop) => {
    if (typeof obj[prop] === "object") deepFreeze(obj[prop]);
  });
  return Object.freeze(obj);
};
("use strict");

const val = deepFreeze([1, [2, 3]]);

val[0] = 3; // not allowed
val[1][0] = 4; // not allowed as well
```

#### 将对象 key 全转为大写 deepMapKeys

```js
const deepMapKeys = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map((val) => deepMapKeys(val, fn))
    : typeof obj === "object"
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] =
          val !== null && typeof val === "object" ? deepMapKeys(val, fn) : val;
        return acc;
      }, {})
    : obj;
const obj = {
  foo: "1",
  nested: {
    child: {
      withArray: [
        {
          grandChild: ["hello"],
        },
      ],
    },
  },
};
const upperKeysObj = deepMapKeys(obj, (key) => key.toUpperCase());
/*
{
  "FOO":"1",
  "NESTED":{
    "CHILD":{
      "WITHARRAY":[
        {
          "GRANDCHILD":[ 'hello' ]
        }
      ]
    }
  }
}
*/
```

#### 合并对象属性 combine

```js
const combine = (a, b, prop) =>
  Object.values(
    [...a, ...b].reduce((acc, v) => {
      if (v[prop])
        acc[v[prop]] = acc[v[prop]] ? { ...acc[v[prop]], ...v } : { ...v };
      return acc;
    }, {})
  );
const x = [
  { id: 1, name: "John" },
  { id: 2, name: "Maria" },
];
const y = [{ id: 1, age: 28 }, { id: 3, age: 26 }, { age: 3 }];
combine(x, y, "id");
// [
//  { id: 1, name: 'John', age: 28 },
//  { id: 2, name: 'Maria' },
//  { id: 3, age: 26 }
// ]
```

#### 深度合并对象 deepMerge

```js
const deepMerge = (a, b, fn) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce(
    (acc, key) => ({ ...acc, [key]: fn(key, a[key], b[key]) }),
    {}
  );
deepMerge(
  { a: true, b: { c: [1, 2, 3] } },
  { a: false, b: { d: [1, 2, 3] } },
  (key, a, b) => (key === "a" ? a && b : Object.assign({}, a, b))
);
// { a: false, b: { c: [ 1, 2, 3 ], d: [ 1, 2, 3 ] } }
```

#### 合并对象值不会被后面修改 defaults

```js
const defaults = (obj, ...defs) =>
  Object.assign({}, obj, ...defs.reverse(), obj);
defaults({ a: 1 }, { b: 2 }, { b: 6 }, { a: 3 }); // { a: 1, b: 2 }
```

#### 判断是否为移动端 detectDeviceType

```js
const detectDeviceType = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
detectDeviceType(); // 'Mobile' or 'Desktop'
```

#### 检测用户首选语言 detectLanguage

```js
const detectLanguage = (defaultLang = "en-US") =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;
detectLanguage(); // 'nl-NL'
```

#### 获取数组差值 difference

```js
const difference = (a, b) => {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
};
difference([1, 2, 3, 3], [1, 2, 4]); // [3, 3]
```

#### 获取数组差值加条件 differenceBy

```js
const differenceBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return a.map(fn).filter((el) => !s.has(el));
};
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [1]
differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], (v) => v.x); // [2]
```

#### 输入 key 获取对象的值 dig

```js
const dig = (obj, target) =>
  target in obj
    ? obj[target]
    : Object.values(obj).reduce((acc, val) => {
        if (acc !== undefined) return acc;
        if (typeof val === "object") return dig(val, target);
      }, undefined);
const data = {
  level1: {
    level2: {
      level3: "some data",
    },
  },
};
dig(data, "level3"); // 'some data'
dig(data, "level4"); // undefined
```

#### 数字转为数组并取绝对值 digitize

```js
const digitize = (n) => [...`${Math.abs(n)}`].map((i) => parseInt(i));
digitize(123); // [1, 2, 3]
digitize(-123); // [1, 2, 3]
```

#### 数组移除元素 drop

```js
const drop = (arr, n = 1) => arr.slice(n);
drop([1, 2, 3]); // [2, 3]
drop([1, 2, 3], 2); // [3]
drop([1, 2, 3], 42); // []
```

#### 数组移除元素，从右边开始 dropRight

```js
const dropRight = (arr, n = 1) => arr.slice(0, -n);
dropRight([1, 2, 3]); // [1, 2]
dropRight([1, 2, 3], 2); // [1]
dropRight([1, 2, 3], 42); // []
```

#### 数组根据条件移除元素 dropWhile

```js
const dropWhile = (arr, func) => {
  while (arr.length > 0 && !func(arr[0])) arr = arr.slice(1);
  return arr;
};
dropWhile([1, 2, 3, 4], (n) => n >= 3); // [3, 4]
```

#### 数组根据条件移除元素，从右边开始 dropRightWhile

```js
const dropRightWhile = (arr, func) => {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
};
dropRightWhile([1, 2, 3, 4], (n) => n < 3); // [1, 2]
```

#### 指定元素是否聚焦 elementIsFocused

```js
const elementIsFocused = (el) => el === document.activeElement;
elementIsFocused(el); // true if the element is focused
```

#### 指定的元素在视口中是否可见 elementIsVisibleInViewport

```js
const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};
// e.g. 100x100 viewport and a 10x10px element at position {top: -1, left: 0, bottom: 9, right: 10}
elementIsVisibleInViewport(el); // false - (not fully visible)
elementIsVisibleInViewport(el, true); // true - (partially visible)
```

#### 检查给定字符串是否以另一个字符串的子字符串结束 endsWithSubstring

```js
const endsWithSubstring = (text, word) => {
  for (let i in word) {
    const substr = word.slice(0, i + 1);
    if (text.endsWith(substr)) return substr;
  }
  return undefined;
};
endsWithSubstring("Lorem ipsum dolor sit amet<br /", "<br />"); // '<br /'
```

#### 转义 HTML 中使用的字符串 escapeHTML

```js
const escapeHTML = (str) =>
  str.replace(
    /[&<>'"]/g,
    (tag) =>
      ({
        "&": "&",
        "<": "<",
        ">": ">",
        "'": "&#39;",
        '"': '"',
      }[tag] || tag)
  );
escapeHTML('<a href="#">Me & you</a>');
// '<a href="#">Me & you</a>'
```

#### 数组返回几的倍数 everyNth

```js
const everyNth = (arr, nth) => arr.filter((e, i) => i % nth === nth - 1);
everyNth([1, 2, 3, 4, 5, 6], 2); // [ 2, 4, 6 ]
```

#### 过滤掉非唯一值的数 filterNonUnique

```js
const filterNonUnique = (arr) =>
  [...new Set(arr)].filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));
filterNonUnique([1, 2, 2, 3, 4, 4, 5]); // [1, 3, 5]
```

#### 过滤掉非唯一值的 key filterNonUniqueBy

```js
const filterNonUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.every((x, j) => (i === j) === fn(v, x, i, j)));
filterNonUniqueBy(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 1, value: "d" },
    { id: 0, value: "e" },
  ],
  (a, b) => a.id === b.id
); // [ { id: 2, value: 'c' } ]
```

#### 获取非唯一值 filterUnique

```js
const filterUnique = (arr) =>
  [...new Set(arr)].filter((i) => arr.indexOf(i) !== arr.lastIndexOf(i));
filterUnique([1, 2, 2, 3, 4, 4, 5]); // [2, 4]
```

#### 获取非唯一值的 key filterUniqueBy

```js
const filterUniqueBy = (arr, fn) =>
  arr.filter((v, i) => arr.some((x, j) => (i !== j) === fn(v, x, i, j)));
filterUniqueBy(
  [
    { id: 0, value: "a" },
    { id: 1, value: "b" },
    { id: 2, value: "c" },
    { id: 3, value: "d" },
    { id: 0, value: "e" },
  ],
  (a, b) => a.id == b.id
); // [ { id: 0, value: 'a' }, { id: 0, value: 'e' } ]
```

#### 查找连续元素的数组 findConsecutive

```js
const findConsecutive = (arr, n) =>
  arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));
findConsecutive([1, 2, 3, 4, 5], 2);
// [[1, 2], [2, 3], [3, 4], [4, 5]]
```

#### 查找第一个包含 key 的对象 findKey

```js
const findKey = (obj, fn) =>
  Object.keys(obj).find((key) => fn(obj[key], key, obj));
findKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  },
  (x) => x["active"]
); // 'barney'
```

#### 查找最后一个包含 key 的对象 findLastKey

```js
const findLastKey = (obj, fn) =>
  Object.keys(obj)
    .reverse()
    .find((key) => fn(obj[key], key, obj));
findLastKey(
  {
    barney: { age: 36, active: true },
    fred: { age: 40, active: false },
    pebbles: { age: 1, active: true },
  },
  (x) => x["active"]
); // 'pebbles'
```

#### 查找所有包含值的 key findKeys

```js
const findKeys = (obj, val) =>
  Object.keys(obj).filter((key) => obj[key] === val);
const ages = {
  Leo: 20,
  Zoey: 21,
  Jane: 20,
};
findKeys(ages, 20); // [ 'Leo', 'Jane' ]
```

#### 将字符串数组转换为到 true 的对象映射 flags

```js
const flags = (arr) => arr.reduce((acc, str) => ({ ...acc, [str]: true }), {});
flags(["red", "green"]); // { red: true, green: true }
```

#### 将毫秒数转化为时间格式 formatDuration

```js
const formatDuration = (ms) => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};
formatDuration(1001); // '1 second, 1 millisecond'
formatDuration(34325055574);
// '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
```

#### 秒转时间格式 formatSeconds

```js
const formatSeconds = (s) => {
  const [hour, minute, second, sign] =
    s > 0
      ? [s / 3600, (s / 60) % 60, s % 60, ""]
      : [-s / 3600, (-s / 60) % 60, -s % 60, "-"];

  return (
    sign +
    [hour, minute, second]
      .map((v) => `${Math.floor(v)}`.padStart(2, "0"))
      .join(":")
  );
};
formatSeconds(200); // '00:03:20'
formatSeconds(-200); // '-00:03:20'
formatSeconds(99999); // '27:46:39'
```

#### 数字转格式 formatNumber

```js
const formatNumber = (num) => num.toLocaleString();
formatNumber(123456); // '123,456' in `en-US`
formatNumber(15675436903); // '15.675.436.903' in `de-DE`
```

#### 数组中相同个数分类 frequencies

```js
const frequencies = (arr) =>
  arr.reduce((a, v) => {
    a[v] = a[v] ? a[v] + 1 : 1;
    return a;
  }, {});
frequencies(["a", "b", "a", "c", "a", "a", "b"]); // { a: 4, b: 2, c: 1 }
frequencies([..."ball"]); // { b: 1, a: 1, l: 2 }
```

#### 字符串大写字母按规则格式化 fromCamelCase

```js
const fromCamelCase = (str, separator = "_") =>
  str
    .replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2")
    .toLowerCase();
fromCamelCase("someDatabaseFieldName", " "); // 'some database field name'
fromCamelCase("someLabelThatNeedsToBeDecamelized", "-");
// 'some-label-that-needs-to-be-decamelized'
fromCamelCase("someJavascriptProperty", "_"); // 'some_javascript_property'
fromCamelCase("JSONToCSV", "."); // 'json.to.csv'
```

#### 全屏打开 fullscreen

```js
const fullscreen = (mode = true, el = "body") =>
  mode
    ? document.querySelector(el).requestFullscreen()
    : document.exitFullscreen();
```

```js
fullscreen(); // Opens `body` in fullscreen mode
fullscreen(false); // Exits fullscreen mode
```

#### 获取不含参数的 url getBaseURL

```js
const getBaseURL = (url) => url.replace(/[?#].*$/, "");
getBaseURL("http://url.com/page?name=Adam&surname=Smith");
// 'http://url.com/page'
```

#### 获取命令行参数 cmd

```js
const getCmdArgs = () => process.argv.slice(2);
// node my-script.js --name=John --age=30
getCmdArgs(); // ['--name=John', '--age=30']
```

#### 获取日期相差几天 getDaysDiffBetweenDates

```js
//(1000 * 3600 * 24) 更改这里的值
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);
getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")); // 9
```

#### 元素中获取所有图像 getImages

```js
const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName("img")].map((img) =>
    img.getAttribute("src")
  );
  return includeDuplicates ? images : [...new Set(images)];
};
getImages(document, true); // ['image1.jpg', 'image2.png', 'image1.png', '...']
getImages(document, false); // ['image1.jpg', 'image2.png', '...']
```

#### 时间添加 am getMeridiemSuffixOfInteger

```js
const getMeridiemSuffixOfInteger = (num) =>
  num === 0 || num === 24
    ? 12 + "am"
    : num === 12
    ? 12 + "pm"
    : num < 12
    ? (num % 12) + "am"
    : (num % 12) + "pm";
getMeridiemSuffixOfInteger(0); // '12am'
getMeridiemSuffixOfInteger(11); // '11am'
getMeridiemSuffixOfInteger(13); // '1pm'
getMeridiemSuffixOfInteger(25); // '1pm'
```

#### 获取浏览器协议 getProtocol

```js
const getProtocol = () => window.location.protocol;
getProtocol(); // 'https:'
```

#### 返回当前页面滚动位置 getScrollPosition

```js
const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
});
getScrollPosition(); // {x: 0, y: 200}
```

#### 获取当前选中文本 getSelectedText

```js
const getSelectedText = () => window.getSelection().toString();
getSelectedText(); // 'Lorem ipsum'
```

#### 获取 url 参数 getURLParameters

```js
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );
getURLParameters("google.com"); // {}
getURLParameters("http://url.com/page?name=Adam&surname=Smith");
// {name: 'Adam', surname: 'Smith'}
```

#### 检测数字是否有小数 hasDecimals

```js
const hasDecimals = (num) => num % 1 !== 0;
hasDecimals(1); // false
hasDecimals(1.001); // true
```

#### 判断对象中是否有 key hasKey

```js
const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every((key) => {
      if (typeof obj !== "object" || !obj.hasOwnProperty(key)) return false;
      obj = obj[key];
      return true;
    })
  );
};
let obj = {
  a: 1,
  b: { c: 4 },
  "b.d": 5,
};
hasKey(obj, ["a"]); // true
hasKey(obj, ["b"]); // true
hasKey(obj, ["b", "c"]); // true
hasKey(obj, ["b.d"]); // true
hasKey(obj, ["d"]); // false
hasKey(obj, ["c"]); // false
hasKey(obj, ["b", "f"]); // false
```

#### 堆排序算法

```js
const heapsort = (arr) => {
  const a = [...arr];
  let l = a.length;

  const heapify = (a, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;
    if (left < l && a[left] > a[max]) max = left;
    if (right < l && a[right] > a[max]) max = right;
    if (max !== i) {
      [a[max], a[i]] = [a[i], a[max]];
      heapify(a, max);
    }
  };

  for (let i = Math.floor(l / 2); i >= 0; i -= 1) heapify(a, i);
  for (i = a.length - 1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    l--;
    heapify(a, 0);
  }
  return a;
};
heapsort([6, 3, 4, 1]); // [1, 3, 4, 6]
```

#### 颜色哈希转 rgb hexToRGB

```js
const hexToRGB = (hex) => {
  let alpha = false,
    h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");
  else if (h.length === 8) alpha = true;
  h = parseInt(h, 16);
  return (
    "rgb" +
    (alpha ? "a" : "") +
    "(" +
    (h >>> (alpha ? 24 : 16)) +
    ", " +
    ((h & (alpha ? 0x00ff0000 : 0x00ff00)) >>> (alpha ? 16 : 8)) +
    ", " +
    ((h & (alpha ? 0x0000ff00 : 0x0000ff)) >>> (alpha ? 8 : 0)) +
    (alpha ? `, ${h & 0x000000ff}` : "") +
    ")"
  );
};
hexToRGB("#27ae60ff"); // 'rgba(39, 174, 96, 255)'
hexToRGB("27ae60"); // 'rgb(39, 174, 96)'
hexToRGB("#fff"); // 'rgb(255, 255, 255)'
```

#### httpDelete

```js
const httpDelete = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("DELETE", url, true);
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send();
};
httpDelete("https://jsonplaceholder.typicode.com/posts/1", (request) => {
  console.log(request.responseText);
}); // Logs: {}
```

#### httpGet

```js
const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send();
};
httpGet("https://jsonplaceholder.typicode.com/posts/1", console.log);
/*
Logs: {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
*/
```

#### httpPost

```js
const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = () => callback(request.responseText);
  request.onerror = () => err(request);
  request.send(data);
};
const newPost = {
  userId: 1,
  id: 1337,
  title: "Foo",
  body: "bar bar bar",
};
const data = JSON.stringify(newPost);
httpPost("https://jsonplaceholder.typicode.com/posts", data, console.log); /*
Logs: {
  "userId": 1,
  "id": 1337,
  "title": "Foo",
  "body": "bar bar bar"
}
*/
httpPost(
  "https://jsonplaceholder.typicode.com/posts",
  null, // does not send a body
  console.log
); /*
Logs: {
  "id": 101
}
*/
```

#### httpPut

```js
const httpPut = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open("PUT", url, true);
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.onload = () => callback(request);
  request.onerror = () => err(request);
  request.send(data);
};
const password = "fooBaz";
const data = JSON.stringify({
  id: 1,
  title: "foo",
  body: "bar",
  userId: 1,
});
httpPut("https://jsonplaceholder.typicode.com/posts/1", data, (request) => {
  console.log(request.responseText);
}); /*
Logs: {
  id: 1,
  title: 'foo',
  body: 'bar',
  userId: 1
}
*/
```

#### https 重定向 httpsRedirect

```js
const httpsRedirect = () => {
  if (location.protocol !== "https:")
    location.replace("https://" + location.href.split("//")[1]);
};
httpsRedirect();
```

#### 数组是否全部包含 includesAll

```js
const includesAll = (arr, values) => values.every((v) => arr.includes(v));
includesAll([1, 2, 3, 4], [1, 4]); // true
includesAll([1, 2, 3, 4], [1, 5]); // false
```

#### 数组中是否有些包含 includesAny

```js
const includesAny = (arr, values) => values.some((v) => arr.includes(v));
includesAny([1, 2, 3, 4], [2, 9]); // true
includesAny([1, 2, 3, 4], [8, 9]); // false
```

#### 字符串是否包含子字符串

```js
const includesCaseInsensitive = (str, searchString) =>
  new RegExp(searchString, "i").test(str);
includesCaseInsensitive("Blue Whale", "blue"); // true
```

#### 转对象格式 indexOn

```js
const indexOn = (arr, key) =>
  arr.reduce((obj, v) => {
    const { [key]: id, ...data } = v;
    obj[id] = data;
    return obj;
  }, {});
```

```js
indexOn(
  [
    { id: 10, name: "apple" },
    { id: 20, name: "orange" },
  ],
  "id"
);
// { '10': { name: 'apple' }, '20': { name: 'orange' } }
```

#### 给定数字是否在范围内 inRange

```js
const inRange = (n, start, end = null) => {
  if (end && start > end) [end, start] = [start, end];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};
inRange(3, 2, 5); // true
inRange(3, 4); // true
inRange(2, 3, 5); // false
inRange(3, 2); // false
```

#### 过滤两个数组重叠部分 intersection

```js
const intersection = (a, b) => {
  const s = new Set(b);
  return [...new Set(a)].filter((x) => s.has(x));
};
intersection([1, 2, 3], [4, 3, 2]); // [2, 3]
```

#### 过滤对象重叠部分 intersectionBy

```js
const intersectionBy = (a, b, fn) => {
  const s = new Set(b.map(fn));
  return [...new Set(a)].filter((x) => s.has(fn(x)));
};
intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor); // [2.1]
intersectionBy(
  [{ title: "Apple" }, { title: "Orange" }],
  [{ title: "Orange" }, { title: "Melon" }],
  (x) => x.title
); // [{ title: 'Orange' }]
```

#### 判断地址是否为绝对地址 isAbsoluteURL

```js
const isAbsoluteURL = (str) => /^[a-z][a-z0-9+.-]*:/.test(str);
isAbsoluteURL("https://google.com"); // true
isAbsoluteURL("ftp://www.myserver.net"); // true
isAbsoluteURL("/foo/bar"); // false
```

#### 判断是否为浏览器 isBrowser

```js
const isBrowser = () => ![typeof window, typeof document].includes("undefined");
isBrowser(); // true (browser)
isBrowser(); // false (Node)
```

#### 检测浏览器 tab 是否选中 isBrowserTabFocused

```js
const isBrowserTabFocused = () => !document.hidden;
isBrowserTabFocused(); // true
```

#### 判断是否为闰年 isLeapYear

```js
const isLeapYear = (year) => new Date(year, 1, 29).getMonth() === 1;
isLeapYear(2019); // false
isLeapYear(2020); // true
```

#### 检查是否启用了 localstorage isLocalStorageEnabled

```js
const isLocalStorageEnabled = () => {
  try {
    const key = `__storage__test`;
    window.localStorage.setItem(key, null);
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
isLocalStorageEnabled(); // true, if localStorage is accessible
```

#### 检查是否为全小写 isLowerCase

```js
const isLowerCase = (str) => str === str.toLowerCase();
isLowerCase("abc"); // true
isLowerCase("a3@$"); // true
isLowerCase("Ab4"); // false
```

#### 检查是否为全大写 isUpperCase

```js
const isUpperCase = (str) => str === str.toUpperCase();
isUpperCase("ABC"); // true
isUpperCase("A3@$"); // true
isUpperCase("aB4"); // false
```

#### 检查数组是否已排序 isSorted

```js
const isSorted = (arr) => {
  if (arr.length <= 1) return 0;
  const direction = arr[1] - arr[0];
  for (let i = 2; i < arr.length; i++) {
    if ((arr[i] - arr[i - 1]) * direction < 0) return 0;
  }
  return Math.sign(direction);
};
isSorted([0, 1, 2, 2]); // 1
isSorted([4, 3, 2]); // -1
isSorted([4, 3, 5]); // 0
```

#### 仅在第一次触发试回调 listenOnce

```js
const listenOnce = (el, evt, fn) =>
  el.addEventListener(evt, fn, { once: true });
listenOnce(document.getElementById("my-id"), "click", () =>
  console.log("Hello world")
); // 'Hello world' will only be logged on the first click
```

#### map 转 object mapToObject

```js
const mapToObject = (map) => Object.fromEntries(map.entries());
mapToObject(
  new Map([
    ["a", 1],
    ["b", 2],
  ])
); // {a: 1, b: 2}
```

#### mapValues

```js
const mapValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, k) => {
    acc[k] = fn(obj[k], k, obj);
    return acc;
  }, {});

const users = {
  fred: { user: "fred", age: 40 },
  pebbles: { user: "pebbles", age: 1 },
};
mapValues(users, (u) => u.age); // { fred: 40, pebbles: 1 }
```

#### 显示尾号 mask

```js
const mask = (cc, num = 4, mask = "*") =>
  `${cc}`.slice(-num).padStart(`${cc}`.length, mask);
```

```js
mask(1234567890); // '******7890'
mask(1234567890, 3); // '*******890'
mask(1234567890, -4, "$"); // '$$$$567890'
```

#### 获取数组中 key 的最大值 maxBy

```js
const maxBy = (arr, fn) =>
  Math.max(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));

maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (x) => x.n); // 8
maxBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 8
```

#### 获取数组中 key 的最小值 minBy

```js
const minBy = (arr, fn) =>
  Math.min(...arr.map(typeof fn === "function" ? fn : (val) => val[fn]));

minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (x) => x.n); // 2
minBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 2
```

#### 获取数组中最大值 maxN

```js
const maxN = (arr, n = 1) => [...arr].sort((a, b) => b - a).slice(0, n);

maxN([1, 2, 3]); // [3]
maxN([1, 2, 3], 2); // [3, 2]
```

#### 合并两个 object merge

```js
const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k)
          ? [].concat(acc[k]).concat(obj[k])
          : obj[k];
        return acc;
      }, {}),
    {}
  );

const object = {
  a: [{ x: 2 }, { y: 4 }],
  b: 1,
};
const other = {
  a: { z: 3 },
  b: [2, 3],
  c: "foo",
};
merge(object, other);
// { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: 'foo' }
```

#### 返回数组中使用频率最高的元素 mostFrequent

```js
const mostFrequent = (arr) =>
  Object.entries(
    arr.reduce((a, v) => {
      a[v] = a[v] ? a[v] + 1 : 1;
      return a;
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0];

mostFrequent(["a", "b", "a", "c", "a", "a", "b"]); // 'a'
```

#### 返回数组的第 n 个元素 nthElement

```js
const nthElement = (arr, n = 0) =>
  (n === -1 ? arr.slice(n) : arr.slice(n, n + 1))[0];

nthElement(["a", "b", "c"], 1); // 'b'
nthElement(["a", "b", "b"], -3); // 'a'
```

#### 从给定的键值对创建一个对象 objectFromPairs

```js
const objectFromPairs = (arr) =>
  arr.reduce((a, [key, val]) => ((a[key] = val), a), {});

objectFromPairs([
  ["a", 1],
  ["b", 2],
]); // {a: 1, b: 2}
```

#### 给个对象返回数组 objectToEntries

```js
const objectToEntries = (obj) => Object.keys(obj).map((k) => [k, obj[k]]);

objectToEntries({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```

```js
const objectToPairs = (obj) => Object.entries(obj);

objectToPairs({ a: 1, b: 2 }); // [ ['a', 1], ['b', 2] ]
```

#### 对象转 map

```js
const objectToMap = (obj) => new Map(Object.entries(obj));

objectToMap({ a: 1, b: 2 }); // Map {'a' => 1, 'b' => 2}
```

#### 对象转 url 参数字符串

```js
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

objectToQueryString({ page: "1", size: "2kg", key: undefined });
// '?page=1&size=2kg'
```

#### 获取 url 参数

```js
const queryStringToObject = (url) =>
  [...new URLSearchParams(url.split("?")[1])].reduce(
    (a, [k, v]) => ((a[k] = v), a),
    {}
  );

queryStringToObject("https://google.com?page=1&count=10");
// {page: '1', count: '10'}
```

#### 从元素中移除事件监听器。

```js
const off = (el, evt, fn, opts = false) =>
  el.removeEventListener(evt, fn, opts);

const fn = () => console.log("!");
document.body.addEventListener("click", fn);
off(document.body, "click", fn); // no longer logs '!' upon clicking on the page
```

#### 从对象中省略与给定键对应的键-值对

```js
const omit = (obj, arr) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

omit({ a: 1, b: "2", c: 3 }, ["b"]); // { 'a': 1, 'c': 3 }
```

#### 确保函数只被调用一次

```js
const once = (fn) => {
  let called = false;
  return function (...args) {
    if (called) return;
    called = true;
    return fn.apply(this, args);
  };
};

const startApp = function (event) {
  console.log(this, event); // document.body, MouseEvent
};
document.body.addEventListener("click", once(startApp));
// only runs `startApp` once upon click
```

#### 每当用户在指定元素之外单击

```js
const onClickOutside = (element, callback) => {
  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) callback();
  });
};

onClickOutside("#my-element", () => console.log("Hello"));
// Will log 'Hello' whenever the user clicks outside of #my-element
```

#### 每当用户停止滚动时运行回调。

```js
const onScrollStop = (callback) => {
  let isScrolling;
  window.addEventListener(
    "scroll",
    (e) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 150);
    },
    false
  );
};

onScrollStop(() => {
  console.log("The user has stopped scrolling");
});
```

#### 每当用户输入类型改变(' mouse '或' touch ')时运行回调。

```js
const onUserInputChange = (callback) => {
  let type = "mouse",
    lastTime = 0;
  const mousemoveHandler = () => {
    const now = performance.now();
    if (now - lastTime < 20)
      (type = "mouse"),
        callback(type),
        document.removeEventListener("mousemove", mousemoveHandler);
    lastTime = now;
  };
  document.addEventListener("touchstart", () => {
    if (type === "touch") return;
    (type = "touch"),
      callback(type),
      document.addEventListener("mousemove", mousemoveHandler);
  });
};

onUserInputChange((type) => {
  console.log("The user is now using", type, "as an input method.");
});
```

#### 返回符合条件的参数

```js
const over =
  (...fns) =>
  (...args) =>
    fns.map((fn) => fn.apply(null, args));

const minMax = over(Math.min, Math.max);
minMax(1, 2, 3, 4, 5); // [1, 5]
```

#### 在字符串左右两边填充

```js
const pad = (str, length, char = " ") =>
  str.padStart((str.length + length) / 2, char).padEnd(length, char);

pad("cat", 8); // '  cat   '
pad(String(42), 6, "0"); // '004200'
pad("foobar", 3); // 'foobar'
```

#### 填充数字个数

```js
const padNumber = (n, l) => `${n}`.padStart(l, "0");

padNumber(1234, 6); // '001234'
```

#### 解析 HTTP Cookie 报头字符串，返回所有 Cookie 名称-值对的对象

```js
const parseCookie = (str) =>
  str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

parseCookie("foo=bar; equation=E%3Dmc%5E2");
// { foo: 'bar', equation: 'E=mc^2' }
```

#### 根据所提供函数对每个元素的真值，将元素分组为两个数组

```js
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

const users = [
  { user: "barney", age: 36, active: false },
  { user: "fred", age: 40, active: true },
];
partition(users, (o) => o.active);
// [
//   [{ user: 'fred', age: 40, active: true }],
//   [{ user: 'barney', age: 36, active: false }]
// ]
```

#### 将数组根据条件分组

```js
const partitionBy = (arr, fn) =>
  arr.reduce(
    ({ res, last }, v, i, a) => {
      const next = fn(v, i, a);
      if (next !== last) res.push([v]);
      else res[res.length - 1].push(v);
      return { res, last: next };
    },
    { res: [] }
  ).res;

const numbers = [1, 1, 3, 3, 4, 5, 5, 5];
partitionBy(numbers, (n) => n % 2 === 0); // [[1, 1, 3, 3], [4], [5, 5, 5]]
partitionBy(numbers, (n) => n); // [[1, 1], [3, 3], [4], [5, 5, 5]]
```

#### 将 object 根据给的 key 筛选出值

```js
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

pick({ a: 1, b: "2", c: 3 }, ["a", "c"]); // { 'a': 1, 'c': 3 }
```

#### 将 object 根据给的条件 筛选出值

```js
const pickBy = (obj, fn) =>
  Object.keys(obj)
    .filter((k) => fn(obj[k], k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

pickBy({ a: 1, b: "2", c: 3 }, (x) => typeof x === "number");
// { 'a': 1, 'c': 3 }
```

#### 检查用户配色方案偏好是否为“深色”

```js
const prefersDarkColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

prefersDarkColorScheme(); // true
```

#### 检查用户配色方案偏好是否为“浅色”。

```js
const prefersLightColorScheme = () =>
  window &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches;

prefersLightColorScheme(); // true
```

#### 将以字节为单位的数字转换为人类可读的字符串

```js
const prettyBytes = (num, precision = 3, addSpace = true) => {
  const UNITS = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (Math.abs(num) < 1) return num + (addSpace ? " " : "") + UNITS[0];
  const exponent = Math.min(
    Math.floor(Math.log10(num < 0 ? -num : num) / 3),
    UNITS.length - 1
  );
  const n = Number(
    ((num < 0 ? -num : num) / 1000 ** exponent).toPrecision(precision)
  );
  return (num < 0 ? "-" : "") + n + (addSpace ? " " : "") + UNITS[exponent];
};

prettyBytes(1000); // '1 KB'
prettyBytes(-27145424323.5821, 5); // '-27.145 GB'
prettyBytes(123456789, 3, false); // '123MB'
```

#### 将异步函数转化为 Promise

```js
const promisify =
  (func) =>
  (...args) =>
    new Promise((resolve, reject) =>
      func(...args, (err, result) => (err ? reject(err) : resolve(result)))
    );

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log("Hi!")); // Promise resolves after 2s
```

#### 快速排序法

```js
const quickSort = (arr) => {
  const a = [...arr];
  if (a.length < 2) return a;
  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = a[pivotIndex];
  const [lo, hi] = a.reduce(
    (acc, val, i) => {
      if (val < pivot || (val === pivot && i != pivotIndex)) {
        acc[0].push(val);
      } else if (val > pivot) {
        acc[1].push(val);
      }
      return acc;
    },
    [[], []]
  );
  return [...quickSort(lo), pivot, ...quickSort(hi)];
};

quickSort([1, 6, 1, 5, 3, 2, 1, 4]); // [1, 1, 1, 2, 3, 4, 5, 6]
```

#### 随机字符串

```js
const randomAlphaNumeric = (length) => {
  let s = "";
  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);
    return s.length >= length;
  });
  return s.slice(0, length);
};

randomAlphaNumeric(5); // '0afad'
```

#### 随机真假值

```js
const randomBoolean = () => Math.random() >= 0.5;

randomBoolean(); // true
```

#### 随机色值

```js
const randomHexColorCode = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

randomHexColorCode(); // '#e34155'
```

#### 随机指定区域数字的数组

```js
const randomIntArrayInRange = (min, max, n = 1) =>
  Array.from(
    { length: n },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );

randomIntArrayInRange(12, 35, 10); // [ 34, 14, 27, 17, 30, 27, 20, 26, 21, 14 ]
```

#### 随机指定区域数字

```js
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

randomIntegerInRange(0, 5); // 2
```

#### 重定向到指定的 URL。

```js
const redirect = (url, asLink = true) =>
  asLink ? (window.location.href = url) : window.location.replace(url);

redirect("https://google.com");
```

#### 根据条件过滤对象数组，同时过滤掉未指定的键

```js
const reducedFilter = (data, keys, fn) =>
  data.filter(fn).map((el) =>
    keys.reduce((acc, key) => {
      acc[key] = el[key];
      return acc;
    }, {})
  );

const data = [
  {
    id: 1,
    name: "john",
    age: 24,
  },
  {
    id: 2,
    name: "mike",
    age: 50,
  },
];
reducedFilter(data, ["id", "name"], (item) => item.age > 24);
// [{ id: 2, name: 'mike'}]
```

#### RGBToHex

```js
const RGBToHex = (r, g, b) =>
  ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");

RGBToHex(255, 165, 1); // 'ffa501'
```

#### 将数字舍入为指定数量的数字

```js
const round = (n, decimals = 0) =>
  Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);

round(1.005, 2); // 1.01
```

#### 连续运行一个承诺数组

```js
const runPromisesInSeries = (ps) =>
  ps.reduce((p, next) => p.then(next), Promise.resolve());

const delay = (d) => new Promise((r) => setTimeout(r, d));
runPromisesInSeries([() => delay(1000), () => delay(2000)]);
// Executes each promise sequentially, taking a total of 3 seconds to complete
```

#### 平滑滚动到页面顶部。

```js
const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

scrollToTop(); // Smooth-scrolls to the top of the page
```

#### 选择排序法

```js
const selectionSort = (arr) => {
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    const min = a
      .slice(i + 1)
      .reduce((acc, val, j) => (val < a[acc] ? j + i + 1 : acc), i);
    if (min !== i) [a[i], a[min]] = [a[min], a[i]];
  }
  return a;
};

selectionSort([5, 1, 4, 2, 3]); // [1, 2, 3, 4, 5]
```

#### 延迟异步函数的执行。

```js
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sleepyWork() {
  console.log("I'm going to sleep for 1 second.");
  await sleep(1000);
  console.log("I woke up after 1 second.");
}
```

#### 平滑地将调用它的元素滚动到浏览器窗口的可见区域。

```js
const smoothScroll = (element) =>
  document.querySelector(element).scrollIntoView({
    behavior: "smooth",
  });

smoothScroll("#fooBar"); // scrolls smoothly to the element with the id fooBar
smoothScroll(".fooBar");
// scrolls smoothly to the first element with a class of fooBar
```

#### 生成字符串的所有排列(包含重复项)。

```js
const stringPermutations = (str) => {
  if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
  return str
    .split("")
    .reduce(
      (acc, letter, i) =>
        acc.concat(
          stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
            (val) => letter + val
          )
        ),
      []
    );
};

stringPermutations("abc"); // ['abc', 'acb', 'bac', 'bca', 'cab', 'cba']
```

#### 从字符串中删除 HTML/XML 标记。

```js
const stripHTMLTags = (str) => str.replace(/<[^>]*>/g, "");

stripHTMLTags("<p><em>lorem</em> <strong>ipsum</strong></p>"); // 'lorem ipsum'
```

#### 求和

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);

sum(1, 2, 3, 4); // 10
sum(...[1, 2, 3, 4]); // 10
```

#### 按条件求和

```js
const sumBy = (arr, fn) =>
  arr
    .map(typeof fn === "function" ? fn : (val) => val[fn])
    .reduce((acc, val) => acc + val, 0);
```

```js
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], (x) => x.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], "n"); // 20
```

#### 检查是否支持触摸事件

```js
const supportsTouchEvents = () => window && "ontouchstart" in window;

supportsTouchEvents(); // true
```

#### 创建一个节流函数，每“等待”毫秒最多调用一次所提供的函数

```js
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

window.addEventListener(
  "resize",
  throttle(function (evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
); // Will log the window dimensions at most every 250ms
```

#### 度量函数执行所花费的时间。

```js
const timeTaken = (callback) => {
  console.time("timeTaken");
  const r = callback();
  console.timeEnd("timeTaken");
  return r;
};

timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
```

#### 将字符串截断到指定长度。

```js
const truncateString = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + "..." : str;

truncateString("boomerang", 7); // 'boom...'
```

#### 截断字符串到指定长度，尽可能保留空格。

```js
const truncateStringAtWhitespace = (str, lim, ending = "...") => {
  if (str.length <= lim) return str;
  const lastSpace = str.slice(0, lim - ending.length + 1).lastIndexOf(" ");
  return str.slice(0, lastSpace > 0 ? lastSpace : lim - ending.length) + ending;
};

truncateStringAtWhitespace("short", 10); // 'short'
truncateStringAtWhitespace("not so short", 10); // 'not so...'
truncateStringAtWhitespace("trying a thing", 10); // 'trying...'
truncateStringAtWhitespace("javascripting", 10); // 'javascr...'
```

#### 取消转义的 HTML 字符。

```js
const unescapeHTML = (str) =>
  str.replace(
    /&|<|>|&#39;|"/g,
    (tag) =>
      ({
        "&": "&",
        "<": "<",
        ">": ">",
        "&#39;": "'",
        '"': '"',
      }[tag] || tag)
  );

unescapeHTML('<a href="#">Me & you</a>');
// '<a href="#">Me & you</a>'
```

#### 在浏览器中生成 UUID。

```js
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );

UUIDGeneratorBrowser(); // '7982fcfe-5721-4632-bede-6000885be57d'
```

#### 在 Node.JS 中生成一个 UUID。

```js
const crypto = require("crypto");

const UUIDGeneratorNode = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (c ^ (crypto.randomBytes(1)[0] & (15 >> (c / 4)))).toString(16)
  );

UUIDGeneratorNode(); // '79c7c136-60ee-40a2-beb2-856f1feabefc'
```

#### 检查给定值是否为数字。

```js
const validateNumber = (n) => {
  const num = parseFloat(n);
  return !Number.isNaN(num) && Number.isFinite(num) && Number(n) == n;
};

validateNumber("10"); // true
validateNumber("a"); // false
```

#### 将给定字符串转换为单词数组。

```js
const words = (str, pattern = /[^a-zA-Z-]+/) =>
  str.split(pattern).filter(Boolean);

words("I love javaScript!!"); // ['I', 'love', 'javaScript']
words("python, javaScript & coffee"); // ['python', 'javaScript', 'coffee']
```

#### 字符串换行

```js
const wordWrap = (str, max, br = "\n") =>
  str.replace(
    new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, "g"),
    "$1" + br
  );

wordWrap(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.",
  32
);
// 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nFusce tempus.'
wordWrap(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.",
  32,
  "\r\n"
);
// 'Lorem ipsum dolor sit amet,\r\nconsectetur adipiscing elit.\r\nFusce tempus.'
```

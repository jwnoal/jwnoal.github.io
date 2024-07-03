---
title: "js工具"
published: 2022-07-01
draft: false
description: "js工具"
tags: ["js"]
category: "代码"
---

将会持续更新个人笔记

#### class 继承

```
class A {
  constructor() {
    this.x = 2;
  }
  print() {
    console.log(this.x)
  }
}
class B extends A {
  // 实化例时constructor()会自动执行
  constructor() {
    super();
    console.log('constructor')
    console.log(this.x)
    this.print();
  }
  write(){
    console.log(this.x + 1)
  }
}
let b = new B();
b.print()
b.write()
// constructor
// 2
// 2
// 2
// 3
```

#### 闭包

```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```

#### 解构赋值

```
let [a,b,c] = [1,2,3]    //对应下标
let {a,b,c} = {a:1,b:2,c:3}    //对应key
// 交换变量的值
let x = 1
let y = 2
[x,y] = [y,x]
```

#### 拷贝

```
let a = [1,2,3]
//拷贝后更改a数组的值将不会影响b,c
let b = Array.from(a)
let c = [...a]
let aa = {
  a:1,
  b:2
};
let bb = {...aa}
```

#### 遍历

```
//数组
let a =  ['a', 'b']
for(let [i,v] of a.entries()){
  console.log(i,v);
}
for(let i of a.keys()){
  console.log(i);
}
//对象
let obj =  {
  a:1,
  b:2
}
for(let [key,value] of Object.entries(obj)){
  console.log(key,value);
}
```

#### async await

```
const animate = async () => {
    await new Promise((resolve,reject) => {
       setTimeout(() => {
        this.readyshow = true;
        console.log(1)
        resolve();
      }, 500)
    });
    await new Promise((resolve,reject) => {
     setTimeout(() => {
        this.readyshow = false;
        console.log(2)
        resolve();
      }, 2000)
    });
    console.log(3)
}
animate();
```

#### Promise.all

```
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
```

#### 数组排序

```
var values = [0,1,3,7,9,15];
values.sort(compare);
alert(values); //0,1,3,7,9,15

function compare (value1,value2){
return value2 - value1;
}

```

#### 对象排序

```
var arr = [
    {name:'zopp',age:0},
    {name:'gpp',age:18},
    {name:'yjj',age:8}
];

function compare(property){
    return function(a,b){
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
    }
}
console.log(arr.sort(compare('age')))
```

#### 检测浏览器语言

```
function getBrowserLanguage() {
  return (navigator.language || navigator.browserLanguage).toLowerCase();
}
```

#### 检测是否为移动端

```
Vue.prototype.$isMobile = function () {
    var a = navigator.userAgent;
    return a.indexOf("Android") != -1 || a.indexOf("iPhone") != -1 || a.indexOf("iPad") != -1;
}();
```

#### 时间戳

```
timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
    }
```

#### unicode 加密解密

```
// 转为unicode 编码
function encodeUnicode(str) {
    var res = [];
    for ( var i=0; i<str.length; i++ ) {
    res[i] = ( "00" + str.charCodeAt(i).toString(16) ).slice(-4);
    }
    return "\\u" + res.join("\\u");
}

// 解码
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
```

#### 加减乘除

```
  //加
function floatAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  return (arg1*m+arg2*m)/m;
}

//减
function floatSub(arg1,arg2){
 var r1,r2,m,n;
 try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
 try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
 m=Math.pow(10,Math.max(r1,r2));
 //动态控制精度长度
 n=(r1>=r2)?r1:r2;
 return ((arg1*m-arg2*m)/m).toFixed(n);
}

//乘
function floatMul(arg1,arg2)   {
 var m=0,s1=arg1.toString(),s2=arg2.toString();
 try{m+=s1.split(".")[1].length}catch(e){}
 try{m+=s2.split(".")[1].length}catch(e){}
 return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}


//除
function floatDiv(arg1,arg2){
   var t1=0,t2=0,r1,r2;
   try{t1=arg1.toString().split(".")[1].length}catch(e){}
   try{t2=arg2.toString().split(".")[1].length}catch(e){}

   r1=Number(arg1.toString().replace(".",""));

   r2=Number(arg2.toString().replace(".",""));
   return (r1/r2)*Math.pow(10,t2-t1);
}
```

#### 验证邮箱

```
// is Email
  Vue.prototype.$isEmail = function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }
```

#### 验证手机号

```
// is Phone num
  Vue.prototype.$isPhoneNum = function (num) {
    var re = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return re.test(num);
  }
```

---
title: "ts 集合"
published: 2024-08-24
draft: false
description: "ts 集合"
tags: ["ts"]
category: "代码"
---

#### tsconfig.json

"strict": true 严格模式
noImplicitAny: true 当隐式类型被推断为 any 时，会抛出一个错误。
strictNullChecks: true 选项会让我们更明确的处理 null 和 undefined，也会让我们免于忧虑是否忘记处理 null 和 undefined

#### 常见类型

原始类型: string，number 和 boolean

1. string 表示字符串，比如 "Hello, world"
2. number 表示数字，比如 42，JavaScript 中没有 int 或者 float，所有的数字，类型都是 number
3. boolean 表示布尔值，其实也就两个值： true 和 false

4. 数组（Array）
   number[] Array<number> (T<U> 泛型语法)

   注意 [number] 和 number[] 表示不同的意思

5. any
   当你不希望一个值导致类型检查错误的时候，就可以设置为 any

6. 对象类型

```ts
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });

// 可选属性
function printName(obj: { first: string; last?: string }) {}
```

7. 联合类型

```ts
function printId(id: number | string) {
  console.log(id.toUpperCase());
  // Property 'toUpperCase' does not exist on type 'string | number'.
  // Property 'toUpperCase' does not exist on type 'number'.
}
// 解决方案是用代码收窄联合类型
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

#### 类型别名

```ts
type Point = {
  x: number;
  y: number;
};
```

#### 接口

````ts
interface Person {
  name: string;
  age: number;
  hobbies: string[];
}


类型别名和接口非常相似，大部分时候，你可以任意选择使用。接口的几乎所有特性都可以在 type 中使用，两者最关键的差别在于类型别名本身无法添加新的属性，而接口是可以扩展的。
```ts
// Interface
// 通过继承扩展类型
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}

const bear = getBear()
bear.name
bear.honey

// Type
// 通过交集扩展类型
type Animal = {
  name: string
}

type Bear = Animal & {
  honey: boolean
}

const bear = getBear();
bear.name;
bear.honey;
// Interface
// 对一个已经存在的接口添加新的字段
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}

const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});

// Type
// 创建后不能被改变
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

// Error: Duplicate identifier 'Window'.
````

类型别名也许不会实现声明合并，但是接口可以
接口可能只会被用于声明对象的形状，不能重命名原始类型

#### 类型断言

有的时候，你知道一个值的类型，但 TypeScript 不知道。

举个例子，如果你使用 document.getElementById，TypeScript 仅仅知道它会返回一个 HTMLElement，但是你却知道，你要获取的是一个 HTMLCanvasElement。

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

双重断言

```ts
const a = expr as any as T;
```

#### 字面量类型

```ts
function printText(s: string, alignment: "left" | "right" | "center") {}
```

#### 字面量推断

```ts
declare function handleRequest(url: string, method: "GET" | "POST"): void;

const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);

// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.

// Change 1:
const req = { url: "https://example.com", method: "GET" as "GET" };
// Change 2
handleRequest(req.url, req.method as "GET");
// Change 3
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);

// 高级：
enum Methods {
  "GET",
  "POST",
}

declare function handleRequest(url: string, method: keyof typeof Methods): void;

type ReqShape = {
  url: string;
  method: keyof typeof Methods;
};

const req: ReqShape = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method);
```

#### null 和 undefined

```ts
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```

#### 函数类型表达式

```ts
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

// 当然了，我们也可以使用类型别名（type alias）定义一个函数类型：
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {}
```

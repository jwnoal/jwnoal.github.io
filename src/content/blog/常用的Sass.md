---
title: '常用的Sass'
description: '常用的Sass'
pubDate: '2023-07-23'
heroImage: '
https://cdn.jump.icu/blog/photo-1454165804606-c3d57bc86b40.jpeg'
---

## Sass 的说明

Sass 是对 CSS 的扩展，让 CSS 语言更强大、优雅。 它允许你使用变量、嵌套规则、 mixins、导入等众多功能， 并且完全兼容 CSS 语法。 Sass 有助于保持大型样式表结构良好， 同时也让你能够快速开始小型项目， 特别是在搭配 Compass 样式库一同使用时。

## 语法

Sass 有两种语法。 第一种被称为 SCSS (Sassy CSS)，是一个 CSS3 语法的扩充版本，这份参考资料使用的就是此语法。 也就是说，所有符合 CSS3 语法的样式表也都是具有相同语法意义的 SCSS 文件。 另外，SCSS 理解大多数 CSS hacks 以及浏览器专属语法，例如 IE 古老的 filter 语法。 这种语种语法的样式表文件需要以 .scss 扩展名。

第二种比较老的语法成为缩排语法（或者就称为 "Sass"）， 提供了一种更简洁的 CSS 书写方式。 它不使用花括号，而是通过缩排的方式来表达选择符的嵌套层级，I 而且也不使用分号，而是用换行符来分隔属性。 很多人认为这种格式比 SCSS 更容易阅读，书写也更快速。 缩排语法具有 Sass 的所有特色功能， 虽然有些语法上稍有差异； 这些差异在{file:INDENTED_SYNTAX.md 所排语法参考手册}中都有描述。 使用此种语法的样式表文件需要以 .sass 作为扩展名。

#### 声明变量

```
$width: 200px;
```

#### 选择器嵌套

```
nav {
  a {
    color: red;
    header & {
      color:green;
    }
  }
}
```

#### 属性嵌套

```
.box {
  font: {
    size: 12px;
    weight: bold;
  }
}
```

#### 伪元素嵌套

```
.box{
  &:before {
    content:"伪元素嵌套";
  }
}
```

#### 混合宏

```
@mixin border-radius($radius:4px) {
  border-radius: $radius;
  color: #fff;
}
button {
  @include border-radius(8px);
  background: #fff;
}
```

#### 继承

```
.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}
```

#### 占位符

```
%mt5 {
  margin-top: 5px;
}
.btn {
  @extend %mt5;
}
```

#### 插值

```
$properties: (margin, padding);
@mixin set-value($side, $value) {
  @each $prop in $properties {
    #{$prop}-#{$side}: $value;
  }
}
.login-box {
    @include set-value(top, 14px);
}
```

#### 判断

```
@mixin blockOrHidden($boolean:true) {
  @if $boolean {
      @debug "$boolean is #{$boolean}";
      display: block;
    }
  @else {
      @debug "$boolean is #{$boolean}";
      display: none;
    }
}

.block {
  @include blockOrHidden;
}

.hidden{
  @include blockOrHidden(false);
}
```

#### 循环 for / each

```
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}

$list: adam john wynn mason kuroir;//$list 就是一个列表
@mixin author-images {
  @each $author in $list {
    .photo-#{$author} {
      background: url("/images/avatars/#{$author}.png") no-repeat;
    }
  }
}
.author-bio {
  @include author-images;
}
```

#### 返回根

```
@at-root
```

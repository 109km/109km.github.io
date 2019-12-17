
---
layout: post
title:  "前端开发未来十年"
date:   2018-12-09 12:00:00 +0800
categories: ["前端开发"]
---

# 语言
### HTML
#### 历史

> 超文本标记语言（第一版）——在1993年6月作为互联网工程工作小组（IETF）工作草案发布（并非标准）
HTML 2.0——1995年11月作为RFC 1866发布，在RFC 2854于2000年6月发布之后被宣布已经过时
HTML 3.2——1997年1月14日，W3C推荐标准
HTML 4.0——1997年12月18日，W3C推荐标准
HTML 4.01（微小改进）——1999年12月24日，W3C推荐标准
HTML 5——2014年10月28日，W3C推荐标准

#### 问题
从html诞生开始，浏览器一直没有对HTML模块化的支持，从2016年起，**w3c**开始正式研究这个问题。
在以往的开发过程中，一直采用两种方式去模块化引入html：

1.后端渲染的方式。以PHP的Smarty为例：

```html
<body>
  <h2>这个是模板文件输出的</h2>
  <hr/>
  子输出一：{block name='first'}{/block}
  <hr/>
  <hr/>
  子输出二：{block name='second'}{/block}
  <hr/>
  <h2>这个是模板文件输出的</h2>
</body>
```
2.前端通过script的方式，使用JS去解析里面内容：

```html
<script id="tpl_res_ques" type="text/html">
  <div class="q_re que_{{qid}}">
    <div class="que_{{qid}}">
      <div class="rep_person">
        <span class="{{role}}">{{if role === "spadmin"}}[{{roleAlias.spadmin}}回答]:{{else if role === "admin"}}[{{roleAlias.admin}}回答]:{{else role === "user"}}[roleAlias.user]:{{/if}}</span>
        <span class="rep_msg">{{content}}</span>
      </div>
    </div>
  </div>
</script>
```

#### 未来

未来所期待的方式有两种：

1.html中直接引入html模块。
 
```html
<script type="module" url="a.html">
```
2.在js中把html作为文本/DOM对象引入。

```javascript
import html from 'a.html';
```

### CSS

#### 历史

![history-of-css.png](/images/history-of-css.jpg)

#### 问题
随着现代网页应用复杂程度越来越高，css代码也愈加复杂。以淘宝网首页为例，在页面中嵌入的css代码解压缩后有**4820**行。这意味着对于一个完整的网站来说，全部的css代码量加起来可能是几万甚至10万行以上。这个规模下，开发者希望能够有效地复用代码和防止样式冲突。可惜的是css并没有一个完善的模块化管理的方式，所有的css都处于`global`作用域下，开发者只能通过编写不同的`selector`名称去划分作用域。目前解决的方式主要有以下三种：

1. 规定清晰的`class`名称规范。所有开发人员按照此规范进行开发。
```css
.hide{} /* 全局级 */ 
.page-index{} /* 页面级 */
.com-modal-title{} /* 通用组件级 */
.page-index .double-eleven-logo{} /* 页面 + 业务 */
```
这个办法的另外一个变种是：基于以上的规则，通过`less` `sass`等css预编译器去书写。
```less
.page-index{
    .header-title{}
    .footer-title{}
}
```
2. 使用各类框架时，通过自动编译的方式实现模块化。以`vue`为例子，在`style`标签上加入`scoped`属性。
编译前：
```html
<template>
  <div class="button-warp">
    <button class="button">text</button>
  </div>
</template>
<style scoped>
.button-warp{
  display:inline-block;
}
.button{
  padding: 5px 10px;
  font-size: 12px;
  border-radus: 2px;
}
</style>
```
编译后：
```html
<div data-v-2311c06a class="button-warp">
  <button data-v-2311c06a class="button">text</button>
</div>

<style>
.button-warp[data-v-2311c06a]{
  display:inline-block;
}
.button[data-v-2311c06a]{
  padding: 5px 10px;
  font-size: 12px;
  border-radus: 2px;
}
</style>
```
实际上这个功能还是利用编译工具，修改了css的`selector`来达到作用域的作用。

3. 使用BEM (Block Element Modifier)。本质上还是通过约束每一个css选择器的名称来控制作用域。

```css
[block]__[element]--[modifier] {
  padding: 10px 20px;
  font-weight: bold;
  font-size: 2rem;
}
```

#### 未来
css语言也要向更能够工程化的方向去发展。

目前已有的两个技术：
1. css modules，将css样式转化为js对象，在js文件中引入。目前常见于react项目。

*App.css*
```css
.title {
  color: red;
}
```
*App.jsx*
```jsx
import React from 'react';
import style from './App.css';
export default () => {
  return (
    <h1 className={style.title}>
      Hello World
    </h1>
  );
};
```

编译之后:

```html
<h1 class="_3zyde4l1yATCOkgn-DBWEL">
  Hello World
</h1>
```

```css
._3zyde4l1yATCOkgn-DBWEL {
  color: red;
}
```

2. css变量。这种方式能够解决的问题是，将大量的重复样式设置为变量，然后多处引用，可以大量减少css的属性编写量。同时在某个`selector`中书写变量的时候，此变量是带有所在`selector`作用域的。不过，此技术的缺点在于并没有解决css`selector`过多过长的问题，我们可以假想一下如果`selector`的名称也都可以使用变量的话，岂不是美滋滋。


```less
html {
  --main-bg-color: brown;
  --main-title-mixin:{
    font-size: 16px;
    color: #333;
  }
}

.bg{
  background-color: var(--main-bg-color);
  @apply --main-title-mixin;
}
```

### JS

#### 历史

![history-of-js.jpg](/images/history-of-js.jpg)

#### 问题

主要探讨一下ES5中的问题：

1. 没有块级作用域。
2. 各种隐式转换。
3. 没有模块机制。
4. `this`的指向问题。

#### 未来

**语言本身**

主要在于于ES6甚至ES7带来的改变。

1.块级作用域：`let` `const`

2.模块机制，静态化加载。

```javascript
import * from 'util.js';
```

3.引入箭头函数修改`this`指向问题。

4.引入了`class`。

**浏览器中技术的革新**

1. `WebAssembly` : **让其他语言的代码也可以运行在浏览器中**。
2. `Web components` : 浏览器原生支持的组件式开发。
3. `Service worker` : 让浏览器拥有强大的缓存能力。
典型应用：Google提出的 `Progressive Web App`。
4. `IndexedDB` : 浏览器里的数据库，还能储存二进制数据。


# 桌面化

使用前端技术`html` `css` `js`开发桌面APP。

已有框架：

[Electron](https://electronjs.org/) : Github Desktop / Atom / VS Code

[NW.js](https://nwjs.io/) : 微信开发者工具

[AppJS](http://appjs.com/)

[Metor](https://www.meteor.com/)

[Angular](https://angular.io/)

![example-of-electron.jpg](/images/example-of-electron.jpg)


# 手机客户端

使用前端技术开发`html` `css` `js`手机APP。

已有框架：

[Phonegap](https://phonegap.com/)

[Mobile Angular](http://mobileangularui.com/)

[React Native](https://facebook.github.io/react-native/) : Facebook / Instagram / Pinterest

[Metor](https://www.meteor.com/)

[NativeScript](https://www.nativescript.org/)

[Angular](https://angular.io/)

![example-of-mobile-apps.png](/images/example-of-mobile-apps.jpg)


# IOT

**IOT = Internet of Things**

随着互联网时代的深入发展，一切东西都可能联网：冰箱，手表，眼镜，衣服甚至我们自己。

在这个情况下，所有的东西都需要交互的界面，这是一个非常大的挑战，因为交互方式和展示内容的设备可以是各种各样的。

![example-of-lot-01.jpg](/images/example-of-lot-01.jpg)

![example-of-lot-02.jpg](/images/example-of-lot-02.jpg)

![example-of-lot-03.jpg](/images/example-of-lot-03.jpg)

# 浏览器操作系统化

[Chrome OS](https://www.chromium.org/chromium-os) 致力于把浏览器变成一个操作系统。

可以想象一下未来网速获得极速提升之后，假设网速达到*1GB/s*，意味着我们可以不需要自己的硬盘了，所有资料可以储存在云端，看电影只要1秒种，玩游戏完全可以即时下载后运行，因为下载一个大型游戏只要几秒钟。今天我们价值**10万rmb**的最快的SSD读取速度只有*530MB/s*([闪迪SSD](https://item.jd.com/37283584091.html))

![example-of-chrome-os-01.jpg](/images/example-of-chrome-os-01.jpg)

![example-of-chrome-os-02.jpg](/images/example-of-chrome-os-02.jpg)

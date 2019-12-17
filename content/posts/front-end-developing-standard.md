---
layout: post
title:  "前端开发规范"
date:   2017-11-22 16:47:12 +0800
categories: ["前端开发"]
---

## 开发篇
### 总则
#### 缩进
统一采用2个空格，禁止使用4个空格或者`tab`
#### 文件编码
所有文件均使用**UTF-8(无BOM)**模式，如果不知道怎么调整，查找自己编辑器的编码模式。
#### 大小写
目录、文件名统一使用小写，多词使用 `-`进行连接。比如 `component-city`
#### 注释
对复杂的模块/功能添加注释，阐述其逻辑。不同语言的具体注释方法请参考其相应部分。
#### 目录结构
良好的目录结构能提高开发效率，增强代码质量，保证多人协作的良好运行。
不同的项目可以有不同的目录结构，但大致应当遵循的规则如下：

```
Hello                               项目根目录，通常为项目名称
├── README.md                       项目说明文档
├── config                          配置目录
│   ├── config.dev.js               dev环境配置
│   ├── config.js                   本地环境配置
│   └── config.production.js        线上环境配置
├── dist                            部署后代码目录
├── mock                            模拟数据目录
│   └── mock.json                   模拟数据文件，根据需要可添加多个
└── src                             源代码目录
    ├── common                      全局通用代码目录，与业务相关
    │   └── common.js
    ├── components                  组件目录
    │   └── swiper                  组件名称
    │       ├── index.css
    │       ├── index.html
    │       └── index.js
    ├── pages                       页面目录
    │   └── index                   页面名称
    │       ├── index.css
    │       ├── index.html
    │       └── index.js
    ├── statics                     非业务相关静态文件
    │   ├── css                     css目录
    │   │   └── common.css
    │   ├── image                   图片目录
    │   │   └── logo.png
    │   └── js                      js目录
    │       └── common.js
    └── utils                       公用方法目录
        ├── array.js
        └── fetch.js
```
### HTML
#### 标签
* 自闭合标签：需要闭合，例如： `<img src="" />` `<br />`等。
* 正常闭合标签：需要闭合，例如 `<div></div>`等。
* 标签嵌套：按嵌套规范进行，禁止出现 `<span><div></div></span>` 或者 `<p><div></div></p>`等类似情况。

#### 语义化
* 标签使用语义化标签。例如 `<header></header>`,`<footer></footer>`
* 如果标签无法语义化，请在id，class命名时语义化。

#### class与id
* 命名采用小写字母及`-`组成，例如：`icon-logo`
* 命名尽量体现功能或者内容，例如：`popular-video-list`；尽量不要使用意义不明确的，例如：`round` `item`
* class命名可以采用多个class并列。例如`top-news-list border-radius font-color-red`。
* 如果class中有在js中使用的，请以`js-`开始。例如：`js-button-submit`
* class名称层级化。当前页面若比较复杂，需要大量的html，每一层级都要拥有自己的命名空间，作用是在对页面和css进行架构的时候可以清楚的区分出到底哪些属于整站共用或是当前页面共用，或是某一组件专属。比如：

```html
<div class="grid">
  <div class="hot-section hot-news">
    <div class="nav nav-hot-news">热门新闻导航</div>
  </div>
  <div class="hot-section hot-classes">
    <div class="nav nav-hot-classes">热门课程导航</div>
  </div>
</div>
```

#### 文档相关
* 使用 `<!DOCTYPE html>` 进行文档声明。
* 使用 `<meta charset="utf-8">` 指定页面字符编码。

### CSS
#### class与id
* 保持与HTML中的命名方式一致。
* 尽量避免选择器，calss，id的叠加使用。比如：`ul#nav`。

#### 书写格式
* 每一条css规则独占一行。示例如下：

```css
.container{
  width:100%;
  height:100%;
  overflow:hidden;
}
```
* 若多个选择器并列，则每一个选择器也独占一行，行尾用逗号分隔。示例如下：

```css
p,
div,
th,
td,
form{
  margin:0;
  padding:0;
}
```

* css相关属性排列在一起。示例如下：

```css
div{
  display:block;
  width:200px;
  height:100px;
  margin:20px;
  padding:0 20px;
  
  position:absolute:
  top:10px;
  left:50px;
  
  font-size:16px;
  color:#333;
  text-align:center;
  
  background-color:#fff;
  opacity:0.8;
}
```

#### 性能优化
* css中消耗较高的属性：
    * box-shadows
    * border-radius
    * transparency
    * transforms
    * CSS filters（性能杀手）

* float的使用：
float不仅会导致DOM脱离正常文档流，还消耗大量性能。

* css选择器机制理解：
css选择器是**从右向左**进行，所以下面中的css选择器实际运行效率很低：

```css
#logo a{
  color:#fff;
}
```
因为此时css会先查找所有`a`标签，然后查找哪些a标签的父祖级元素中有`#logo`，所以效率非常低下。推荐及不推荐写法展示如下：

```css
/* 不推荐写法 */
button#submit-button {}
li.item {}
table tr td {}

/* 推荐写法 */
#submit-button {}
.item {}
.td {}
```

### Javascript
#### 注释
* 单行注释。一条注释占一行， `//`后加空格缩进与下面代码一致，注释内容是对下方代码的解释说明。
* 多行注释。

    * 文件注释

```javascript
/**
 * @description This is homepage
 * @author shaoxinheng
 */
```

    * 函数注释

```javascript
/**
 * @param {string} p1 p1的说明
 * @param {number=} p2 p2的说明（可选）
 * @param {object.name} p3.name p3.name的说明
 * @return {object} 返回值描述
 */
```

#### 命名
* 变量。采用驼峰式命名。

```javascript
var headerText = "Hello";
```

* 私有变量。私有变量以`_`开头。

```javascript
var _privateName = "Jack";
```

* 常量。全部大写，单词之间使用 `_` 分隔。

```javascript
var GLOBAL_SITE_ID = 123;
```

* 函数。采用驼峰命名，同时名称应该表明此函数实际作用。

```javascript
function sayHello(){}
function arrayToString(){}
```

* 函数参数。采用驼峰命名。

```javascript
function sayHello(userName){};
```

* 类名。采用Pascal命名，类的属性和参数采用驼峰。

```javascript
function Car(id,shape,carBrand){
  this.id = id;
  this.shape = shape;
  this.carBrand = carBrand;
}
Car.prototype.turnLeft = function(){}
```

* 缩写情况。整个缩写单词保持大小写一致。

```javascript
function insertHTML(){}
function httpRequest(){}
var wxLibary = 'lib';
```

* boolean类型以，`is`或`has`开头。

```javascript
var isFromShare = false;
var hasDrawedPrice = true;
```

#### 性能优化
* 减少DOM操作，如果多次使用，缓存DOM

```javascript
// Recommended
var myList = "";
var myListHTML = document.getElementById("myList").innerHTML;

for (var i = 0; i < 100; i++) {
  myList += "<span>" + i + "</span>";
}

myListHTML = myList;

// Recommended
var fragNode = document.createDocumentFragment();
var myList = document.getElementById("myList");

for (var i = 0; i < 100; i++) {
  fragNode.appendChild( "<span>" + i + "</span>");
}
myList.appendChild(fragNode);

// Not recommended
for (var i = 0; i < 100; i++) {
  document.getElementById("myList").innerHTML += "<span>" + i + "</span>";
}
```



## 流程篇
### 发布流程
#### 预发布环境测试步骤
1. 需求Review。与相关PM确认本次发布需求，列出所有待发布的产品功能点。
2. 预发布代码分支准备。开发人员将开发分支合并到预发布分支，需要开发人员明确每一处改动的作用，保证所有合并代码是本次发布所需要。
3. 预发布环境上线。开发人员将自己所负责代码发布到相应的预发布环境，保证预发布环境下的前端功能、接口调用、后端服务、数据库运行正常。
4. 预发布环境检查。测试人员先确认预发布环境正常，比如：操作相关运营内容是在预发布环境，提防出现预发环境调用线上API或者操作线上数据库等情况出现等等。
5. 预发布环境测试。测试人员在确保预发环境无误之后，开始进行测试。
6. 制定上线步骤。预发布环境测试通过后，与开发人员及运营人员制定严格的上线步骤，上线阶段按此步骤进行。
7. 输出文档。以上所有步骤落实到《发布说明书》。[查看示例](http://172.16.117.161:3000/documents/19)

#### 上线步骤
1. 按步骤执行《发布说明书-上线步骤》，每一步骤需要相应负责人确认，确认无误方可执行。全部步骤执行完毕之后，所有内容应已发布到线上环境。
2. 在线上环境按步骤执行《发布说明书-上线后检查步骤》。
3. 发布完毕。


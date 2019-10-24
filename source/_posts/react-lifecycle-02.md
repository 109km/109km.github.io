---
layout: post
title:  "【React - 02】React Component生命周期详解"
date:   2017-11-09 00:00:00 +0800
categories: react
---

### 为什么需要明白Component生命周期？
---
React Component生命周期是React的重要设计思想和概念之一。所以如果想更深入了解React的工作机制，更好的使用React进行实战，这里就是开始。

### Before 生命周期
---

#### Component设计思想
Component是从[有限状态机（FSM）](https://zh.wikipedia.org/wiki/%E6%9C%89%E9%99%90%E7%8A%B6%E6%80%81%E6%9C%BA)的思想中衍生出来的一个模型。主要工作原理跟有限状态机几乎一样：通过状态、条件、动作来描述信息流转。

有限状态机的动作一般有下面几种：

- 进入动作：在进入状态时进行
- 退出动作：在退出状态时进行
- 输入动作：依赖于当前状态和输入条件进行
- 转移动作：在进行特定转移时进行

如下图（图片来自[这里](https://segmentfault.com/a/1190000003940416)），通过这个图可以清楚看到数据在每个节点不同状态时候形成了不同的转换，最终形成有限状态机。说的生动一点：想象数据是河水，然后我们设置关卡控制河水的流向，运动，停止。

![](/images/fsm.jpeg)

<br>

### During 生命周期
---

#### Component Initialization

在这个阶段实例首次被创建，后面创建的实例会与第一次创建的实例在此阶段稍有不同。下面是这个阶段中会顺序执行的函数。

![](/images/react-component-initialization.jpeg)

**getDefaultProps**

这个函数用于创建默认的props属性。返回值必须是 `Object` 或 `NULL`。由于这个函数比较特殊，只会在`React.createClass`第一次执行的时候调用一次，所以下面研究一下原因。

在创建Component的时候会调用`React.createClass`这个函数，这个函数实际的实现是在`ReactClass.createClass`里。我们看看这个函数里都执行了哪些操作：

- Constructor函数：这个Constructor中主要包含了初始化props获取initialState等功能，并没有任何与`getDefaultProps`有关的东西。第一次实例化后，再次调用`React.createClass`实际上执行的只有这个函数。

- 其他部分：在Component实例化过程中只会执行一次。下面的代码就在这个部分中，所以解释了为什么`getDefaultProps`只会执行一次。

        // Initialize the defaultProps property after all mixins have been merged.
        if (Constructor.getDefaultProps) {
          Constructor.defaultProps = Constructor.getDefaultProps();
        }


<br>

> ps:更详细和具体的过程我也不清楚，希望有大神指导。

**getInitialState**

这个函数用于创建Component的初始化state。返回值必须是 `Object` 或 `NULL`。

此函数会在每次Component创建的时候被调用。

**componentWillMount**

这个函数在Component每次被创建的阶段都会被调用，代表的意思是：组件即将创建。在server和client都会调用。

**render**

这个函数是进行Component渲染的，React会将Component输出到页面中。server和client都会触发。

**componentDidMount**

这个函数是在Component渲染完毕之后触发。只在客户端触发，server不会触发

<br>

#### Component Creating（创建）
这个阶段是Component创建期，在这个阶段主要有以下几个方法会被触发。

- getInitialState
- componentWillMount
- render
- componentDidMount

<br>

#### Component Updating（更新）
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

<br>

#### Component Unmouting（销毁）
- componentWillUnmount

<br>

下面举个例子：

    var React = require('react/addons');
    var LifeCycle = require('react-lifecycle');
    
    var MyComponent = React.createClass({
      mixins: [LifeCycle],
    
      render: function(){
        console.log('render');
        return null;
      }
    });
    
    React.render(<MyComponent />, document.body);  // 1
    React.unmountComponentAtNode(document.body);   // 2
    React.render(<MyComponent />, document.body);  // 3
    React.render(<MyComponent />, document.body);  // 4


下面是输出：

    // 1
    getDefaultProps
    getInitialState
    componentWillMount
    render
    componentDidMount
    // 2
    componentWillUnmount
    // 3
    getInitialState
    componentWillMount
    render
    componentDidMount
    // 4
    componentWillReceiveProps
    shouldComponentUpdate
    componentWillUpdate
    render
    componentDidUpdate


<br>

参考链接：

[http://facebook.github.io/react/docs/component-specs.html](http://facebook.github.io/react/docs/component-specs.html)

[https://segmentfault.com/a/1190000003940416](https://segmentfault.com/a/1190000003940416)



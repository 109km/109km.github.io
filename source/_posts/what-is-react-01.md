---
layout: post
title:  "【React - 01】What’s React"
date:   2017-11-06 15:47:12 +0800
categories: react
---

### React初识
---
React只是MVC中的V。

React核心是Component，Component是html / javascript的合集。

<br />

### React相关基础概念
---
<br />

#### JSX

在javascript中写HTML的语法工具。

<br />

#### Virtual DOM

虚拟DOM。React自己生成的一套DOM系统，用于渲染真实的DOM。

<br />

#### React.createClass

创建一个Component的方法。

<br />

#### render(method)

Component的HTML模板。

<br />

#### React.render

渲染React Component到真实的DOM结点上。

<br />

#### state

Component的状态，其实就是Component的内置数据，通过更改state属性，可以对实现对Component的更新。
例如，下面的代码里通过this.state.name控制Component中的内容展示。


    render: function() {
        return (
            <header>
            { this.state.name ?
                this.state.name :
                <span>Not Logged In</span> }
            </header>
        );
    }

<br />

#### getInitialState

获取Component的初始化state。

<br />

#### setState

设置Component的state属性。

<br />

#### props

父级Component传递给子级Component的属性。比如onClick也是props的一种。在下面这个例子中父级节点 <HelloUser> 传递了 name=“Tyler” 给子节点 <div>

    var HelloUser = React.createClass({
      render: function(){
        return (
          <div> Hello, {this.props.name}</div>
        )
      }
    });

    React.render(<HelloUser name="Tyler"/>, document.getElementById('app'));


<br />

#### setProps

设置props属性。需要注意的是这个函数只能在父级节点设置子级节点的props，不能调用 this.setProps，或者直接修改this.props，这是一个只读属性。

<br />

#### propTypes

用于控制props属性的数据类型。通过这个属性可以很好的描述组件的API。

<br />

#### getDefaultProps

获取默认的props属性的值。这个函数是不是在组件实例化的时候调用的，而是在React.createClass时调用的，所以无法在这个函数中使用特定的实例数据。

<br />

#### Component LifeCycle

这里列出的是跟Component生命周期相关的方法，不是完整的Component生命周期。

- componentWillMount——Component创建之前触发
- componentDidMount——Component创建之后触发
- componentWillReceiveProps——Component的props属性变化的时候触发
- componentWillUnmount——Component销毁之前触发

<br />

#### Events

- onClick
- onSubmit
- onChange

<br>

### React生命周期
---

#### 实例化(Initializing)

一个组件类首次实例化的时候，会依次调用下面的方法：

- getDefaultProps
- getInitialState
- componentWillMount
- render
- componentDidMount

对于该组件类的所有后续应用，下面的方法会被依次调用：

- getInitialState
- componentWillMount
- render
- componentDidMount

可以看到，此时已经不再调用getDefaultProps。

<br>

#### 存在期(Updating)

当组件在使用过程中，组件的状态会发生变化，会触发不同的方法：

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- render
- componentDidUpdate

<br>

#### 销毁期(Unmounting)

- componentWillMount


<br>
<br>
参考链接：

[http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/](http://tylermcginnis.com/reactjs-tutorial-a-comprehensive-guide-to-building-apps-with-react/)

[http://blog.andrewray.me/reactjs-for-stupid-people/](http://blog.andrewray.me/reactjs-for-stupid-people/)

[http://busypeoples.github.io/post/react-component-lifecycle/](http://busypeoples.github.io/post/react-component-lifecycle/)

[http://www.ruanyifeng.com/blog/2015/03/react.html](http://www.ruanyifeng.com/blog/2015/03/react.html)






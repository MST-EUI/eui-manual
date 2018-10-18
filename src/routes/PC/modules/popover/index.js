/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React, { Component } from 'react';
import 'rc-tooltip/assets/bootstrap.css';
import ReactDOM from 'react-dom';
import {
  Code,
  Demo,
  Button,
} from '@mistong/eui';

/* placeholder begin eui style */
import '@mistong/eui/dist/index.css';
/* placeholder end eui style */

/* placeholder begin src */
import Popover from '@mistong/eui-popover';
/* placeholder end src */

import './index.scss';

class HoverDemo extends Component {
  render() {
    const overlay = (
      <div>
          这是个自定义的tooltip overlay!
      </div>
    );
    return (
      <div style={{ marginLeft: 250, marginTop: 50 }}>
        <div style={{ marginLeft: 78 }}>
          <Popover placement="topLeft" title="上左" overlay={overlay}>
            <Button type="primary">上左</Button>
          </Popover>
          <Popover placement="top" title="上边" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>上边</Button>
          </Popover>
          <Popover placement="topRight" title="上右" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>上右</Button>
          </Popover>
        </div>
        <div style={{ width: 78, float: 'left' }}>
          <Popover placement="leftTop" title="左上" overlay={overlay}>
            <Button type="primary">左上</Button>
          </Popover>
          <Popover placement="left" title="左边" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>左边</Button>
          </Popover>
          <Popover placement="leftBottom" title="左下" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>左下</Button>
          </Popover>
        </div>
        <div style={{ width: 78, marginLeft: 310 }}>
          <Popover placement="rightTop" title="右上" overlay={overlay}>
            <Button type="primary" >右上</Button>
          </Popover>
          <Popover placement="right" title="右边" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>右边</Button>
          </Popover>
          <Popover placement="rightBottom" title="右下" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>右下</Button>
          </Popover>
        </div>
        <div style={{ marginLeft: 78, clear: 'both' }}>
          <Popover placement="bottomLeft" title="下左" overlay={overlay}>
            <Button type="primary">下左</Button>
          </Popover>
          <Popover placement="bottom" title="下边" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>下边</Button>
          </Popover>
          <Popover placement="bottomRight" title="下右" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>下右</Button>
          </Popover>
        </div>
      </div>
    );
  }
}

class ClickDemo extends Component {
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <Popover
          trigger="click"
          title="这是Popover的title"
          content="这是Popover的content这是Popover的content这是Popover的content这是Popover的content"
        >
          <Button type="primary">点击弹出</Button>
        </Popover>
      </div>
    );
  }
}

export default class DemoComponent extends Component {
  render() {
    const hoverSourceCode = `import { Popover, Button } from '@mistong/eui';

class HoverDemo extends Component {
  render() {
    const overlay = (
      <div>
          这是个自定义的tooltip overlay!
      </div>
    );
    return (
      <div style={{ marginLeft: 250, marginTop: 50 }}>
        <div style={{ marginLeft: 78 }}>
          <Popover placement="topLeft" title="上左" overlay={overlay}>
            <Button type="primary">上左</Button>
          </Popover>
          <Popover placement="top" title="上边" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>上边</Button>
          </Popover>
          <Popover placement="topRight" title="上右" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>上右</Button>
          </Popover>
        </div>
        <div style={{ width: 78, float: 'left' }}>
          <Popover placement="leftTop" title="左上" overlay={overlay}>
            <Button type="primary">左上</Button>
          </Popover>
          <Popover placement="left" title="左边" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>左边</Button>
          </Popover>
          <Popover placement="leftBottom" title="左下" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>左下</Button>
          </Popover>
        </div>
        <div style={{ width: 78, marginLeft: 310 }}>
          <Popover placement="rightTop" title="右上" overlay={overlay}>
            <Button type="primary" >右上</Button>
          </Popover>
          <Popover placement="right" title="右边" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>右边</Button>
          </Popover>
          <Popover placement="rightBottom" title="右下" overlay={overlay}>
            <Button type="primary" style={{ marginTop: 5 }}>右下</Button>
          </Popover>
        </div>
        <div style={{ marginLeft: 78, clear: 'both' }}>
          <Popover placement="bottomLeft" title="下左" overlay={overlay}>
            <Button type="primary">下左</Button>
          </Popover>
          <Popover placement="bottom" title="下边" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>下边</Button>
          </Popover>
          <Popover placement="bottomRight" title="下右" overlay={overlay}>
            <Button type="primary" style={{ marginLeft: 10 }}>下右</Button>
          </Popover>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <HoverDemo />,
  document.getElementById('app'),
);
`;
    const clickSourceCode = `import { Popover, Button } from '@mistong/eui';

class ClickDemo extends Component {
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <Popover
          trigger="click"
          title="这是Popover的title"
          content="这是Popover的content这是Popover的content这是Popover的content这是Popover的content"
        >
          <Button type="primary">点击弹出</Button>
        </Popover>
      </div>
    );
  }
}

ReactDOM.render(
  <ClickDemo />,
  document.getElementById('app'),
);
`;
    return (
      <Demo className="eui-popover-demo">
        <h2>Popover 弹层</h2>
        <p>通用的触发式弹层组件, 可以自定义定位算法、触发方式以及弹层显示方式。</p>
        <h3>代码演示</h3>
        <Code sourceCode={hoverSourceCode} buttonText="悬浮弹出">
          <HoverDemo />
        </Code>
        <Code sourceCode={clickSourceCode} buttonText="点击弹出">
          <ClickDemo />
        </Code>
        <h3>API</h3>
        <table>
          <thead>
            <tr>
              <th>参数</th>
              <th>说明</th>
              <th>类型</th>
              <th>默认值</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>type</td>
              <td>背景图片类型 (<Code mode="inline">small</Code> <Code mode="inline">medium</Code> <Code mode="inline">large</Code>)</td>
              <td>string</td>
              <td><Code mode="inline">medium</Code></td>
            </tr>
            <tr>
              <td>children</td>
              <td>描述文案</td>
              <td>any</td>
              <td>暂无数据</td>
            </tr>
            <tr>
              <td>icon</td>
              <td>自定义图片</td>
              <td>string</td>
              <td>https://yukap6.github.io/images/empty.png</td>
            </tr>
            <tr>
              <td>lang</td>
              <td>语言包类型 (<Code mode="inline">zh-cn</Code> <Code mode="inline">en</Code>)</td>
              <td>string</td>
              <td><Code mode="inline">zh-cn</Code></td>
            </tr>
            <tr>
              <td>className</td>
              <td>添加自定义class</td>
              <td>string</td>
              <td><Code mode="inline">&#39;&#39;</Code></td>
            </tr>
            <tr>
              <td>style</td>
              <td>自定义样式</td>
              <td>object</td>
              <td><Code mode="inline">{'{}'}</Code></td>
            </tr>
            <tr>
              <td>prefixCls</td>
              <td>样式名前缀</td>
              <td>string</td>
              <td>eui-empty-data</td>
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  }
}
/* placeholder end class */


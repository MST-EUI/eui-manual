/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Icon,
  Code,
  Demo,
} from '@mistong/eui';

/* placeholder begin eui style */
import '@mistong/eui/dist/index.css';
/* placeholder end eui style */

/* placeholder begin src */
import { Tabs, TabPane } from '@mistong/eui-tab';
/* placeholder end src */

import './index.scss';

function callback() {
  // console.log(key);
}

export default class DemoComponent extends React.Component {
  render() {
    const sourceCode = `import { Tab } from @mistong/eui;
    const { Tabs, TabPane } = Tab;

<Tab />
`;
    return (
      <Demo className="eui-tab-demo">
        <h2>Tab 选项卡</h2>
        <p>选项卡组件</p>
        <h3>代码演示</h3>
        <Code sourceCode={sourceCode}>
          <div className="demo1">
            <Tabs defaultActiveKey="3" onChange={callback}>
              <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
              <TabPane tab="选项卡2" key="2">选项卡二内容</TabPane>
              <TabPane tab="选项卡3" key="3">选项卡三内容</TabPane>
            </Tabs>
            <div className="desc">
            defaultActiveKey 设置默认选项
              <br />
            onChange设置回调函数
            </div>
          </div>
          <div className="demo2">
            <Tabs defaultActiveKey="1">
              {/* disabled 禁用某一项 */}
              <TabPane tab="选项卡一" key="1">选项卡一</TabPane>
              <TabPane tab="选项卡二" disabled key="2">选项卡二</TabPane>
              <TabPane tab="选项卡三" key="3">选项卡三</TabPane>
            </Tabs>
            <div className="desc">
            disabled 禁用该项
            </div>
          </div>
          <div className="demo3">
            <Tabs defaultActiveKey="2">
              {/* 自定义tab卡标题 */}
              <TabPane
                tab={<span > <i className="iconfont icon-kefuyouxian" />选项卡一 </span>}
                key="1"
              >
              选项卡一
              </TabPane>
              <TabPane
                tab={<span > <i className="iconfont icon-tianmaopaidui" />选项卡二 </span>}
                key="2"
              >
              选项卡二
              </TabPane>
            </Tabs>
            <div className="desc">
            有图标的标签。
            </div>
          </div>
          <div className="demo4">
            <Tabs defaultActiveKey="1">
              {/* 可以左右滑动，容纳更多标签。   */}
              <TabPane tab="选项卡二选项卡二内容选项卡二内容内容" key="1">选项卡一</TabPane>
              <TabPane tab="选项二" key="2">选项卡二</TabPane>
              <TabPane tab="选项三" key="3">选项卡三</TabPane>
              <TabPane tab="选项四" key="4">选项卡四</TabPane>
              <TabPane tab="选项五" key="5">选项卡五</TabPane>
              <TabPane tab="选项六" key="6">选项卡六</TabPane>
              <TabPane tab="选项七" key="7">选项卡七</TabPane>
              <TabPane tab="选项八" key="8">选项卡八</TabPane>
              <TabPane tab="选项九" key="9">选项卡九</TabPane>
              <TabPane tab="选项一" key="10">选项卡一</TabPane>
              <TabPane tab="选项二" key="22">选项卡二</TabPane>
              <TabPane tab="选项三" key="33">选项卡三</TabPane>
              <TabPane tab="选项四" key="44">选项卡四</TabPane>
              <TabPane tab="选项五" key="55">选项卡五</TabPane>
              <TabPane tab="选项六" key="66">选项卡六</TabPane>
              <TabPane tab="选项七" key="77">选项卡七</TabPane>
              <TabPane tab="选项八" key="86">选项卡八</TabPane>
              <TabPane tab="选项九" key="95">选项卡九</TabPane>

            </Tabs>

            <Icon type="error" />
            <i className="icon iconfont test">&#xe641;</i>
          </div>
          <div className="demo5">
            <Tabs onChange={callback} type="icon">
              {/* card提供另外样式 */}
              <TabPane
                tab={<div > <div className="tab_icon"><i className="iconfont icon-tianmaopaidui" /></div>选项卡二 </div>}
                key="1"
              >type icon
              </TabPane>
              <TabPane
                tab={<div > <div className="tab_icon"><i className="iconfont icon-tianmaopaidui" /></div>选项卡二 </div>}
                key="2"
              >选项卡二选项卡二内容选项卡二内容内容
              </TabPane>
              <TabPane
                tab={<div > <div className="tab_icon"><i className="iconfont icon-tianmaopaidui" /></div>选项卡二 </div>}
                key="3"
              >选项卡三内容
              </TabPane>
            </Tabs>
          </div>
          <div className="demo6">
            <Tabs onChange={callback} type="card">
              {/* card提供另外样式 */}
              <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
              <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
              <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
            </Tabs>
          </div>
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


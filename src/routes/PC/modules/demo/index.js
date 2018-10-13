/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Code } from '@mistong/eui';

/* placeholder begin eui style */
import '@mistong/eui/dist/index.css';
/* placeholder end eui style */

/* placeholder begin src */
import EuiDemo from '@mistong/eui-demo';
/* placeholder end src */

import './index.scss';

export default class DemoComponent extends React.Component {
  render() {
    const codeSmall = `import { Demo } from '@mistong/eui';
import '@mistong/eui/dist/index.css';

<Demo>这里显示的数据会有固定的样式，可以快速使用 h2、h3、p、ul、ol、table 等 html 标签构建自定义 demo</Demo>
`;
    return (
      <EuiDemo>
        <div className="">
          <h2>Demo 组件</h2>
          <p>可用于 EUI 组件 demo 开发，统一风格。</p>
          <h3>代码演示</h3>
          <Code sourceCode={codeSmall}>
            我是 demo 组件使用的源码演示。<br /><br />
            在 demo 组件内可以快速使用 h2、h3、p、ul、ol、table 等 常用 html 标签，无需书写额外样式
          </Code>
          <h3>UL 示例</h3>
          <ul>
            <li>问问自己：”最坏的可能是什么？“</li>
            <li>万一发生了最坏情况，做好接受它的准备。</li>
            <li>冷静地着手改善最坏情况。</li>
          </ul>
          <h3>OL 示例</h3>
          <ol>
            <li>1. 问问自己：”最坏的可能是什么？“</li>
            <li>2. 万一发生了最坏情况，做好接受它的准备。</li>
            <li>3. 冷静地着手改善最坏情况。</li>
          </ol>
          <h3>P 段落示例</h3>
          <p>我是一段文字，可以写很多内容。</p>
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
                <td>className</td>
                <td>添加自定义class</td>
                <td>string</td>
                <td>&#39;&#39;</td>
              </tr>
              <tr>
                <td>style</td>
                <td>自定义样式</td>
                <td>object</td>
                <td><code>{'{}'}</code></td>
              </tr>
              <tr>
                <td>prefixCls</td>
                <td>样式名前缀</td>
                <td>string</td>
                <td>eui-demo</td>
              </tr>
              <tr>
                <td>children</td>
                <td>要展示的 demo 内容</td>
                <td>any</td>
                <td>''</td>
              </tr>
            </tbody>
          </table>
        </div>
      </EuiDemo>
    );
  }
}
/* placeholder end class */


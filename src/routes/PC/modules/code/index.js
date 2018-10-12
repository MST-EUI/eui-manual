/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Demo } from '@mistong/eui';

/* placeholder begin eui style */
import '@mistong/eui/dist/index.css';
/* placeholder end eui style */

/* placeholder begin src */
import EuiCode from '@mistong/eui-code';
/* placeholder end src */

import './index.scss';

export default class DemoComponent extends React.Component {
  render() {
    const defaultCode = `import { Code } from '@mistong/eui';

<Code sourceCode={sourceCode} buttonText="默认形式（mode=default）">
  我是效果展示区域，可以放入任何内容
</Code>
`;
    const inlineCode = `import { Code } from '@mistong/eui';

<Code mode="inline">hello world</Code>
`;

    const codeOnlySourceCode = `import { Code } from '@mistong/eui';

<EuiCode mode="codeOnly" >hello world</EuiCode>
`;
    return (
      <Demo>
        <h2>Code 组件</h2>
        <p>该组件可用来展示源代码</p>
        <h3>代码演示</h3>
        <EuiCode sourceCode={defaultCode} buttonText="默认形式（mode=default）">
        我是效果展示区域，可以放入任何内容
        </EuiCode>
        <EuiCode sourceCode={inlineCode} buttonText="内联形式（mode=default）">
          <p>
          该模式下
            <EuiCode mode="inline" >sourceCode</EuiCode>
          和<EuiCode mode="inline" >children</EuiCode>
          都可以放置源代码，比如<br />
            <br />
            <EuiCode mode="inline">{'<EuiCode mode="inline" >react-router</EuiCode>'}</EuiCode>
          同<br /><br /><EuiCode mode="inline">{'<EuiCode sourceCode="react-router" mode="inline" />'}</EuiCode>
          效果是一样的
          </p>
        </EuiCode>
        <EuiCode sourceCode={codeOnlySourceCode} buttonText="源码模式（mode=codeOnly）">
          <EuiCode mode="codeOnly" >hello world</EuiCode>
        </EuiCode>
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
              <td>mode</td>
              <td>模式[<EuiCode mode="inline" >default</EuiCode>、<EuiCode mode="inline" >inline</EuiCode>、<EuiCode mode="inline" >codeOnly</EuiCode>]</td>
              <td>string</td>
              <td><EuiCode mode="inline" >default</EuiCode></td>
            </tr>
            <tr>
              <td>buttonText</td>
              <td>默认模式下（<EuiCode mode="inline" >default</EuiCode>）显示/隐藏 源码按钮内容</td>
              <td>any</td>
              <td>查看源码</td>
            </tr>
            <tr>
              <td>children</td>
              <td>要展示的 demo 内容（<EuiCode mode="inline" >mode=inline/codeOnly</EuiCode>时则同 <EuiCode mode="inline" >sourceCode</EuiCode>效果一致）</td>
              <td>any</td>
              <td><EuiCode mode="inline" >null</EuiCode></td>
            </tr>
            <tr>
              <td>className</td>
              <td>添加自定义class</td>
              <td>string</td>
              <td><EuiCode mode="inline" >&#39;&#39;</EuiCode></td>
            </tr>
            <tr>
              <td>style</td>
              <td>自定义样式</td>
              <td>object</td>
              <td><code><EuiCode mode="inline" >{'{}'}</EuiCode></code></td>
            </tr>
            <tr>
              <td>prefixCls</td>
              <td>样式名前缀</td>
              <td>string</td>
              <td><EuiCode mode="inline" >eui-demo</EuiCode></td>
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  }
}
/* placeholder end class */


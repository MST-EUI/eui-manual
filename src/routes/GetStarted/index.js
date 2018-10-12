/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React from 'react';
import { Code } from '@mistong/eui';
import '@mistong/eui/dist/index.css';

/* placeholder begin src */
import Icon from '@mistong/eui-icon';
/* placeholder end src */

import './style.scss';

export default class GetStarted extends React.Component {
  render() {
    const sourceCode = `
import { Icon } from '@mistong/eui';

ReactDOM.render(<Icon type="info" style={{ color: '#f60' }} />, mountNode);
`;
    const babelConfig = `
{
  plugins: [
    ['import', {
      libraryName: '@mistong/eui',
    },
    ],
  ]
}
`;
    return (
      <div className="right-content-container">
        <div className="demo eui-demo">
          <h2>EUI</h2>
          <p>EUI 是铭师堂升学e网通事业部 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。</p>
          <h3>支持环境</h3>
          <ul>
            <li>React &gt;= 0.14.9</li>
            <li>现代浏览器及 IE8+</li>
          </ul>
          <h3>安装</h3>
          <pre>
            <code className="code">npm install @mistong/eui</code>
          </pre>
          <h3>使用组件</h3>
          <pre>
            <code className="code">
              {sourceCode}
            </code>
          </pre>
          <h3>按需加载</h3>
          <p>借助插件 babel-plugin-import 实现按需加载，.babeljc 配置如下即可</p>
          <pre>
            <code className="code">
              {babelConfig}
            </code>
          </pre>
        </div>
      </div>
    );
  }
}
/* placeholder end class */


/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Code } from '@mistong/eui';
import '@mistong/eui/dist/index.css';

/* placeholder begin src */
import Icon from '@mistong/eui-icon';
/* placeholder end src */

import './index.scss';

export default class Demo extends React.Component {
  render() {
    const sourceCode = `
import { Icon } from '@mistong/eui';

<Icon type="info" style={{ color: '#f60' }} />
`;
    const iconAllCode = `
import { Icon } from '@mistong/eui';
...
render() {
  const iconArr = [
    'info',
    'warning',
    'success',
    'arrow-right',
    'close',
    'error',
    'triangle-down',
    'triangle-up',
  ];
  return (
    <ul className="icon-all">
      {
      iconArr.map(item => (
        <li className="demo-li" key={item}>
          <Icon type={item} />
          <span className="icon-name">{item}</span>
        </li>
      ))
    }
    </ul>
  );
};
`;
    const iconArr = [
      'info',
      'warning',
      'success',
      'arrow-right',
      'close',
      'error',
      'triangle-down',
      'triangle-up',
    ];
    return (
      <div className="demo eui-demo">
        <h2>Icon 图标组件</h2>
        <p>语义化的图标库。</p>
        <h3>代码演示</h3>
        <Code sourceCode={sourceCode} buttonText="单个图标">
          <Icon type="info" style={{ color: '#f60', fontSize: '30px' }} />
        </Code>
        <Code sourceCode={iconAllCode} buttonText="全部图标">
          <ul className="icon-all">
            {
            iconArr.map(item => (
              <li className="demo-li" key={item}>
                <Icon type={item} />
                <span className="icon-name">{item}</span>
              </li>
            ))
          }
          </ul>
        </Code>
        <h3>API</h3>
        <table className="demo-table">
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
              <td><code>&#39;&#39;</code></td>
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
              <td>eui-icon</td>
            </tr>
            <tr>
              <td>type</td>
              <td>图标类型 (&nbsp;<code>info</code>&nbsp;
                <code>warning</code>&nbsp;
                <code>success</code>&nbsp;
                <code>arrow-right</code>&nbsp;
                <code>close</code>&nbsp;
                <code>error</code>&nbsp;
                <code>triangle-down</code>&nbsp;
                <code>triangle-up</code>&nbsp;)
              </td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
/* placeholder end class */




/*
* annotation like `placeholder begin *** and
* placeholder end ***` is required for generate eui manual, please keep it
*/
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Code,
  Demo,
} from '@mistong/eui';

/* placeholder begin eui style */
import '@mistong/eui/dist/index.css';
/* placeholder end eui style */

/* placeholder begin src */
import Icon from '@mistong/eui-icon';
/* placeholder end src */

import './index.scss';

export default class DemoComponent extends React.Component {
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
      <Demo className="eui-icon-demo">
        <h2>Icon 图标组件</h2>
        <p>语义化的图标库。</p>
        <h3>代码演示</h3>
        <Code sourceCode={sourceCode} buttonText="单个图标">
          <Icon type="info" style={{ color: '#f60', fontSize: '30px' }} />
        </Code>
        <Code sourceCode={iconAllCode} buttonText="全部图标">
          <div className="icon-all">
            {
              iconArr.map(item => (
                <div className="demo-li" key={item}>
                  <Icon type={item} />
                  <span className="icon-name">{item}</span>
                </div>
              ))
            }
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
              <td>图标类型 (<Code mode="inline">info</Code><Code mode="inline">success</Code>等)
              </td>
              <td>string</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </Demo>
    );
  }
}
/* placeholder end class */


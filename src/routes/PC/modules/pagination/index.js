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
import Pagination from '@mistong/eui-pagination';
/* placeholder end src */

import './index.scss';

export default class DemoComponent extends React.Component {
  render() {
    const sourceCode = `import { Pagination } from '@mistong/eui';

<Pagination
  total={100}
  pageSize={10}
/>

<Pagination
  total={100}
  pageSize={10}
  style={{ margin: '30px 0' }}
  defaultCurrent={2}
  showQuickJumper={{ goButton: <button>Go</button> }}
/>

<Pagination
  total={100}
  style={{ margin: '30px 0' }}
  defaultCurrent={2}
  simple
/>

<Pagination
  showQuickJumper
  total={100}
  style={{ margin: '30px 0' }}
  defaultCurrent={2}
  size="small"
/>
`;
    return (
      <div className="eui-pagination-demo">
        <div className="eui-pagination-demo-content">
          <h2>Pagination 分页</h2>
          <p>分页组件</p>
          <h3>代码演示</h3>
          <Code sourceCode={sourceCode}>
            <Pagination
              total={100}
              pageSize={10}
            />

            <Pagination
              total={100}
              pageSize={10}
              style={{ margin: '30px 0' }}
              defaultCurrent={2}
              showQuickJumper={{ goButton: <button>Go</button> }}
            />

            <Pagination
              total={100}
              style={{ margin: '30px 0' }}
              defaultCurrent={2}
              simple
            />

            <Pagination
              showQuickJumper
              total={100}
              style={{ margin: '30px 0' }}
              defaultCurrent={2}
              size="small"
            />
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
        </div>
      </div>
    );
  }
}
/* placeholder end class */


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
import Button from '@mistong/eui-button';
/* placeholder end src */

import './index.scss';

export default class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      loading: false,
    };
  }

  handleClick = () => {
    this.setState({
      disabled: true,
    });

    setTimeout(() => {
      this.setState({
        disabled: false,
      });
    }, 1000);
  }

  handleDisabledClick = () => {
    // console.log('disabled');
  }

  handleLoaderClick = () => {
    this.setState({
      loading: true,
    });
  }

  render() {
    const sizeCode = `import { Button } from '@mistong/eui';

<Button className="small">small Button</Button>
<Button>medium Button</Button>
<Button className="large">large Button</Button>
<Button className="big">Big Button</Button>
`;
    const typeCode = `import { Button } from '@mistong/eui';

<Button type="primary">primary Button</Button>
<Button type="secondary">secondary Button</Button>
<Button type="normal">normal Button</Button>`;
    const disabledCode = `import { Button } from '@mistong/eui';

<Button disabled className="unabled" data-arr="none">disabled 不可用按钮</Button>`;
    const htmlTypeCode = `import { Button } from '@mistong/eui';

<Button target="_blank">默认button按钮</Button>
<Button htmlType="submit">submit按钮</Button>
<Button htmlType="reset">reset按钮</Button>
<Button href="#" target="_blank">href按钮</Button>
<Button href="#" target="_blank" htmlType="text">href链接按钮</Button>
<Button htmlType="text">text按钮</Button>`;
    const clickCode = `import { Button } from '@mistong/eui';

<Button onClick={this.handleClick} disabled={this.state.disabled}>click me</Button>
<Button onClick={this.handleDisabledClick} disabled>Disabled click me</Button>
<Button onClick={this.handleLoaderClick} loading={this.state.loading} color="blue">Loading click me</Button>
<Button basic loading>默认按钮</Button>`;
    const iconCode = `import { Button } from '@mistong/eui';

<Button icon="alarm">默认按钮</Button>
<Button icon="alarm" iconPosition="right">默认按钮</Button>
<Button href="#" icon="alarm" type="text">默认按钮</Button>`;
    const activedCode = `import { Button } from '@mistong/eui';

<Button actived>默认按钮</Button>`;
    return (
      <Demo className="eui-button-demo">
        <h2>Button 按钮组件</h2>
        <p>按钮, 提供基础样式及基础状态。</p>
        <h3 className="title">代码演示</h3>
        <Code sourceCode={sizeCode} buttonText="size">
          <Button className="small">small Button</Button>
          <Button>medium Button</Button>
          <Button className="large">large Button</Button>
          <Button className="big">Big Button</Button>
        </Code>

        <Code sourceCode={typeCode} buttonText="type">
          <Button type="primary">primary Button</Button>
          <Button type="secondary">secondary Button</Button>
          <Button type="normal">normal Button</Button>
        </Code>

        <Code sourceCode={disabledCode} buttonText="disabled">
          <Button disabled className="unabled" data-arr="none">disabled 不可用按钮</Button>
        </Code>

        <Code sourceCode={htmlTypeCode} buttonText="htmlType & Href">
          <Button target="_blank">默认button按钮</Button>
          <Button htmlType="submit">submit按钮</Button>
          <Button htmlType="reset">reset按钮</Button>
          <Button href="#" target="_blank">href按钮</Button>
          <Button href="#" target="_blank" htmlType="text">href链接按钮</Button>
          <Button htmlType="text">text按钮</Button>
        </Code>

        <Code sourceCode={clickCode} buttonText="Click & Loading">
          <Button onClick={this.handleClick} disabled={this.state.disabled}>click me</Button>
          <Button onClick={this.handleDisabledClick} disabled>Disabled click me</Button>
          <Button onClick={this.handleLoaderClick} loading={this.state.loading} color="blue">Loading click me</Button>
          <Button basic loading>默认按钮</Button>
        </Code>

        <Code sourceCode={iconCode} buttonText="Icon & IconPosition">
          <Button icon="alarm">默认按钮</Button>
          <Button icon="alarm" iconPosition="right">默认按钮</Button>
          <Button href="#" icon="alarm" type="text">默认按钮</Button>
        </Code>

        <Code sourceCode={activedCode} buttonText="Actived">
          <Button actived>默认按钮</Button>
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


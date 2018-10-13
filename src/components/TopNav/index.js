import React from 'react';
import i18n from '~/common/i18n';
import api from '~/service';
import githubImg from '~/common/images/github.png';
import {
  Link,
} from 'react-router';

import './style.scss';
import utils from '../../common/utils';

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
    };
  }

  async componentDidMount() {
    const self = this;
  }

  renderNavList = () => {
    const data = [
      { text: 'PC', url: '/#', target: '_self' },
      { text: 'Android', url: 'https://mst-eui.github.io/eui-android/', target: '_self' },
      { text: 'IOS', url: 'https://mst-eui.github.io/eui-ios/', target: '_self' },
    ];
    return data.map(item => <li key={item.url} className="nav-li"><a href={item.url} rel="noopener noreferrer" target={item.target || ''} >{item.text}</a></li>);
  }

  render() {
    const self = this;
    return (
      <div className="top-nav">
        <div className="logo" />
        <div className="nav-list">
          <ul className="nav-ul">
            {self.renderNavList()}
          </ul>
          <div className="user-info">
            <a href="https://github.com/MST-EUI" className="avatar-img"><img alt="avatar" src={githubImg} /></a>
          </div>
        </div>
      </div>
    );
  }
}

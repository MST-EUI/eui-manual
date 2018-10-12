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

  render() {
    return (
      <div className="top-nav">
        <div className="logo" />
        <div className="nav-list">
          <div className="user-info">
            <a href="https://github.com/MST-EUI" className="avatar-img"><img alt="avatar" src={githubImg} /></a>
          </div>
        </div>
      </div>
    );
  }
}

import React from 'react';
import i18n from '~/common/i18n';
import {
  Menu,
} from 'antd';
import api from '~/service';
import {
  Link,
} from 'react-router';

import './style.scss';
import utils from '../../common/utils';

const SubMenu = Menu.SubMenu;

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
    };
  }

  async componentDidMount() {
    const self = this;
    try {
      const menus = await api.getNavigatorAndMenus();
      self.setState({
        menus: ((menus && menus.navileftitems) || []),
      });
    } catch (e) {
      // console.log(e);
    }
  }

  renderNavList = () => {
    const data = [
      { text: i18n('horizentalNavHome'), url: '//www.ewt360.com/', target: '_blank' },
      { text: i18n('horizentalNavEClass'), url: '//study.ewt360.com/KeCheng/Index', target: '_blank' },
      { text: i18n('horizentalNavSoulGrow'), url: '//xinli.ewt360.com/', target: '_blank' },
      { text: i18n('horizentalNavLifePlan'), url: '//www.ewt360.com/Apply', target: '_blank' },
      { text: i18n('horizentalNavHightSchoolConsult'), url: '//news.ewt360.com/', target: '_blank' },
      { text: i18n('horizentalNavECommunity'), url: '//www.ewt360.com/skip/bbs?fromurl=http://bbs.ewt360.com/', target: '_blank' },
      { text: i18n('horizentalNavMobileDownload'), url: '//www.ewt360.com/template/download/', target: '_blank' },
    ];
    return data.map(item => <li key={item.url} className="nav-li"><a href={item.url} rel="noopener noreferrer" target={item.target || ''} >{item.text}</a></li>);
  }

  renderUserMenuList = () => {
    const data = [
      { text: i18n('userMyAccount'), url: '//www.ewt360.com/member/UserInfo', target: '_blank' },
      { text: i18n('userMyMessage'), url: '//www.ewt360.com/member/notice', target: '_blank' },
      { text: i18n('userMyOrder'), url: '//www.ewt360.com/Member/MyOrder', target: '_blank' },
      { text: i18n('loginOut'), url: '//www.ewt360.com/member/logout' },
    ];
    return data.map(item => <li key={item.url} className="user-sub-li"><a href={item.url} rel="noopener noreferrer" target={item.target || ''} >{item.text}</a></li>);
  }

  renderMenus = () => {
    const self = this;
    const {
      menus,
    } = self.state;
    const renderItemEle = (item) => {
      const {
        id,
        title,
        routetype: type,
        url,
        target,
        children,
      } = item;
      let itemHtmlEle = null;
      switch (Number(type)) {
        case 2:
          // react-router
          itemHtmlEle = <Link to={url}>{title}</Link>;
          break;
        case 1:
          // normal url
          itemHtmlEle = <a target={target || '_blank'} href={url}>{title}</a>;
          break;
        default:
          itemHtmlEle = <span>{title}</span>;
      }
      if (children && children.length) {
        return (
          <SubMenu key={id} title={<span className="submenu-span">{itemHtmlEle}<i className="icon iconfont icon-triangle-down" /></span>}>
            {children.map(renderItemEle)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={id}>
          {itemHtmlEle}
        </Menu.Item>
      );
    };
    const menuEles = menus.map(renderItemEle);
    return (
      <Menu mode="horizontal">
        {menuEles}
      </Menu>
    );
  }

  render() {
    const self = this;
    const {
      role,
      user,
    } = self.props;
    const {
      userid: userId,
    } = user;
    return (
      <div className="top-nav">
        <div className="logo">
          <span className="dot">·</span>
          <span className="role-title">{role === 'student' ? i18n('studentEnd') : i18n('teacherEnd')}</span>
        </div>
        <div className="dynamic-nav-menus">
          {self.renderMenus()}
        </div>
        <div className="nav-list">
          <ul className="nav-ul">
            {self.renderNavList()}
          </ul>
          <div className="user-info">
            {/* <a href="http://www.ewt360.com/member" rel="noopener noreferrer" target="_blank"><i className="icon iconfont icon-user avatar-icon" /></a> */}
            <span className="avatar-img"><img alt="avatar" src={utils.avatar(userId)} /></span>
            <ul className="user-menu">
              {self.renderUserMenuList()}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

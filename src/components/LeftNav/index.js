import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router';
import util from '~/common/utils/';

import './style.scss';

const { PropTypes, Component } = React;
export default class LeftNav extends Component {
    static propTypes = {
      menus: PropTypes.arrayOf(PropTypes.any),
      role: PropTypes.string,
    };

    static defaultProps = {
      menus: [],
      role: 'student',
    };

    constructor(props) {
      super(props);
      this.state = props;
    }

    componentDidMount() {
      const self = this;
      window.onhashchange = () => {
        const { menus, role } = this.state;
        const realMenusArr = util.generateMenus(menus, role, util.getCurrentRoute());
        self.setState({
          menus: realMenusArr,
        }, () => {
          window.scrollTo(0, 0); // route change then go to top of page
        });
      };
    }

    onSubmenuToggle = (v) => {
      // TODO toggle need to be upgrade
      const { menus } = this.state;
      this.setState({
        menus: menus.map((item) => {
          const tmpItem = item;
          if (v.id === tmpItem.id) {
            tmpItem.unfold = !tmpItem.unfold;
          }
          return tmpItem;
        }),
      });
    }

    render() {
      const self = this;
      const { menus } = this.state;
      const menuLiElements = menus.map((item) => {
        let innerEle;
        const hasSubmenus = item.children ? !!item.children.length : !!item.children;
        if (!hasSubmenus) {
          if (item.urlType === 'normal') {
            // common url
            innerEle = <a href={item.url}>{item.title}</a>;
          } else if (item.urlType === 'react') {
            // react router link
            innerEle = (<Link
              to={item.url}
            >{item.title}</Link>);
          }
        } else if (hasSubmenus) {
          innerEle = (
            <div>
              <div
                onClick={() => { self.onSubmenuToggle(item); }}
                tabIndex="0"
                role="button"
                className="click-button"
              >
                <span>
                  {item.title}
                  <i className={classnames(
                    'icon iconfont',
                    { 'icon-triangle-down': !item.unfold },
                    { 'icon-triangle-up': item.unfold },
                  )}
                  />
                </span>
              </div>
              <ul className={classnames({ 'fn-hide': !item.unfold })}>
                {
                  item.children.map((subItem) => {
                    let aElement;
                    if (subItem.urlType === 'normal') {
                      // common url
                      aElement = <a href={subItem.url}>{subItem.title}</a>;
                    } else if (subItem.urlType === 'react') {
                      // react router link
                      aElement = (<Link
                        to={subItem.url}
                      >{subItem.title}</Link>);
                    }
                    return (
                      <li
                        key={util.generateKeyForReact(subItem.id)}
                        className={classnames({ current: subItem.isCurrent })}
                      >
                        {aElement}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        }
        return (
          <li key={util.generateKeyForReact(item.id)} className={classnames({ current: item.isCurrent }, { 'with-submenus': hasSubmenus })}>
            {innerEle}
          </li>
        );
      });
      return (
        <div className="left-nav">
          <ul className={classnames('part-menu-items')}>
            {menuLiElements}
          </ul>
        </div>
      );
    }
}

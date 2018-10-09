import React from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
// 不需要动态加载的必须组件
import BasicLayout from '~/layouts/BasicLayout';
// Style import;
import '~/common/style/common.scss';

// 备用404入口
// import Redirect from './PageNotFound/redirect'


// 遍历该模块下所有路由并且组装
const context = require.context('./', true, /_router.js$/);
const routers = context.keys().map(key => context(key).default);
const { PropTypes } = React;

export const createRoutes = (store) => {
  // 404处理
  //  childRoutes.push(Redirect)
  // 传入rootstore
  const routersAndStores = routers.map(item => item(store));

  // 区分路由
  // BasicLayout 的路由
  const basicLayoutChildRoutes = routersAndStores.filter(item => item.type !== 'layout');

  // 不与BasicLayout一起的,独立门户的子路由
  const globalChildRoutes = routersAndStores.filter(item => item.type === 'layout');

  const basicLayoutRoutes = {
    path: '/',
    component: BasicLayout,
    childRoutes: basicLayoutChildRoutes,
  };

  const routesConfig = [...globalChildRoutes, basicLayoutRoutes];

  return routesConfig;
};

export default class Component extends React.Component {
  static propTypes = {
    store: PropTypes.object,
  };

  static defaultProps = {
    store: {},
  };

  render() {
    const routes = createRoutes(this.props.store);
    return (
      <Provider store={this.props.store} >
        <Router history={hashHistory} routes={routes} />
      </Provider>
    );
  }
}

import React from 'react';
import i18n from '~/common/i18n';
import Action from '~/actions';
import util from '~/common/utils/';

import { connect } from 'react-redux';

import LeftNav from '~/components/LeftNav/';
import Loading from '~/components/Loading';
import componentsList from '~/tools/components.list';

const componentsRoutes = [
  {
    id: 0,
    title: '快速开始',
    url: '/getstarted',
    urlType: 'react',
    pid: 0,
  },
  {
    id: 1,
    title: 'Components',
    url: '',
    urlType: 'react',
    pid: 0,
    children: componentsList.map((item, index) => ({
      id: 2 * (index + 1),
      title: i18n(item.replace('eui-', '')),
      url: `/pc/${item.replace('eui-', '')}`,
      urlType: 'react',
      pid: 0,
    })),
  },
];


const { PropTypes, Component } = React;

// TODO current route match need to be upgrade
class LeftNavContainer extends Component {
  static propTypes = {
    permission: PropTypes.objectOf(PropTypes.any),
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    permission: {},
    dispatch: () => {},
  };

  render() {
    const role = 'student';
    const realMenusArr = util.generateMenus(
      componentsRoutes,
      'student',
      util.getCurrentRoute(),
    );
    return (
      <LeftNav menus={realMenusArr} role={role} />
    );
  }
}

const mapStateToProps = state => ({
  permission: state.permission,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LeftNavContainer);

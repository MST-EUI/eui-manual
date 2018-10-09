import React from 'react';
import i18n from '~/common/i18n';
import Action from '~/actions';
import util from '~/common/utils/';

import { connect } from 'react-redux';

import LeftNav from '~/components/LeftNav/';
import Loading from '~/components/Loading';

const studentMenus = [
  { id: 1, title: i18n('colStudentMyWork'), url: '/student/myhomework', urlType: 'normal', pid: 0 },
  {
    title: i18n('colStudentMyClass'),
    id: 2,
    pid: 0,
    url: '/classes/myClasses',
    urlType: 'react',
  },

  { id: 5, title: i18n('colStudentPseudoSelectPro'), url: '/student/subjectsystem/subjectsystemlists', urlType: 'normal', pid: 0 },
  { id: 6, title: i18n('colStudentSoulCheckWork'), url: '/student/home/psychologywork', urlType: 'normal', pid: 0 },
  { id: 7, title: i18n('colStudentHomeWork'), url: '/student/home/holidaywork', urlType: 'normal', pid: 0 },
  // { id: 8, title: '路由测试', url: '/subject-video-homework-detail/1', urlType: 'react', pid: 0 },
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

  componentDidMount() {
    const self = this;
    const { dispatch } = self.props;
    dispatch(Action.getPermission());
  }

  render() {
    const { loading, leftMenus, role } = this.props.permission;
    if (loading) {
      return <Loading />;
    }
    const isStudent = role && role.length === 1 && role[0] === 'student';
    const currentRoleForLeftMenus = isStudent ? 'student' : 'teacher';
    const realMenusArr = util.generateMenus(
      isStudent ? studentMenus : leftMenus,
      currentRoleForLeftMenus,
      util.getCurrentRoute(),
    );
    return (
      <LeftNav menus={realMenusArr} role={currentRoleForLeftMenus} />
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

import React from 'react';
import { connect } from 'react-redux';

import TopNav from '~/components/TopNav/';
import i18n from '~/common/i18n';
import Action from '~/actions/actionCreator';

const { PropTypes, Component } = React;

class TopNavContainer extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
    dispatch: PropTypes.func,
    userInfo: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    data: {},
    dispatch: () => {},
    userInfo: {},
  };

  constructor(props) {
    super(props);
    this.documentTitleUpdate = false;
    this.state = {
      hasCourseScheduling: false,
    };
  }

  componentDidUpdate() {
    const { data: { role }, dispatch } = this.props;
    if (role && role.length && !this.documentTitleUpdate) {
      const isStudent = role && role.length === 1 && role[0] === 'student';
      const currentRoleForLeftMenus = isStudent ? 'student' : 'teacher';
      let documentTitlePrefix = '';
      if (currentRoleForLeftMenus === 'teacher') {
        documentTitlePrefix = i18n('teacherEnd');
        dispatch(Action.getTeacherInfo());
      } else if (currentRoleForLeftMenus === 'student') {
        documentTitlePrefix = i18n('studentEnd');
        dispatch(Action.queryStudentInfo());
      }
      this.documentTitleUpdate = true;
      document.title = `${documentTitlePrefix} - ${document.title}`;
    }
  }

  render() {
    const {
      userInfo,
      data,
    } = this.props;
    const { role, loading } = data;
    const {
      studentInfo,
      teacherInfo,
    } = userInfo;
    if (loading) {
      return null;
    }
    const roleToString = role && role.length === 1 && role[0] === 'student' ? 'student' : 'teacher';
    const user = roleToString === 'teacher' ? teacherInfo : studentInfo;
    return (
      <TopNav role={roleToString} user={user} />
    );
  }
}

const mapStateToProps = state => ({
  data: state.permission,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavContainer);

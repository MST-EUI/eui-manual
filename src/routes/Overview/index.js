import React from 'react';
import { connect } from 'react-redux';
// import Action from '~/actions';
import { Link } from 'react-router';
import {
  Alert,
} from 'antd';
import i18n from '~/common/i18n';

import TopPannel from './topPannel';
import NewestHomework from './newestHomework';
import StudentState from './studentState';

import './style.scss';

const { Component, PropTypes } = React;

class Overview extends Component {
  static propTypes = {
    userInfo: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    userInfo: {},
  };

  render() {
    const {
      userInfo,
    } = this.props;
    const {
      code: teacherClassesList,
    } = userInfo;
    const alertVisible =
    (teacherClassesList && Array.isArray(teacherClassesList) && teacherClassesList.length === 0);
    const alertMessage = <p className="warning-message">{i18n('ovvwPageNoClassesForTeacherTips')}<Link to="/classes/teacher">{i18n('joinRightNow')}</Link></p>;
    return (
      <div className="overview-container">
        <div className="page-warning" style={{display: (!alertVisible ? 'none' : 'block')}}>
          <Alert type="warning" message={alertMessage} />
        </div>
        <TopPannel />
        <div className="part-middle">
          <NewestHomework />
          <StudentState />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.overview,
  userInfo: state.userInfo.teacherInfo,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Overview);

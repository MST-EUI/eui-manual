import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Action from '~/actions';
import classnames from 'classnames';
import {
  Popover,
  Modal,
  Input,
  message,
} from 'antd';
import i18n from '~/common/i18n';
import api from '~/service/';
import utils from '~/common/utils';

import psychologicalImg from './images/psychology.png';
import homeworkImg from './images/homework-solution.png';
import waitImg from './images/wait.png';

const { PropTypes, Component } = React;
const inputCheck = v => !v || String(v).length > 20;
const MESSAGE_DURATION_TIME = 2.5;

class TopPannel extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.objectOf(PropTypes.any),
    userInfo: PropTypes.objectOf(PropTypes.any),
    userInfoLoading: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {},
    data: {},
    userInfo: {},
    userInfoLoading: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      popoverVisible: Number(localStorage.getItem('teacherNameUpdate')) !== 1,
      modalVisible: false,
      inputValue: null,
      errorTipsVisible: false,
    };
  }

  componentDidMount() {
    const {
      dispatch,
    } = this.props;
    dispatch(Action.overviewQueryPsychologicalReportCount());
    dispatch(Action.overviewQueryStudentApplyCount());
    // dispatch(Action.getTeacherInfo());
  }

  componentWillReceiveProps(nextProps) {
    const {
      userInfo,
    } = nextProps;
    const {
      name,
    } = userInfo;
    const {
      inputValue,
    } = this.state;
    if (!inputValue && name) {
      this.setState({
        inputValue: name,
      });
    }
  }

  onInputChange = (e) => {
    const v = e.target.value;
    this.setState({
      inputValue: e.target.value,
      errorTipsVisible: inputCheck(v),
    });
  }

  togglePopover = () => {
    localStorage.setItem('teacherNameUpdate', 1);
    this.setState({
      popoverVisible: !this.state.popoverVisible,
    });
  }

  toggleModal = () => {
    localStorage.setItem('teacherNameUpdate', 1);
    const {
      modalVisible,
    } = this.state;
    this.setState({
      modalVisible: !modalVisible,
    });
  }

  updateTeacherName = async () => {
    const self = this;
    const {
      dispatch,
      userInfo,
    } = self.props;
    const {
      userid: teacherId,
    } = userInfo;
    const {
      inputValue,
    } = self.state;
    if (inputCheck(inputValue)) {
      self.setState({
        errorTipsVisible: true,
      });
      return;
    }
    try {
      const res = await api.modifyTeacherName({
        teacherid: teacherId,
        teachername: inputValue,
      });
      if (res) {
        self.toggleModal();
        message.success(i18n('success'), MESSAGE_DURATION_TIME);
        dispatch(Action.getTeacherInfo());
      } else {
        message.error(i18n('error'), MESSAGE_DURATION_TIME);
      }
    } catch (e) {
      message.error(i18n('error'), MESSAGE_DURATION_TIME);
    }
  }

  render() {
    const self = this;
    const {
      popoverVisible,
      modalVisible,
      inputValue,
      errorTipsVisible,
    } = self.state;
    const {
      data,
      userInfo,
      userInfoLoading,
    } = self.props;
    const {
      name: teacherName,
      userid: teacherId,
      code: teacherRoles,
    } = userInfo;
    const {
      psychologicalReportCount,
      applyCount,
    } = data;
    const popoverContent = (
      <div className="teacher-name-update">
        <p className="change-name-description">
          <span className="main-color-text">{i18n('ovvwNameUpdateTips1')}</span>
          <span>{i18n('ovvwNameUpdateTips2')}</span>
        </p>
        <div className="buttons-grop">
          <span onClick={self.togglePopover} tabIndex="0" role="button" className="text-btn text-btn-gray">{i18n('ovvwNotNeedUpdate')}</span>
          <span onClick={() => { self.setState({ popoverVisible: false, modalVisible: true }); }} tabIndex="0" role="button" className="text-btn text-btn-primary">{i18n('ovvwNeedUpdate')}</span>
        </div>
      </div>
    );
    const popoverProps = {
      content: popoverContent,
      trigger: 'click',
      overlayClassName: 'change-name-popover',
      visible: popoverVisible,
      placement: 'bottom',
      overlayStyle: {
        width: '320px',
      },
    };
    const modalProps = {
      title: i18n('ovvwUpdateName'),
      visible: modalVisible,
      onCancel: self.toggleModal,
      width: 440,
      onOk: self.updateTeacherName,
      maskClosable: false,
      wrapClassName: 'update-teacher-name-modal',
    };
    let psychologicalBanner = null;
    let vacationBanner = null;
    let psychologicalNumberLink = null;
    let applyCountEle = null;
    if (!userInfoLoading) {
      const isOnlySubjectTeacher = teacherRoles.length === 0 || (teacherRoles.length === 1 && teacherRoles[0] === 'teacher')
      || (teacherRoles.length === 2 && utils.indexOf(teacherRoles, 'teacher') !== -1 && utils.indexOf(teacherRoles, 'classheadteacher') !== -1);
      const waitBanner = <div className="banner-wait-for-suprise" ><img className="wait" alt="ad" src={waitImg} /></div>;
      const noVacationEntry = utils.indexOf(teacherRoles, 'principal') === -1
      && utils.indexOf(teacherRoles, 'headteacher') === -1;
      const noStudentApplyCount = utils.indexOf(teacherRoles, 'headteacher') === -1;
      psychologicalBanner = <a className="ad-banner-a" alt="" href="/ewtbend/psychologicalTest/list/list.html"><img className="banner-img" alt="" src={psychologicalImg} /></a>;
      vacationBanner = <Link to="/holidaySpecialTopic"><img className="banner-img" alt="" src={homeworkImg} /></Link>;
      psychologicalNumberLink = <a href="/ewtbend/psychologicalTest/list/list.html#type=record">{psychologicalReportCount}</a>;
      if (isOnlySubjectTeacher) {
        psychologicalBanner = waitBanner;
        psychologicalNumberLink = <span className="no-auth-no-data">{i18n('noData')}</span>;
      }
      if (noVacationEntry) {
        vacationBanner = waitBanner;
      }
      if (noStudentApplyCount) {
        applyCountEle = <span className="no-auth-no-data">{i18n('noData')}</span>;
      } else {
        applyCountEle = <Link to="/classes/checkApply">{applyCount}</Link>;
      }
    }
    return (
      <div className="part-top">
        <div className="teacher-info-panel">
          <div className="avatar" >
            <span className="avatar-img-container"><img src={utils.avatar(teacherId)} alt="avatar" /></span>
            <span className="name" title="">{teacherName}</span>
            <span className="hi-text">{i18n('ovvwSayHi')}</span>
            <span className="info-icon">
              {
                typeof teacherName !== 'undefined' ?
                  <Popover {...popoverProps}><i onClick={self.togglePopover} tabIndex="0" role="button" className="update-name-icon icon iconfont icon-tips" /></Popover>
                  : null
              }
            </span>
            <span className="btn">
              <a className="ant-btn ant-btn-primary" href="/ewtbend/psychologicalTest/sethomework/sethomework.html">{i18n('ArrangeHomeWork')}</a>
            </span>
          </div>
          <div className="data-report">
            <div className="two-column-report report-of-psychological-test">
              <span className="number">{psychologicalNumberLink}</span>
              <span className="description">{i18n('ovvwPsychologicalReport')}</span>
            </div>
            <div className="two-column-report report-of-apply">
              <span className="number">{applyCountEle}</span>
              <span className="description">{i18n('ovvwApplyWaitToBeCheck')}</span>
            </div>
          </div>
        </div>
        <div className="banner psychology-banner">
          {psychologicalBanner}
        </div>
        <div className="banner homework-banner">
          {vacationBanner}
        </div>
        <Modal {...modalProps} >
          <div className={classnames('bend-form-item', { 'bend-form-item-with-help': errorTipsVisible })}>
            <Input value={inputValue} onChange={self.onInputChange} placeholder={i18n('ovvwUpdateNamePlaceholder')} />
          </div>
          <p className={classnames('error-tips', { 'fn-hide': !errorTipsVisible })}>{i18n('ovvwUpdateNameErrorTips')}</p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.overview,
  userInfo: state.userInfo.teacherInfo,
  userInfoLoading: state.userInfo.loading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopPannel);

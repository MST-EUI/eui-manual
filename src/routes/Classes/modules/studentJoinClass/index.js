import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import _ from 'lodash';
import i18n from '~/common/i18n/';
import Action from '~/actions/';
import Dialog from '~/components/Dialog/';
import api from '~/service/';
import utils from '~/common/utils';
import Loading from '~/components/Loading/';
import PageTitle from '~/components/PageTitle';

import Classes from './classes';
import NoClass from './noClass';
import School from './school';

import './style.scss';

class studentJoinClass extends React.Component {
  constructor(props) {
    super(props);
    const self = this;
    ['chooseSchool', 'searchSchool', 'studentJoinClass'].forEach((item) => {
      self[item] = self[item].bind(self);
    });
    self.state = {
      migrationModalVisible: false,
      migrationToClassName: null,
    };
    self.currentClass = {};
  }

  componentDidMount() {
    const self = this;
    const { dispatch } = self.props;
    dispatch(Action.fetchStudentSchoolAndItsClasses());
  }

  getMigrationClassesArrData = () => {
    const self = this;
    const { studentInfo } = self.props;
    const {
      classinfolist,
    } = studentInfo;
    const {
      type: currentClassType,
      subjectid: currentClassSubjectId,
      expireyear: currentClassExpiredYear,
    } = self.currentClass;
    let migrationClassesArr = [];
    if (classinfolist && classinfolist.length > 0) {
      if (Number(currentClassType) === 1) {
        migrationClassesArr = (classinfolist.filter(
          item => Number(item.type) === 1 && item.expireyear === currentClassExpiredYear,
        ));
      } else if (Number(currentClassType) === 2) {
        migrationClassesArr = (classinfolist.filter(
          item => Number(item.type) === 2 &&
          item.expireyear === currentClassExpiredYear &&
          Number(currentClassSubjectId) === Number(item.subjectid),
        ));
      }
    }
    return migrationClassesArr;
  }


  async studentJoinClass() {
    const self = this;
    const { dispatch } = self.props;
    const tearcherName = self.teacherNameInput.value;
    const studentName = self.studentNameInput.value;
    const {
      classname: migrationToClassName,
      hasmaster: hasMaster,
    } = self.currentClass;
    let isPass = true;
    if (!tearcherName && hasMaster) {
      dispatch(Action.teacherNameValid({
        isValid: false,
      }));
      isPass = false;
    }
    if (!studentName || studentName.length > 20) {
      dispatch(Action.studentNameValid({
        isValid: false,
      }));
      isPass = false;
    }
    if (!isPass) {
      return;
    }
    const needWarning = !!(self.getMigrationClassesArrData()).length;
    if (needWarning) {
      dispatch(Action.toggleStudentJoinClassDialog());
      self.setState({
        migrationToClassName,
        migrationModalVisible: true,
      });
      return;
    }
    self.finallyMigration();
  }

  async finallyMigration() {
    const self = this;
    const { dispatch } = self.props;
    const tearcherName = self.teacherNameInput.value;
    const studentName = self.studentNameInput.value;
    const {
      classid,
    } = self.currentClass;
    let joinResult;
    try {
      joinResult = await api.joinClass({
        classId: classid,
        studentName,
        masterName: tearcherName,
      });
    } catch (error) {
      joinResult = false;
    }

    let dialog;
    const needWarning = !!(self.getMigrationClassesArrData()).length;
    if (needWarning) {
      self.toggleMigrationModal();
    } else {
      dispatch(Action.toggleStudentJoinClassDialog());
    }
    if (joinResult === true) {
      // hide dialog
      dialog = Dialog.success({
        title: i18n('studentJoinClassJoinSuccessTitle'),
        content: i18n('studentJoinClassJoinSuccessJoinIn'),
        withConfirmButton: true,
        confirmText: i18n('studentJoinClassJoinSuccessConfirmText'),
        onConfirm: () => {
          dispatch(Action.queryStudentInfo()); // reget student info again
          dialog.close();
          utils.routeRedirect('/classes/myClasses');
        },
      });
    } else {
      dialog = Dialog.error({
        title: i18n('studentJoinClassJoinFailTitle'),
        content: i18n('studentJoinClassJoinFailDescription'),
        withConfirmButton: true,
        confirmText: i18n('studentJoinClassJoinFailRetry'),
        onConfirm: () => {
          dialog.close();
          dispatch(Action.toggleStudentJoinClassDialog());
        },
      });
    }
  }

  async chooseSchool(school) {
    const self = this;
    const { dispatch } = self.props;
    self.schoolSearchInput.value = school.schoolname;
    dispatch(Action.updateSearchSchoolObject(school));
    dispatch(Action.fetchClassesBySchoolName({
      schoolId: school.schoolid,
    }));
  }

  async searchSchool() {
    const self = this;
    const { dispatch } = self.props;
    const key = self.schoolSearchInput.value;
    if (!key) {
      // if search key is empty then not go search and hide the result block
      dispatch(Action.hideSchoolSearchResultBlock());
      return;
    }
    dispatch(Action.fetchSchoolListByName({
      schoolName: key,
    }));
  }

  toggleMigrationModal = () => {
    const self = this;
    const {
      migrationModalVisible,
    } = self.state;
    self.setState({
      migrationModalVisible: !migrationModalVisible,
    });
  }

  render() {
    const self = this;
    const { dispatch } = self.props;
    const migrationClassesArr = self.getMigrationClassesArrData();
    const migrationFromClasses = (migrationClassesArr || []).map(item => item.name).join('、');
    const {
      migrationModalVisible,
      migrationToClassName,
    } = self.state;
    const {
      joinClassDialogVisible,
      tearcherNameValid,
      studentNameValid,
      searchSchoolResultVisible,
      searchSchoolResultList,
      isSearchInputFocus,
      defaultSchoolAndItsClasses,
      searchSchoolAndItsClasses,
    } = self.props.studentJoinClass;

    const { isGoAheadFetching, school, classes, hasSchool } = defaultSchoolAndItsClasses;
    if (isGoAheadFetching) {
      return <Loading />;
    }
    const {
      isFetchedClassesBySchoolName,
      searchTargetSchool,
      searchTargetClasses = [],
    } = searchSchoolAndItsClasses;
    let schoolVisible = hasSchool;
    let classesData = classes;
    let schoolData = school;
    let emptyBlockVisible = hasSchool && classes.length < 1;
    if (!hasSchool) {
      schoolVisible = !!searchTargetSchool;
      classesData = searchTargetClasses;
      schoolData = searchTargetSchool;
      emptyBlockVisible = isFetchedClassesBySchoolName && searchTargetClasses.length < 1;
    }
    const clearIconVisible = self.schoolSearchInput && self.schoolSearchInput.value;
    const { hasmaster: hasMaster } = (self.currentClass || { hasmaster: true });
    const joinClassDialogConfig = {
      visible: joinClassDialogVisible,
      title: i18n('studentJoinClassCheckIdentify'),
      width: 500,
      confirmText: i18n('studentJoinClassCheckRightNow'),
      onCancel: () => {
        self.teacherNameInput.value = '';
        self.studentNameInput.value = '';
        dispatch(Action.toggleStudentJoinClassDialog());
      },
      onConfirm: self.studentJoinClass,
    };
    const joinBeforeWarningModalProps = {
      visible: migrationModalVisible,
      title: i18n('hint'),
      width: 440,
      className: 'join-class-warning-modal',
      onCancel: () => {
        self.toggleMigrationModal();
        dispatch(Action.toggleStudentJoinClassDialog());
      },
      onConfirm: () => {
        self.finallyMigration();
      },
    };

    return (
      <div className="page-join-class">
        <div className="box">
          <PageTitle title={i18n('colStudentMyClassJoinClass')} />
          <div className={classnames('class-list')}>
            <div className="tips-for-all">
              <h3 className="tip-tag">{i18n('warmPrompt')}</h3>
              <p className="tip-paragraph">{hasSchool ? i18n('studentJoinClassCommonTips') : i18n('studentJoinClassNoSchoolCommonTips')}</p>
            </div>
            <div className={classnames('search-box', { 'fn-hide': hasSchool })}>
              <div className={classnames('search-input-box', { 'focus-style': isSearchInputFocus })}>
                <i className="icon iconfont icon-magnifying-lens search-icon" />
                <input
                  onFocus={() => {
                    dispatch(Action.updateSearchInputOutline({ isFocus: true }));
                    if (self.schoolSearchInput.value) { self.searchSchool(); }
                  }}
                  onBlur={() => {
                    dispatch(Action.updateSearchInputOutline({ isFocus: false }));
                    setTimeout(() => {
                      // do hide after school select, for optimization later
                      dispatch(Action.hideSchoolSearchResultBlock());
                    }, 200);
                  }}
                  onChange={_.debounce(self.searchSchool, 500)}
                  ref={(r) => { self.schoolSearchInput = r; }}
                  className="key-input"
                  placeholder={i18n('studentJoinClassSearchPlaceholder')}
                />
                <i tabIndex="0" role="button" onClick={() => { self.schoolSearchInput.value = ''; self.searchSchool(); }} className={classnames('icon iconfont icon-clear clear-icon', { 'fn-hide': !clearIconVisible })} />
              </div>
              <div className={classnames('search-result', { 'fn-hide': !searchSchoolResultVisible })}>
                <ul className="list">
                  {
                    (searchSchoolResultList || []).map(item =>
                      (<li key={item.schoolid}>
                        <div tabIndex="0" role="button" onClick={() => { self.chooseSchool(item); }} className="li-inner">
                          <span className="school-name">{item.schoolname}</span>
                          <span className="address-info">
                            <span className="province">{item.provincename}</span>
                            <span className="city">{item.cityname}</span>
                            <span className="area">{item.districtname}</span>
                          </span>
                        </div>
                      </li>),
                    )
                  }
                </ul>
                <p className="footer">{i18n('studentJoinClassNoMySchool')}<span className="tel">{i18n('studentJoinClassTel')}</span></p>
              </div>
            </div>
            <School visible={schoolVisible} school={schoolData} />
            <Classes
              classes={classesData}
              onClick={(item) => {
                self.currentClass = item;
                dispatch(Action.toggleStudentJoinClassDialog());
              }}
            />
            <NoClass visible={emptyBlockVisible} />
          </div>
        </div>
        <Dialog {...joinClassDialogConfig}>
          <div className={classnames('question-line', { 'fn-hide': !hasMaster })}>
            <p className="question"><i className="red-star">*</i><span>{i18n('studentJoinClassWhatsYourMasterName')}</span></p>
            <div className="input-block">
              <input ref={(r) => { self.teacherNameInput = r; }} onChange={(e) => { if (e.currentTarget.value && !tearcherNameValid) { dispatch(Action.teacherNameValid({ isValid: true })); } }} className="input" placeholder={i18n('studentJoinClassMasterInputPlaceholder')} />
            </div>
            <p className={classnames('error-tips', { 'fn-hide': tearcherNameValid })}>{i18n('studentJoinClassMasterErrorTips')}</p>
          </div>
          <div className="question-line">
            <p className="question"><i className="red-star">*</i><span>{i18n('studentJoinClassWhatsYourName')}</span></p>
            <div className="input-block">
              <input ref={(r) => { self.studentNameInput = r; }} onChange={(e) => { if (e.currentTarget.value.length > 0 && e.currentTarget.value.length <= 20 && !studentNameValid) { dispatch(Action.studentNameValid({ isValid: true })); } }} className="input" placeholder={i18n('studentJoinClassYourNamePlaceholder')} />
            </div>
            <p className={classnames('error-tips', { 'fn-hide': studentNameValid })}>{i18n('studentJoinClassYourNameErrorTips')}</p>
          </div>
        </Dialog>
        <Dialog {...joinBeforeWarningModalProps}>
          <p className="warning">
            你正在从
            <span className="classes">{migrationFromClasses}</span>
            迁移到
            <span className="classes">{migrationToClassName}</span>
            ，迁移成功后你将不再是
            <span className="classes">{migrationFromClasses}</span>
            的学生，确定要继续吗？</p>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  studentJoinClass: state.studentJoinClass,
  studentInfo: state.userInfo.studentInfo,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(studentJoinClass);

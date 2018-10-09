import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import assign from 'object-assign';
import i18n from '~/common/i18n';
import utils from '~/common/utils';
import api from '~/service/';
import Action from '~/actions';
import PageTitle from '~/components/PageTitle';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import SearchInput from '~/components/SearchInput';
import {
  Cascader,
  Pagination,
  Select,
  Modal,
  Popover,
  message,
} from 'antd';
import CustomPopover from './bizComponents/customPopover';
import DetailEmpty from './bizComponents/empty';
import AddStudentModal from './addStudentModal';
import StudentCard from './studentCard';

import './style.scss';

const { PropTypes, Component } = React;
const Option = Select.Option;
const rejectEmptyChildrenArray = arr => arr.map((item) => {
  if (Array.isArray(item.children) && item.children.length > 0) {
    item.children = rejectEmptyChildrenArray(item.children);
  }
  if (Array.isArray(item.children) && item.children.length === 0) {
    delete item.children;
  }
  return item;
});
const getInitState = () => ({
  quitDutyModalVisible: false,
  deleteStudentModalVisible: false,
  disbandClassModalVisible: false,
  addStudentModalVisible: false,
  page: 1,
  pageSize: 16,
});
const MESSAGE_DURATION_TIME = 3.5;
const getQueryInitData = () => ({
  studentname: null,
  sort: null,
  page: 1,
  pageSize: 16,
});

class Detail extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.objectOf(PropTypes.any),
    params: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    dispatch: () => {},
    data: {},
    params: {},
  };

  constructor(props) {
    super(props);
    const { params: { classId } } = props;
    this.state = getInitState();
    this.inited = false;
    this.classId = Number(classId);
    this.dutyItem = {};
    this.pageQueryParams = assign({}, getQueryInitData(), {
      classid: Number(classId),
    });
  }

  componentDidMount() {
    const self = this;
    const { dispatch, params: { isOpenAddModal } } = self.props;
    dispatch(Action.getStudentSortOrderList());
    dispatch(Action.classesGetTeachersGradeClassList());
    if (isOpenAddModal) {
      self.setState({
        addStudentModalVisible: true,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const self = this;
    const {
      pageStudentSortOrderList,
      pageStudentSortOrderListLoading,
    } = nextProps.data;
    // TODO wierd issue, sometimes this code just not go running
    if (pageStudentSortOrderListLoading === false && self.inited === false) {
      // first ready then init page
      self.inited = true;
      self.pageQueryParams.sort = pageStudentSortOrderList[0].value;
      self.initPage();
    }
  }

  componentWillUnmount() {
    // clear data
    const self = this;
    const { dispatch } = self.props;
    this.setState(getInitState());
    dispatch(Action.classesClearDetailPageData());
  }

  toggleQuitDutyModal = () => {
    const { quitDutyModalVisible } = this.state;
    this.setState({
      quitDutyModalVisible: !quitDutyModalVisible,
    });
  }

  toggleDeleteStudentModal = () => {
    const { deleteStudentModalVisible } = this.state;
    this.setState({
      deleteStudentModalVisible: !deleteStudentModalVisible,
    });
  }

  toggleDisbandClassModal = () => {
    const { disbandClassModalVisible } = this.state;
    this.setState({
      disbandClassModalVisible: !disbandClassModalVisible,
    });
  }

  toggleAddStudentModal = () => {
    const { addStudentModalVisible } = this.state;
    this.setState({
      addStudentModalVisible: !addStudentModalVisible,
    });
  }

  switchClass = (value) => {
    const self = this;
    const classId = value[1];
    self.classId = classId;
    self.setState(getInitState(), () => {
      self.initPage();
      utils.routeRedirect(`/classes/detail/${classId}`);
    });
  }

  queryClassInfo = () => {
    const self = this;
    const { dispatch } = self.props;
    dispatch(Action.classesGetClassDetailByClassId({
      classid: self.classId,
    }));
  }

  queryPageStudentList = () => {
    const self = this;
    const { dispatch } = self.props;
    dispatch(Action.classesGetStudentListByClassId(self.pageQueryParams));
  }

  initPage = () => {
    const self = this;
    self.pageQueryParams = assign({}, getQueryInitData(), {
      classid: self.classId,
      sort: self.pageQueryParams.sort,
    });
    self.queryClassInfo();
    self.queryPageStudentList();
  }

  quitJob = async () => {
    const self = this;
    const { classInfo } = self.props.data;
    const { classname: detailClassName } = classInfo;
    const { value: dutyValue, text: dutyText } = self.dutyItem;
    try {
      const res = await api.teacherDismissJob({
        classid: self.classId,
        rolevalue: dutyValue,
      });
      if (res) {
        self.toggleQuitDutyModal();
        message.success(i18n('clsQuitJobSuccess', detailClassName, dutyText), MESSAGE_DURATION_TIME);
        self.queryClassInfo();
      } else {
        message.error(i18n('error'), MESSAGE_DURATION_TIME);
      }
    } catch (e) {
      message.error(i18n('error'), MESSAGE_DURATION_TIME);
    }
  }

  disbandClass = async () => {
    const self = this;
    try {
      const res = await api.disbandClass({
        classid: self.classId,
      });
      if (res) {
        self.toggleDisbandClassModal();
        message.success(i18n('clsDisbandClassSuccess'), MESSAGE_DURATION_TIME);
        setTimeout(() => {
          utils.routeRedirect('/classes/management');
        }, MESSAGE_DURATION_TIME * 1000);
      } else {
        message.error(i18n('error'), MESSAGE_DURATION_TIME);
      }
    } catch (e) {
      message.error(i18n('error'), MESSAGE_DURATION_TIME);
    }
  }

  delStudent = async () => {
    const self = this;
    const { userid: userId } = self.studentWaitDel;
    try {
      const res = await api.deleteStudentFromClass({
        classid: self.classId,
        userid: userId,
      });
      if (res) {
        self.toggleDeleteStudentModal();
        message.success(i18n('success'), MESSAGE_DURATION_TIME);
        self.queryPageStudentList();
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
      classInfo,
      teachersGradeClassList,
      teachersGradeClassListLoading,
      pageClassStudentData,
      pageClassStudentDataLoading,
      pageStudentSortOrderList,
      pageStudentSortOrderListLoading,
    } = this.props.data;
    const {
      quitDutyModalVisible,
      deleteStudentModalVisible,
      disbandClassModalVisible,
      addStudentModalVisible,
      page,
      pageSize,
    } = this.state;
    const {
      classname: detailClassName,
      classtype: classType,
      hasoperationprivilege: hasOperationPrivilege,
      candisbandclass: canDisbandClass,
      rolelist: teacherRoleList,
    } = classInfo;
    const {
      studentlist: pageStudentList,
      canremovestudent: canRemovestudent,
      totalcount: pageStudentTotalCount,
    } = pageClassStudentData;
    const { params: { classId } } = self.props;
    const { text: dutyText } = self.dutyItem;

    const paginationConfig = {
      total: pageStudentTotalCount || 0,
      current: page,
      pageSize,
      onChange: (v) => {
        self.pageQueryParams.page = v;
        self.setState({
          page: v,
        }, () => {
          self.queryPageStudentList();
        });
      },
    };
    let students = (pageStudentList || []).map(item => (
      <StudentCard
        key={item.userid}
        data={item}
        canRemove={canRemovestudent}
        onDelete={(v) => {
          self.studentWaitDel = v;
          self.toggleDeleteStudentModal();
        }}
      />
    ));
    if (pageClassStudentDataLoading) {
      students = <Loading />;
    }

    const renderDutyIte = dutyItem => (
      <div className="duty-line">
        {dutyItem.text}
        <span className="quit color-primary" onClick={() => { self.dutyItem = dutyItem; self.toggleQuitDutyModal(); }} tabIndex="0" role="button">{i18n('clsQuit')}</span>
      </div>
    );
    const dutyList = (teacherRoleList || []).map((item) => {
      item.render = renderDutyIte;
      return item;
    });

    const quitDutyModalProps = {
      visible: quitDutyModalVisible,
      title: i18n('hint'),
      maskClosable: false,
      onCancel: self.toggleQuitDutyModal,
      onOk: self.quitJob,
      className: 'quit-duty-modal',
      width: 440,
    };
    const delStudentModalProps = {
      visible: deleteStudentModalVisible,
      title: i18n('hint'),
      maskClosable: false,
      onCancel: self.toggleDeleteStudentModal,
      onOk: self.delStudent,
      className: 'delete-student-modal',
      width: 440,
    };
    const disbandClassModalProps = {
      visible: disbandClassModalVisible,
      title: i18n('hint'),
      maskClosable: false,
      onCancel: self.toggleDisbandClassModal,
      onOk: self.disbandClass,
      className: 'disband-class-modal',
      width: 440,
    };
    const addStudentModalProps = {
      visible: addStudentModalVisible,
      maskClosable: false,
      toggle: self.toggleAddStudentModal,
      onOk: () => {
        self.toggleAddStudentModal();
        self.queryPageStudentList();
      },
      classId: Number(classId),
    };

    // page title part
    const addStudentBtnVisible = String(classType) === '2';
    const dutyBtnVisible = String(classType) === '1' && teacherRoleList && teacherRoleList.length > 0;
    const teachersGradeClassCascadeOptions = rejectEmptyChildrenArray(teachersGradeClassList);
    const dutyPopoverProps = {
      title: '',
      content: <div className="duty-list"><CustomPopover data={dutyList} /></div>,
      trigger: 'click',
      placement: 'bottomRight',
      overlayClassName: 'duty-list-popover',
    };
    let pageStudentSortOrderEle = null;
    if (!pageStudentSortOrderListLoading) {
      pageStudentSortOrderEle = (
        <Select
          style={{width: 230}}
          size="large"
          onChange={(v) => {
            self.setState({
              page: 1,
            }, () => {
              self.pageQueryParams.page = 1;
              self.pageQueryParams.sort = v;
              self.queryPageStudentList();
            });
          }}
          defaultValue={String(pageStudentSortOrderList[0].value)}
        >
          {
            pageStudentSortOrderList.map(
              item => <Option key={item.value} value={String(item.value)}>{item.text}</Option>,
            )
          }
        </Select>
      );
    }

    const isPageStudentEmpty = pageClassStudentDataLoading === false && pageStudentTotalCount === 0;
    return (
      <div className="class-detail">
        <div className="detail-container">
          <div className="part-top">
            <PageTitle title={detailClassName || ''}>
              {
                teachersGradeClassListLoading ? null :
                  <Cascader
                    options={teachersGradeClassCascadeOptions}
                    onChange={self.switchClass}
                    expandTrigger="hover"
                  >
                    <span className="switch-class">{i18n('clsSwitchClass')}<i className="icon iconfont icon-triangle-down" /></span>
                  </Cascader>
              }
              <span className={classnames('btns-of-class', { 'fn-hide': !hasOperationPrivilege })}>
                <Button type="secondary" onClick={self.toggleDisbandClassModal} className={classnames({ 'fn-hide': !canDisbandClass })}>{i18n('clsDismissClass')}</Button>
                <Button type="primary" onClick={self.toggleAddStudentModal} className={classnames({ 'fn-hide': !addStudentBtnVisible })}>{i18n('clsAddStudent')}</Button>
                <Popover {...dutyPopoverProps}>
                  <Button type="secondary" className={classnames({ 'fn-hide': !dutyBtnVisible })}>{i18n('clsMyDuty')}<i className="icon iconfont icon-triangle-down my-duty-icon" /></Button>
                </Popover>
              </span>
            </PageTitle>
          </div>
          <div className="part-list">
            <div className="part-filter" >
              <SearchInput
                onClick={(v) => {
                  self.setState({
                    page: 1,
                  }, () => {
                    self.pageQueryParams.studentname = v;
                    self.pageQueryParams.page = 1;
                    self.queryPageStudentList();
                  });
                }}
                className="search-input-block"
              />
              <span className="sort-label">{i18n('order')}：</span>
              {pageStudentSortOrderEle}
            </div>
            <div className="part-content">
              <div className="normal">
                <p className={classnames('total', { 'fn-hide': isPageStudentEmpty })}>{i18n('total')}&nbsp;<span className="color-orange">{typeof pageStudentTotalCount !== 'undefined' ? pageStudentTotalCount : null}</span>&nbsp;{i18n('unit')}{i18n('student')}</p>
                <div className="student-list" >{students}</div>
                <div className={classnames('pagination', { 'fn-hide': isPageStudentEmpty })}>
                  <Pagination {...paginationConfig} />
                </div>
              </div>
              <div className={classnames('empty', { 'fn-hide': !isPageStudentEmpty })}>
                <DetailEmpty type={String(classType) === '2' ? 'subjectClass' : ''} onClick={self.toggleAddStudentModal} />
              </div>
            </div>
          </div>
        </div>
        <Modal {...quitDutyModalProps} >
          <p className="quit-duty-warning">
            <span className="quit-word">{i18n('clsQuit')}</span>{dutyText}{i18n('clsQuitDescription_1')}<span className="quit-word">{i18n('clsQuit')}</span>{i18n('clsQuitDescription_2')}
          </p>
        </Modal>
        <Modal {...delStudentModalProps} >
          <p className="delete-student-warning">
            {i18n('clsDeleteStudentWarning')}
          </p>
        </Modal>
        <Modal {...disbandClassModalProps} >
          <p className="disband-class-warning">
            {i18n('clsdisbandClassWarning')}
          </p>
        </Modal>
        <AddStudentModal {...addStudentModalProps} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.classes.detail,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);


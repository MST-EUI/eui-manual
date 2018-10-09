import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { hashHistory } from 'react-router';
import Action from '~/actions';

import { Popover, Select, Table } from 'antd';
import promptArrowPic from '~/common/images/prompt_arrow.png';
import PageTitle from '~/components/PageTitle';
import Button from '~/components/Button';
import SearchInput from '~/components/SearchInput';
import i18n from '~/common/i18n';
import RenameClassModal from './bizComponents/renameClassModal';
import CreateClassModal from './bizComponents/createClassModal';
import CreateSuccessfullyModal from './bizComponents/createSuccessfullyModal';

import './style.scss';

const Option = Select.Option;
const { PropTypes, Component } = React;

class Managment extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    classes: PropTypes.objectOf(PropTypes.any),
    userInfo: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    dispatch: () => {},
    classes: {},
    userInfo: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        classname: '',
        classtype: '0', // 班级类型;
        expireyear: '0', // 所属年级;
        page: 1,
        pagesize: 15,
      },
      dataEmpty: false,
      createClassModalVisible: false,
      successfulModalVisible: false,
      renameClassModalVisible: false,
      classData: {},
      createdClassId: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { queryData } = this.state;

    dispatch(Action.getClassTypes({ enumType: 'classTypes' }));
    dispatch(Action.getBelongGrades());
    dispatch(Action.getClassManageClassesList(queryData));
  }

  getClassList = (queryData) => {
    const { dispatch } = this.props;

    this.setState({
      queryData,
    }, () => {
      dispatch(Action.getClassManageClassesList(queryData));
    });
  }

  belongGradeOnChange = (value) => {
    const { queryData } = this.state;

    queryData.page = 1;
    queryData.expireyear = value;
    this.getClassList(queryData);
  }

  classTypeOnChange = (value) => {
    const { queryData } = this.state;

    queryData.page = 1;
    queryData.classtype = value;
    this.getClassList(queryData);
  }

  pageOnChange = (page) => {
    const { queryData } = this.state;

    queryData.page = page;
    this.getClassList(queryData);
  }

  searchClassName = (value) => {
    const { queryData } = this.state;

    queryData.page = 1;
    queryData.classname = value;
    this.getClassList(queryData);
  }

  viewClassDetail = (classInfo) => {
    hashHistory.push(`/classes/detail/${classInfo.classid}`);
  }

  showRenameClassModal = (classInfo) => {
    if (!classInfo.iscanupdatename) {
      return;
    }

    this.setState({
      renameClassModalVisible: true,
      classData: classInfo,
    });
  }

  closeRenameClassModal = () => {
    this.setState({
      renameClassModalVisible: false,
    });
  }

  showCreateClassModal = () => {
    this.setState({
      createClassModalVisible: true,
    });
  }

  closeCreateClassModal = () => {
    this.setState({
      createClassModalVisible: false,
    });
  }

  toggleSuccessfulModal = (classId) => {
    const { successfulModalVisible } = this.state;
    let { createdClassId } = this.state;

    if (classId) {
      createdClassId = String(classId);
    }

    this.setState({
      successfulModalVisible: !successfulModalVisible,
      createdClassId,
    });
  }

  renameClassNameCallback = () => {
    const { queryData } = this.state;

    this.closeRenameClassModal();
    this.getClassList(queryData);
  }

  redirectToJoinClassPage = () => {
    hashHistory.push('/classes/teacher');
  }

  render() {
    const { queryData: { page, pagesize }, dataEmpty,
      createClassModalVisible, successfulModalVisible,
      renameClassModalVisible, classData, createdClassId } = this.state;
    const { classes: { classTypes, belongGrades,
      classList: { totalcount, classlist } },
    userInfo: { teacherInfo }, dispatch } = this.props;
    classData.schoolName = teacherInfo.schoolname;
    let classTypesSelector = null;
    let belongGradesSelector = null;
    const popoverCont = (
      <div className="prompt-box">
        <ul className="prompt-tips-list">
          <li className="tip">
            <span className="tip-name">{i18n('administrativeClass', '：')}</span>
            <span className="tip-content">{i18n('administrativePrompt')}</span>
          </li>
          <li className="tip">
            <span className="tip-name">{i18n('teachingClass', '：')}</span>
            <span className="tip-content">{i18n('teachingPrompt')}</span>
          </li>
        </ul>
      </div>
    );
    const columns = [
      {
        title: i18n('classname'),
        dataIndex: 'classname',
        key: 'classname',
      },
      {
        title: i18n('classType'),
        dataIndex: 'classtypename',
        key: 'classtypename',
      },
      {
        title: i18n('belongGrade'),
        dataIndex: 'belonggrade',
        key: 'belonggrade',
      },
      {
        title: i18n('studentCount'),
        dataIndex: 'studentcount',
        key: 'studentcount',
      },
      {
        title: i18n('classTeacher'),
        dataIndex: 'headmaster',
        key: 'headmaster',
        render: (text) => {
          if (!text) {
            return '-';
          }
          return text;
        },
      },
      {
        title: i18n('operation'),
        dataIndex: 'operation',
        key: 'operation',
        width: 170,
        render: (text, record) => (
          <div className="operations-wrapper">
            <a tabIndex="0"
              role="button"
              className="operation-btn"
              onClick={() => { this.viewClassDetail(record); }}
            >{i18n('detail')}</a>
            <span className="vertical-line" />
            <a tabIndex="0"
              role="button"
              className={classnames('operation-btn', { disabled: !record.iscanupdatename })}
              onClick={() => { this.showRenameClassModal(record); }}
            >{i18n('modifyName')}</a>
          </div>
        ),
      },
    ];
    const paginationConf = {
      current: page,
      pageSize: pagesize,
      onChange: this.pageOnChange,
      total: totalcount,
    };

    if (classTypes.length > 0) {
      classTypesSelector = (
        <Select defaultValue="0" style={{width: 102}} size="large" onChange={this.classTypeOnChange}>
          {
            classTypes.map(item => (
              <Option key={item.value} value={`${item.value}`}>{item.text}</Option>
            ))
          }
        </Select>);
    }

    if (belongGrades.length > 0) {
      belongGradesSelector = (
        <Select defaultValue="0" style={{width: 220}} size="large" onChange={this.belongGradeOnChange}>
          {
            belongGrades.map(item => (
              <Option key={item.value} value={`${item.value}`}>{item.text}</Option>
            ))
          }
        </Select>);
    }

    return (
      <div className="class-management-wrapper">
        <PageTitle title={i18n('classManagement')}>
          <div className="right-btns-wrapper">
            <Popover content={popoverCont} placement="bottom" trigger="hover">
              <div className="iconfont icon-circle-doubt" />
            </Popover>
            <Button type="secondary" onClick={this.redirectToJoinClassPage}>{i18n('joinAdministrativeClass')}</Button>
            <Button type="secondary" onClick={this.showCreateClassModal}>{i18n('createTeachingClass')}</Button>
          </div>
        </PageTitle>
        {
          dataEmpty ?
            (<div className="body-empty-prompt">
              <div className="prompt-content-wrapper">
                <p className="prompt-content">
                  {i18n('cmNoClassPrompt')}
                  <a>{i18n('joinAdministrativeClass')}</a>
                  {i18n('or')}
                  <a>{i18n('createSelfTeachingClass')}</a>
                </p>
                <div className="prompt-arrow-pic">
                  <img src={promptArrowPic} alt="" />
                </div>
              </div>
            </div>)
            :
            (<div className="class-management-body">
              <div className="search-conds-wrapper">
                <SearchInput placeholder={i18n('clsInputClassnameSearch')} onClick={this.searchClassName} />
                <div className="cond-wrapper">
                  <span className="label">{i18n('classType')}</span>
                  { classTypesSelector }
                </div>
                <div className="cond-wrapper">
                  <span className="label">{i18n('belongGrade')}</span>
                  { belongGradesSelector }
                </div>
              </div>
              <div className="data-wrapper">
                <p className="total-count">
                  {i18n('total')}
                  <span className="number">{totalcount}</span>
                  {i18n('unit')}{i18n('class')}
                </p>
                <Table
                  columns={columns}
                  dataSource={classlist}
                  // loading={loading}
                  pagination={paginationConf}
                  bordered
                />
              </div>
            </div>)
        }
        <RenameClassModal
          visible={renameClassModalVisible}
          data={classData}
          dispatch={dispatch}
          onCancel={this.closeRenameClassModal}
          onConfirm={this.renameClassNameCallback}
        />
        <CreateClassModal
          visible={createClassModalVisible}
          onCancel={this.closeCreateClassModal}
          onConfirm={this.toggleSuccessfulModal}
        />
        <CreateSuccessfullyModal
          classId={createdClassId}
          visible={successfulModalVisible}
          onCancel={this.toggleSuccessfulModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  classes: state.classes,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Managment);

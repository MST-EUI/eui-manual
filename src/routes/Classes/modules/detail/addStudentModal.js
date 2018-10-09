import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import assign from 'object-assign';
import i18n from '~/common/i18n';
import api from '~/service/';
import Action from '~/actions';
import { message, Modal, Checkbox } from 'antd';
import SearchInputWithClearIcon from '~/components/SearchInputWithClearIcon';
import Loading from '~/components/Loading';
import EmptyData from '~/components/EmptyData';

const { PropTypes, Component } = React;
const MESSAGE_DURATION_TIME = 2;

const getInitState = () => ({
  classesExpandData: {},
  selectedStudentArrayData: [],
  selectedStudentObjectData: {},
  allCheckedData: {},
  classStudentListObject: {},
  studentTotalCount: null,
  studentSearchResult: [],
  studentSearchResultVisible: false,
});

class AddStudentModal extends Component {
  static propTypes = {
    toggle: PropTypes.func,
    onOk: PropTypes.func,
    dispatch: PropTypes.func,
    visible: PropTypes.bool,
    classId: PropTypes.number,
    data: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    toggle: () => {},
    dispatch: () => {},
    onOk: () => {},
    visible: false,
    data: {},
    classId: null,
  };

  constructor(props) {
    super(props);
    this.basedDataReady = false;
    this.state = getInitState();
  }

  componentWillReceiveProps(nextProps) {
    const {
      visible,
      dispatch,
      classId,
    } = nextProps;
    const {
      classesAndStudentList,
      classesAndStudentListLoading,
      classesAndStudentListTotalCount,
    } = nextProps.data;
    if (visible && !this.basedDataReady) {
      this.basedDataReady = true;
      dispatch(Action.queryAllClassesStudentList({
        classid: classId,
      }));
    }
    const {
      classStudentListObject,
    } = this.state;
    if (!classesAndStudentListLoading && Object.keys(classStudentListObject).length === 0) {
      // init class student array data to be object
      classesAndStudentList.forEach(
        (item) => {
          classStudentListObject[item.classid] = item.studentlist;
        },
      );
      this.setState({
        classStudentListObject,
        studentTotalCount: classesAndStudentListTotalCount,
      });
    }
  }

  componentWillUnmount() {
    this.setState(getInitState());
  }

  toggleClassGroup = (id) => {
    const self = this;
    const {
      classesExpandData,
    } = self.state;
    this.setState({
      classesExpandData: assign({
        ...classesExpandData,
        [id]: typeof classesExpandData[id] !== 'undefined' ? !classesExpandData[id] : true,
      }),
    });
  }

  studentChecked = (student, isDelete) => {
    const self = this;
    const {
      userid: studentId,
      classId,
    } = student;
    const {
      selectedStudentArrayData,
      selectedStudentObjectData,
      allCheckedData,
      classStudentListObject,
    } = self.state;
    let currentSelectedStudent = selectedStudentArrayData;
    const currentAllCheckedData = assign({}, {
      ...allCheckedData,
    });
    if (!isDelete && !selectedStudentObjectData[studentId]) {
      selectedStudentObjectData[studentId] = true;
      currentSelectedStudent.push(student);
      const classStudentAllChecked = classStudentListObject[classId].filter(
        item => !selectedStudentObjectData[item.userid],
      ).length === 0;
      if (classStudentAllChecked) {
        // if this student relation class's all student is checked
        currentAllCheckedData[classId] = true;
      }
    } else {
      delete selectedStudentObjectData[studentId];
      currentSelectedStudent = selectedStudentArrayData.filter(item => item.userid !== studentId);
      if (currentAllCheckedData[classId]) {
        delete currentAllCheckedData[classId];
      }
    }
    this.setState({
      selectedStudentArrayData: currentSelectedStudent,
      allCheckedData: currentAllCheckedData,
    });
  }

  checkedAll = (classId) => {
    const self = this;
    const {
      allCheckedData,
      selectedStudentArrayData,
      selectedStudentObjectData,
      classStudentListObject,
    } = self.state;
    let currentSelectedStudentArray = [...selectedStudentArrayData];
    if (allCheckedData[classId]) {
      delete allCheckedData[classId];
      classStudentListObject[classId].forEach((studentItem) => {
        const {
          userid: studentId,
        } = studentItem;
        if (selectedStudentObjectData[studentId]) {
          delete selectedStudentObjectData[studentId];
          currentSelectedStudentArray =
          currentSelectedStudentArray.filter(filterItem => filterItem.userid !== studentId);
        }
      });
    } else {
      allCheckedData[classId] = true;
      classStudentListObject[classId].forEach((studentItem) => {
        const {
          userid: studentId,
        } = studentItem;
        if (!selectedStudentObjectData[studentId]) {
          selectedStudentObjectData[studentId] = true;
          currentSelectedStudentArray.push(studentItem);
        }
      });
    }
    this.setState({
      allCheckedData: assign({}, allCheckedData),
      selectedStudentArrayData: currentSelectedStudentArray,
    });
  }

  searchStudentByName = (key) => {
    const self = this;
    const {
      classesAndStudentList,
      studentSearchResultVisible,
    } = self.props.data;
    const result = [];
    let visible = studentSearchResultVisible;
    if (key) {
      classesAndStudentList.forEach((classItem) => {
        classItem.studentlist.forEach((student) => {
          if (student.name.indexOf(key) !== -1) {
            result.push(student);
          }
        });
      });
      visible = true;
    } else {
      visible = false;
    }
    self.setState({
      studentSearchResult: result,
      studentSearchResultVisible: visible,
    });
  }

  commit = async () => {
    const self = this;
    const { classId, onOk } = self.props;
    const {
      selectedStudentArrayData,
      classStudentListObject,
      studentTotalCount,
    } = self.state;
    if (selectedStudentArrayData.length === 0) {
      message.warning(i18n('clsNoStudentSelectedForAdd'), MESSAGE_DURATION_TIME);
      return;
    }
    try {
      const res = await api.addStudentToClass({
        classid: classId,
        studentids: selectedStudentArrayData.map(item => item.userid),
      });
      if (res === true) {
        message.success(i18n('clsAddStudentSuccess'), MESSAGE_DURATION_TIME);
        onOk();
        self.setState({
          ...getInitState(),
          classStudentListObject,
          studentTotalCount,
        });
      } else {
        message.error(i18n('error'));
      }
    } catch (e) {
      // console.log(e);
    }
  }

  render() {
    const self = this;
    const {
      visible,
      toggle,
    } = self.props;
    const {
      classesExpandData,
      selectedStudentArrayData,
      selectedStudentObjectData,
      allCheckedData,
      studentTotalCount,
      studentSearchResult,
      studentSearchResultVisible,
    } = self.state;
    const {
      classesAndStudentList,
      classesAndStudentListLoading,
    } = self.props.data;
    const addStudentModalProps = {
      visible,
      className: 'add-student-modal',
      width: 605,
      onCancel: toggle,
      maskClosable: false,
      onOk: self.commit,
    };

    const selectedStudents = selectedStudentArrayData.map((item) => {
      const {
        userid: userId,
        name,
        headimage: avatar,
      } = item;
      return (
        <li className="selected-student-item" key={userId}>
          <span className="avatar">
            <img src={avatar} alt="" />
          </span>
          <span className="name" title={name}>{name}</span>
          <span className="del-icon" tabIndex="0" role="button" onClick={() => { self.studentChecked(item, true); }}>
            <i className="icon iconfont icon-clear" />
          </span>
        </li>
      );
    });
    let listEles = classesAndStudentList.map((classItem) => {
      const {
        classid: classId,
        classname: classText,
        studentlist: studentList,
      } = classItem;
      const classExpand = classesExpandData[classId];
      const normalStudents = studentList.map((student) => {
        const {
          userid: userId,
          name,
          headimage: avatar,
        } = student;
        student.classId = classId; // keep classId for student, use object is in heap character
        return (
          <li className="student-item" key={userId}>
            <span className="avatar">
              <img src={avatar} alt="" />
            </span>
            <span className="name" title={name}>{name}</span>
            <span className="checkbox">
              <Checkbox
                checked={!!selectedStudentObjectData[userId]}
                onChange={() => { self.studentChecked(student); }}
              />
            </span>
          </li>
        );
      });
      return (
        <li className="class" key={classId}>
          <div className="menu-area">
            <div onClick={() => { self.toggleClassGroup(classId); }} className="class-item" tabIndex="0" role="button">
              <i className={classnames('icon iconfont arrow-icon-of-class', { 'icon-arrow-down-small': classExpand }, { 'icon-arrow-right-small': !classExpand })} />
              <span title={classText} className="class-name">{classText}</span>
            </div>
            <div onClick={() => { self.checkedAll(classId); }} className="all-checked" tabIndex="0" role="button">{ allCheckedData[classId] ? i18n('deselctAll') : i18n('selectAll')}</div>
          </div>
          <ul className={classnames('student-list', { 'fn-hide': !classExpand })}>
            {normalStudents}
          </ul>
        </li>
      );
    });
    if (studentSearchResultVisible) {
      let resultListEle = null;
      resultListEle = studentSearchResult.map((student) => {
        const {
          userid: userId,
          name,
          headimage: avatar,
        } = student;
        return (
          <li className="student-item" key={userId}>
            <span className="avatar">
              <img src={avatar} alt="" />
            </span>
            <span className="name">{name}</span>
            <span className="checkbox">
              <Checkbox
                checked={!!selectedStudentObjectData[userId]}
                onChange={() => { self.studentChecked(student); }}
              />
            </span>
          </li>
        );
      });
      if (studentSearchResult.length === 0) {
        resultListEle = <EmptyData className="student-search-empty" />;
      }
      listEles = (
        <ul className={classnames('student-list')}>
          {resultListEle}
        </ul>
      );
    }
    return (
      <Modal {...addStudentModalProps} >
        <div className="part-left">
          <SearchInputWithClearIcon onChange={self.searchStudentByName} />
          <p className="title">{i18n('clsWaitForAdd')}</p>
          <div className="class-student-container">
            <ul className="class-list">
              {classesAndStudentListLoading ? <Loading /> : listEles}
            </ul>
          </div>
        </div>
        <div className="part-right">
          <p className="count">{i18n('selected')}&nbsp;{selectedStudentArrayData.length}/{studentTotalCount}</p>
          <ul className="selected-list">
            {selectedStudents}
          </ul>
        </div>
      </Modal>
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
)(AddStudentModal);

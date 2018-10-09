import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Select, Radio, Input } from 'antd';
import Action from '~/actions';

import i18n from '~/common/i18n';
import Label from '~/routes/Classes/modules/components/Label';

import './style.scss';

const Option = Select.Option;
const RadioGroup = Radio.Group;

class CreateClassModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    grades: PropTypes.arrayOf(PropTypes.any),
    classes: PropTypes.objectOf(PropTypes.any),
    userInfo: PropTypes.objectOf(PropTypes.any),
    dispatch: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    grades: [],
    classes: {},
    userInfo: {},
    dispatch: () => {},
    onCancel: () => {},
    onConfirm: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        expireyear: '0',
        subjectid: '0',
        classnametype: '1',
        classname: '',
      },
      gradeError: false,
      subjectError: false,
      classNameError: false,
      subjectName: '',
      entryYear: '',
      classNameErrorPrompt: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(Action.getBelongGradesForCreateClassModal());
    dispatch(
      Action.getBelongSubjectForCreateClassModal({ enumType: 'subjects', includeAll: false }));
  }

  checkQueryData = () => {
    const { queryData: {
      expireyear,
      subjectid,
      classnametype,
      classname,
    } } = this.state;

    if (expireyear === '0') {
      this.setState({
        gradeError: true,
      });
      return false;
    } else if (subjectid === '0') {
      this.setState({
        subjectError: true,
      });
      return false;
    } else if (classnametype === '1'
      && (!classname
      || isNaN(classname))
    ) {
      this.setState({
        classNameError: true,
      });
      return false;
    } else if (classnametype === '2'
      && (!classname
      || classname.length > 10)
    ) {
      this.setState({
        classNameError: true,
      });
      return false;
    }

    return true;
  }

  createClass = async () => {
    const { onCancel, onConfirm, dispatch } = this.props;
    const { queryData } = this.state;
    const _this = this;

    if (this.checkQueryData()) {
      let res;
      try {
        res = await dispatch(Action.createTeachingClass(queryData));
        onCancel();
        onConfirm(res);
      } catch (error) {
        _this.setState({
          classNameErrorPrompt: error.msg,
          classNameError: true,
        });
      }

      // promise.then((res) => {
      //   console.log(res, 1111);
      //   if (Object.prototype.hasOwnProperty.call(res, 'data')) {
      //     _this.setState({
      //       classNameErrorPrompt: res.msg,
      //       classNameError: true,
      //     });
      //   } else {
      //     onCancel();
      //     onConfirm(res);
      //   }
      // });
    }
  }

  gradeOnChange = (value) => {
    const { queryData } = this.state;
    const {classes: { belongGradesForCreateClass }} = this.props;
    let { gradeError, entryYear } = this.state;

    gradeError = value !== '0' ? false : gradeError;
    queryData.expireyear = value;
    for (let i = 0, len = belongGradesForCreateClass.length; i < len; i += 1) {
      const temp = belongGradesForCreateClass[i];

      if (`${temp.value}` === value) {
        entryYear = i18n('cmEntryYear', temp.entranceyear);
        break;
      }
    }
    this.setState({ queryData, gradeError, entryYear });
  }

  subjectOnChange = (value) => {
    const { queryData } = this.state;
    const {classes: { belongSubjectForCreateClass }} = this.props;
    let { subjectError, subjectName } = this.state;

    subjectError = value !== '0' ? false : subjectError;
    queryData.subjectid = value;
    for (let i = 0, len = belongSubjectForCreateClass.length; i < len; i += 1) {
      const temp = belongSubjectForCreateClass[i];

      if (`${temp.value}` === value) {
        subjectName = temp.text;
        break;
      }
    }
    this.setState({ queryData, subjectError, subjectName });
  }

  classTypeOnChange = (e) => {
    const { queryData } = this.state;

    queryData.classnametype = e.target.value;
    this.setState({ queryData, classNameError: false, classNameErrorPrompt: '' });
  }

  classNameOnChange = (e) => {
    const { queryData } = this.state;

    queryData.classname = e.target.value;
    this.setState({ queryData, classNameError: false, classNameErrorPrompt: '' });
  }

  render() {
    const { visible, onCancel,
      classes: {
        belongGradesForCreateClass,
        belongSubjectForCreateClass,
      },
      userInfo: { teacherInfo } } = this.props;
    const { queryData: { classnametype, classname },
      gradeError, subjectError, classNameError,
      subjectName, entryYear, classNameErrorPrompt} = this.state;
    const dialogConfig = {
      width: 728,
      title: i18n('createTeachingClass'),
      maskClosable: false,
      wrapClassName: 'create-class-modal-wrapper',
      visible,
      onCancel,
      onOk: this.createClass,
    };
    let belongGradesSelector = null;
    let belongSubjectSelector = null;

    if (belongGradesForCreateClass.length > 0) {
      belongGradesSelector = (
        <Select defaultValue="0"
          style={{width: 230}}
          size="large"
          onChange={this.gradeOnChange}
        >
          {
            belongGradesForCreateClass.map(item => (
              <Option key={item.value} value={`${item.value}`}>{item.text}</Option>
            ))
          }
        </Select>);
    }

    if (belongSubjectForCreateClass.length > 0) {
      belongSubjectSelector = (
        <Select defaultValue="0"
          style={{width: 230}}
          size="large"
          onChange={this.subjectOnChange}
        >
          {
            belongSubjectForCreateClass.map(item => (
              <Option key={item.value} value={`${item.value}`}>{item.text}</Option>
            ))
          }
        </Select>);
    }

    return (
      <Modal {...dialogConfig}>
        <div className="create-class-body-wrapper">
          <Label label={i18n('belongSchool')}>
            <p className="content">{teacherInfo.schoolname}</p>
            <p className="content-prompt">
              {i18n('cmErrorSchoolPrompt')}
              <span className="phone-num">4000211985</span>
            </p>
          </Label>
          <Label label={i18n('belongGrade')} required>
            { belongGradesSelector }
            {
              gradeError ? <p className="error-prompt">{i18n('pleaseChooseGrade')}</p> : null
            }
          </Label>
          <Label label={i18n('belongSubject')} required>
            { belongSubjectSelector }
            {
              subjectError ? <p className="error-prompt">{i18n('pleaseChooseSubject')}</p> : null
            }
          </Label>
          <Label label={i18n('classNamedMode')}>
            <RadioGroup value={classnametype} onChange={this.classTypeOnChange}>
              <Radio key="a" value="1">{i18n('classNo')}</Radio>
              <Radio key="b" value="2">{i18n('userDefined')}</Radio>
            </RadioGroup>
            <p className="content-prompt">{i18n('classNamedModePrompt')}</p>
          </Label>
          {
            classnametype === '1' ?
              (
                <Label label={i18n('classname')}>
                  <div className="content">
                    {subjectName}教学（
                    <div className="class-num-input">
                      <Input placeholder={i18n('pleaseInputClassNo')}
                        size="large"
                        onChange={this.classNameOnChange}
                      />
                    </div>
                    ）班{entryYear}
                  </div>
                  {
                    classNameError && !classname && !classNameErrorPrompt ?
                      <p className="error-prompt">{i18n('cmPleaseInputClassNo')}</p> : null
                  }
                  {
                    classNameError && !!classNameErrorPrompt ?
                      <p className="error-prompt">{classNameErrorPrompt}</p> : null
                  }
                  {
                    classNameError && (isNaN(classname) || classname < 0) && !classNameErrorPrompt ?
                      <p className="error-prompt">{i18n('cmClassNoMustBeANum')}</p> : null
                  }
                </Label>
              )
              :
              (
                <Label label={i18n('classname')}>
                  <div className="content">
                    <div className="classname-input">
                      <Input placeholder={i18n('pleaseInputClassname')}
                        size="large"
                        onChange={this.classNameOnChange}
                      />
                    </div>
                  </div>
                  {
                    classNameError && !classname && !classNameErrorPrompt ?
                      <p className="error-prompt">{i18n('cmPleaseInputClassName')}</p> : null
                  }
                  {
                    classNameError && classname.length > 10 && !classNameErrorPrompt ?
                      <p className="error-prompt">{i18n('cmNoMoreThanTenWords')}</p> : null
                  }
                  {
                    classNameError && !!classNameErrorPrompt ?
                      <p className="error-prompt">{classNameErrorPrompt}</p> : null
                  }
                </Label>
              )
          }
        </div>
      </Modal>
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
)(CreateClassModal);

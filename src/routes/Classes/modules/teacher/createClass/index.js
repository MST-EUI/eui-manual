import React from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  Radio,
} from 'antd';

import './index.scss';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

const { Component, PropTypes } = React;

class CreateClass extends Component {
  static propTypes = {
    grades: PropTypes.arrayOf(PropTypes.any),
    form: PropTypes.objectOf(PropTypes.any).isRequired,
    visible: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    schoolName: PropTypes.string,
  };

  static defaultProps = {
    grades: [],
    visible: false,
    onSubmit: () => {},
    onCancel: () => {},
    schoolName: '',
  };

  state = {
    nameType: 1,
    gradeValue: '',
    classNoGrade: '',
    confirmLoading: false,
  };

  onChangeType = (e) => {
    this.setState({
      nameType: e.target.value,
    });
  };
  onChangeGrade = (value) => {
    const { grades } = this.props;
    let text = '';
    grades.some((item) => {
      if (`${item.value}` === value) {
        text = item.text;
        return true;
      }
      return false;
    });
    this.setState({
      classNoGrade: text,
      gradeValue: value,
    });
  };

  poIntRule = (rule, value, callback) => {
    const reg = /^[1-9]\d*$/;
    if (value && !reg.test(value)) {
      callback('只能填写正整数');
      return;
    }
    callback();
  };
  exClassNameRule = (rule, value, callback) => {
    const reg = new RegExp('^[A-Za-z0-9\u4e00-\u9fa5]+$');
    if (value && !reg.test(value)) {
      callback('班级名称不能包含除中文、英文和数字以外的其它字符');
      return;
    }
    callback();
  };
  handleOk = () => {
    const {form: {validateFields, setFields}, onSubmit, grades} = this.props;
    const {nameType, gradeValue} = this.state;
    validateFields((errors, values) => {
      if ((nameType === 1 && errors.classno) || (nameType === 2 && errors.classname)) {
        return;
      }
      this.setState({
        confirmLoading: true,
      });
      const classname = values.classname || values.classno;
      const expireyear = gradeValue || grades[0].value;
      onSubmit({
        classname,
        classnametype: nameType,
        expireyear,
        callback: (res) => {
          if (res.code === 112) {
            if (nameType === 1) {
              setFields({
                classno: {
                  value: values.classno,
                  errors: [new Error('该班级号已存在，请换一个班级号')],
                },
              });
            } else {
              setFields({
                classname: {
                  value: values.classno,
                  errors: [new Error('班级名称重复，请更换班级名称')],
                },
              });
            }
          }

          this.setState({
            confirmLoading: false,
          });
        },
      });
    });
  };
  handleCancel = () => {
    const { form: {resetFields}, onCancel} = this.props;
    resetFields();
    onCancel();
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16, offset: 1 },
    };
    const { grades, visible } = this.props;

    const { form: { getFieldProps }, schoolName } = this.props;
    const { nameType, classNoGrade, gradeValue, confirmLoading } = this.state;

    let gradeDefault = null;
    let gradeName = '';
    if (grades.length && !gradeValue) {
      gradeDefault = `${grades[0].value}`;
      gradeName = grades[0].text;
    } else {
      gradeName = classNoGrade;
      gradeDefault = gradeValue;
    }

    // const selectProps = getFieldProps('expireyear', {
    //   initialValue: gradeDefault,
    //   rules: [
    //     { required: true, message: '请选择年级' },
    //   ],
    // });
    const classNoProps = getFieldProps('classno', {
      rules: [
        { required: true, message: '请填写班级号' },
        { validator: this.poIntRule },
      ],
    });

    const classNameProps = getFieldProps('classname', {
      rules: [
        { required: true, message: '请填写班级名称' },
        { validator: this.exClassNameRule },
        { max: 10, message: '班级名称最多10个字'},
      ],
    });

    const typeForm = nameType === 1 ? (
      <FormItem
        {...formItemLayout}
        label="班级号"
      >
        <p className="class-no__wrapper" {...classNoProps} >
          {gradeName.substr(0, 2)} （
          <span className="class-no__inner">
            <Input placeholder="请填写班级号" />
          </span>
          ）班
        </p>
      </FormItem>
    ) : (
      <FormItem
        {...formItemLayout}
        label="班级名称"
      >
        <Input placeholder="不超过10个字" {...classNameProps} />
      </FormItem>
    );
    return (
      <Modal
        className="create-class__modal"
        title="创建班级"
        width="728"
        confirmLoading={confirmLoading}
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="选择学校"
          >
            <p className="ant-form-text">{schoolName}</p>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="选择年级"
          >
            <Select placeholder="请选择年级" defaultValue={gradeDefault} onChange={this.onChangeGrade}>
              {
                grades.map(item => <Option key={item.value} value={`${item.value}`}>{item.text}</Option>)
              }
            </Select>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="班级命名模式"
          >
            <RadioGroup value={nameType} onChange={this.onChangeType}>
              <Radio value={1}>班级号</Radio>
              <Radio value={2}>自定义</Radio>
            </RadioGroup>
            <p className="create-class__tips">采用班级号模式命名的班级，其班级名称按照学校的标准模式命名，如高一（1）班，高二（2）班等。 采用自定义模式命名的班级，其班级名称由老师自己填写。</p>
          </FormItem>
          {
            typeForm
          }
        </Form>
      </Modal>
    );
  }
}
export default Form.create()(CreateClass);

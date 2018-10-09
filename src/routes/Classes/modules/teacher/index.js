import React from 'react';
import { connect } from 'react-redux';
import api from '~/service/';
import PageTitle from '~/components/PageTitle';
import {
  Tabs,
  Spin,
} from 'antd';
import ClassButton from './button';
import CreateClassModal from './createClass';

import './style.scss';

const { PropTypes, Component } = React;
const TabPane = Tabs.TabPane;
class List extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    dispatch: () => {},
  };

  state={
    grades: [],
    defaultKey: '',
    loading: false,
    salesmanInfo: {},
    createClassVisible: false,
    schoolName: '',
  };

  componentDidMount() {
    this.getSalesmanInfo();
    this.getGrades();
    this.getUserInfo();
  }

  onCreateClass = () => {
    this.setState({
      createClassVisible: true,
    });
  };
  onSubmitCreate = async (param) => {
    const {callback = () => {} } = param;
    try {
      const res = await api.classManageCreateClass(param);
      this.onCancelCreate();
      this.getClasses();
    } catch (error) {
      callback(error);
      return error;
    }
  };
  onCancelCreate = () => {
    this.setState({
      createClassVisible: false,
    });
  };
  getUserInfo() {
    api.classManageGetUserInfo().then((res) => {
      this.setState({
        schoolName: res.schoolname,
      });
    });
  }
  getGrades() {
    return api.classManageGetGrades().then((res) => {
      if (res && res.length > 0) {
        const defaultKey = res[0].value;
        this.setState({
          grades: res,
          defaultKey,
        }, () => {
          this.getClasses();
        });
      }
    });
  }
  getClasses = () => {
    this.setState({
      loading: true,
    });
    const { grades, defaultKey: expireyear } = this.state;
    return api.classManageGetClasses({
      expireyear,
    }).then((res) => {
      const newGrades = grades.map((grade) => {
        if (grade.value === Number(expireyear)) {
          grade = Object.assign({}, grade, {classes: res});
        }
        return grade;
      });
      this.setState({
        grades: newGrades,
        loading: false,
      });
    });
  };
  getSalesmanInfo = () => {
    api.classManageGetSalesmanInfo().then((res) => {
      this.setState({
        salesmanInfo: res,
      });
    });
  };
  tabChange = (key) => {
    this.setState({
      defaultKey: key,
    }, () => {
      this.getClasses();
    });
  };
  render() {
    const {
      grades,
      defaultKey,
      loading,
      salesmanInfo,
      createClassVisible,
      schoolName,
    } = this.state;
    return (
      <div className="class-manage__wrapper">
        <div className="class-manage__header">
          <PageTitle title={'加入班级'} />
          <div className="class-manage__tips">
            <h3>温馨提示：</h3>
            <p>1. 请选择您所教的班级，并且选择您在该班担任的职务（班主任、学科老师）。</p>
            <p>2. 同一个老师在同一个班中可以同时担任 班主任 和 学科老师，因此可以选择多个职务。</p>
            <p>3. 同一个老师可以同时教多个班，因此可以加入多个班。</p>
            <p>4. 同一个老师可以同时教多个年级的班，因此可以加入多个年级的多个班。</p>
            <p>5. 如果在下列班级中找不到自己所教的班级，您可以自己 <a role={'button'} tabIndex={0} className="highlight" onClick={this.onCreateClass}>创建行政班</a> 或者 致电 <span className="highlight">{salesmanInfo.phone}</span> 获取帮助。</p>
          </div>
        </div>
        <Spin spinning={loading}>
          <div className="class-manage__body">
            <div className="pr">
              <Tabs defaultActiveKey={defaultKey} onChange={this.tabChange}>
                {
                  grades.map(grade => (
                    <TabPane tab={grade.text} key={grade.value}>
                      {
                        grade.classes && grade.classes.length > 0 && (
                          grade.classes.map(item => (
                            <ClassButton
                              key={item.classid}
                              data={item}
                              upDate={this.getClasses}
                            />
                          ))
                        )
                      }
                      {
                        (!grade.classes || !grade.classes.length) && (
                          <div className="classes-empty__wrapper">
                            <p className="classes-empty__content">暂无班级</p>
                          </div>
                        )
                      }
                    </TabPane>
                  ))
                }
              </Tabs>
              <p className="class-manage__tips--empty">没有您所教的班级？立即 <a role={'button'} tabIndex={0} className="highlight" onClick={this.onCreateClass}>创建行政班</a> 或 致电 <span className="highlight">{salesmanInfo.phone}</span> 获取帮助</p>
            </div>
          </div>
        </Spin>
        <CreateClassModal
          schoolName={schoolName}
          visible={createClassVisible}
          grades={grades}
          onSubmit={this.onSubmitCreate}
          onCancel={this.onCancelCreate}
        />
      </div>
    );
  }
}
const mapStateToProps = state => ({
  studentApply: state.studentApply,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);


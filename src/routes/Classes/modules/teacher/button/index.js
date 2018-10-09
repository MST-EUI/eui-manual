import React from 'react';
import addEventListener from 'add-dom-event-listener';
import {
  Tooltip,
  Spin,
} from 'antd';
import api from '~/service/';
import {nodeRect, nodeParents, contains, scrollTop} from '~/common/utils/domUtils';
import Button from '~/components/Button';
import Popover from '../popover';
import TeacherButton from './teacher-button';

import './index.scss';

const { Component, PropTypes } = React;
export default class ClassButton extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
    upDate: PropTypes.func,
  };

  static defaultProps = {
    data: {},
    upDate: () => {},
  };

  state = {
    popoverVisible: false,
    popoverPos: {
      top: 0,
      left: 0,
      width: 0,
      arrowLeft: 0,
    },
    teacherRoleList: [],
    checkedList: [],
    loading: false,
  };

  componentDidMount() {
    this.clickOutsideHandler = addEventListener(document,
      'mousedown', this.onDocClick);
  }
  componentWillUnmount() {
    this.clickOutsideHandler.remove();
    this.clickOutsideHandler = null;
  }

  onClickHandle = (id, e) => {
    const wrapper = nodeParents(e.currentTarget, '.pr');
    const { left, width } = nodeRect(wrapper);
    let { top, left: arrowLeft, width: btnWidth } = nodeRect(e.currentTarget);
    top += scrollTop();
    top += 64;
    btnWidth /= 2;
    arrowLeft = ((arrowLeft - left) + btnWidth) - 11;
    this.setState({
      popoverVisible: true,
      popoverPos: {
        top,
        left,
        width,
        arrowLeft,
      },
    });
    this.getTeacherRoleList();
  };

  onDocClick = (event) => {
    const target = event.target;
    const root = this.popNode;
    if (!contains(root, target) && !contains(this.btnNode, target)) {
      this.hidePop();
    }
  };

  onTeacherClick = (rolevalue) => {
    const { teacherRoleList } = this.state;
    const newList = teacherRoleList.map((item) => {
      if (item.rolevalue === rolevalue) {
        item.assumeofficestate = (item.assumeofficestate === 2) ? 1 : 2;
      }
      return item;
    });
    this.setState({
      checkedList: newList,
    });
    this.formatCheckedList();
  };

  getTeacherRoleList() {
    this.setState({
      loading: true,
    });
    const { data: { classid } } = this.props;
    return api.classManageGetTeacherRoleList({
      classid,
    }).then((res) => {
      this.setState({
        teacherRoleList: res,
      });
      this.formatCheckedList();

      this.setState({
        loading: false,
      });
    });
  }

  formatCheckedList() {
    const { teacherRoleList } = this.state;
    const checkedList = [];
    teacherRoleList.forEach((item) => {
      if (item.assumeofficestate === 2) {
        checkedList.push(item.rolevalue);
      }
    });
    this.setState({
      checkedList,
    });
  }

  hidePop = () => {
    this.setState({
      popoverVisible: false,
    });
  };

  updateTeacher = () => {
    const { data: { classid }, upDate } = this.props;
    const { checkedList } = this.state;
    api.classManageGetSubmitJoinClassInfo({
      classid,
      rolevalues: checkedList.join(','),
    }).then(() => {
      this.hidePop();
      upDate();
    });
  };

  render() {
    const { data } = this.props;
    const { popoverVisible, popoverPos, teacherRoleList, loading } = this.state;
    const type = data.roles ? 'primary' : 'outline';
    const content = data.roles ? (
      <span>
        {data.name} <br />
        {data.roles}
      </span>
    ) : (
      <span>
        {data.name}
      </span>
    );
    const tooltipContent = (
      (data.name && data.name.length > 8) || (data.roles && data.roles.length > 8)
    ) ? content : '';
    return (
      <span ref={(r) => { this.btnNode = r; }}>
        <Tooltip title={tooltipContent}>
          <Button
            className="so-big"
            size={'large'}
            type={type}
            onClick={(e) => { this.onClickHandle(data.classid, e); }}
          >
            <span>{data.name}</span>
            {
              data.roles && (
                <span>{data.roles}</span>
              )
            }
          </Button>
        </Tooltip>
        <Popover visible={popoverVisible} option={popoverPos}>
          <Spin spinning={loading}>
            <div ref={(r) => { this.popNode = r; }}>
              <div className="popover__title">请选择您在 {data.name} 担任的职务，可多选。</div>
              {
                teacherRoleList.map(item => (
                  <TeacherButton key={item.rolevalue} data={item} onClick={this.onTeacherClick} />
                ))
              }
              <div className="popover__footer">
                <Button onClick={this.hidePop} type="secondary">{'取消'}</Button>
                <Button onClick={this.updateTeacher} type="primary">{'确定'}</Button>
              </div>
            </div>
          </Spin>
        </Popover>
      </span>
    );
  }
}

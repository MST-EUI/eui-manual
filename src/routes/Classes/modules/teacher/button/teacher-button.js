import React from 'react';
import {
  Tooltip,
} from 'antd';

import './teacher-button.scss';

const { Component, PropTypes } = React;

export default class TeacherButton extends Component {
  static propTypes={
    data: PropTypes.objectOf(PropTypes.any),
    onClick: PropTypes.func,
  };

  static defaultProps={
    data: {},
    onClick: () => {},
  };

  render() {
    const { data, onClick } = this.props;
    let cls = 'teacher-btn';
    switch (data.assumeofficestate) {
      case 3:
        cls += ' teacher-btn--disable';
        break;
      case 2:
        cls += ' teacher-btn--checked';
        break;
      default:
    }
    return (
      data.assumeofficestate === 3 ? (
        <Tooltip title={`已被 ${data.officeteacher} 担任`}>
          <button className={cls}>{data.rolename}</button>
        </Tooltip>
      ) : (
        <button onClick={() => { onClick(data.rolevalue); }} className={cls}>
          {data.rolename}
        </button>
      )
    );
  }
}

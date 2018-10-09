import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './style.scss';

export default class Label extends React.Component {
  static propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    width: PropTypes.number,
    children: PropTypes.node,
  }

  static defaultProps = {
    label: '',
    width: 90,
    children: null,
    required: false,
  }

  render() {
    const { label, width, required, children } = this.props;
    const style = {
      width: `${width}px`,
    };

    return (
      <div className="label-wrapper">
        <span className={classnames('label-name', {required})} style={style}>{label}</span>
        <div className="label-content">
          { children }
        </div>
      </div>
    );
  }
}

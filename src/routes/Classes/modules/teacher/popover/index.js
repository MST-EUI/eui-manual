import React from 'react';
import CreatePortal from '~/components/CreatePortal';

import './index.scss';

const { Component, PropTypes } = React;
export default class Popover extends Component {
  static propTypes = {
    option: PropTypes.objectOf(PropTypes.any),
    children: PropTypes.node,
    onClick: PropTypes.func,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    option: {
      x: 0,
      y: 0,
    },
    children: null,
    onClick: () => {},
    visible: false,
  };

  render() {
    const {option: {left, top, width = 0, arrowLeft}, children, onClick, visible} = this.props;
    const style = {
      position: 'absolute',
      left,
      top,
      width,
    };
    return (
      visible ? (
        <CreatePortal>
          <div tabIndex={-1} role={'button'} className="class-manage__popover" style={style} onBlur={onClick}>
            <div className="class-manage__popover--arrow" style={{ left: arrowLeft}} />
            {children}
          </div>
        </CreatePortal>
      ) : null
    );
  }
}

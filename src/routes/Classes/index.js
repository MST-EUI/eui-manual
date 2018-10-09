import React from 'react';
import './style.scss';

const { Component, PropTypes } = React;

export default class Classes extends Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <div className="right-content-container">{this.props.children}</div>
    );
  }
}

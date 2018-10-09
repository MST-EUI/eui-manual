import React from 'react';
import { connect } from 'react-redux';
import TopNav from '~/containers/TopNav/';
import LeftNav from '~/containers/LeftNav/';
import './style.scss';

const { PropTypes } = React;

class BasicLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    return (
      <div className="page">
        <div className="top-nav-container"><TopNav /></div>
        <div className="content-container">
          <div className="left-nav-container"><LeftNav /></div>
          <div className="sub-page-container">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapDispatchToProps,
)(BasicLayout);

import React from 'react';
import { connect } from 'react-redux';

import TopNav from '~/components/TopNav/';
import i18n from '~/common/i18n';
import Action from '~/actions/actionCreator';

const { PropTypes, Component } = React;

class TopNavContainer extends Component {
  static propTypes = {
    data: PropTypes.objectOf(PropTypes.any),
    dispatch: PropTypes.func,
    userInfo: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    data: {},
    dispatch: () => {},
    userInfo: {},
  };

  constructor(props) {
    super(props);
    this.documentTitleUpdate = false;
    this.state = {
      hasCourseScheduling: false,
    };
  }

  render() {
    const roleToString = 'student';
    return (
      <TopNav role={roleToString} user={{}} />
    );
  }
}

const mapStateToProps = state => ({
  data: state.permission,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopNavContainer);

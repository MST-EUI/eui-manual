import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { hashHistory } from 'react-router';
import Action from '~/actions';
import i18n from '~/common/i18n';

import './style.scss';

const { PropTypes, Component } = React;

class Managment extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    classes: PropTypes.objectOf(PropTypes.any),
    userInfo: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    dispatch: () => {},
    classes: {},
    userInfo: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      queryData: {
        classname: '',
        classtype: '0', // 班级类型;
        expireyear: '0', // 所属年级;
        page: 1,
        pagesize: 15,
      },
      dataEmpty: false,
      createClassModalVisible: false,
      successfulModalVisible: false,
      renameClassModalVisible: false,
      classData: {},
      createdClassId: '',
    };
  }

  render() {
    return (
      <div>
        management
      </div>
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
)(Managment);

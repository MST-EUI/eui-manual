import React from 'react';
import { connect } from 'react-redux';
import Action from '~/actions';
import utils from '~/common/utils';
import i18n from '~/common/i18n';

import PageTitle from '~/components/PageTitle';
import Button from '~/components/Button';

import myClassesPic from '~/common/images/myclass_pic.png';

import './style.scss';

const { PropTypes, Component } = React;

class MyClasses extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    classes: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    dispatch: () => {},
    classes: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Action.receiveMyClassesList());
  }

  toJoinClass = () => {
    utils.routeRedirect('/classes/studentJoinClass');
  }

  render() {
    const { classes: { myClassesList } } = this.props;
    return (
      <div className="class-myclass-wrapper">
        <PageTitle title={i18n('colStudentMyClass')}>
          <Button type="primary" className="joinClass fr" onClick={this.toJoinClass}>{i18n('colStudentMyClassJoinClass')}</Button>
        </PageTitle>
        <div className="class-myclass-body">
          <ul>
            {
              myClassesList.map(item => (
                <li className="class-myclass-item" key={item.classid}>
                  <div className="class-myclass-leftBox">
                    <img src={myClassesPic} alt="" className="class-myclass-pic" />
                  </div>
                  <div className="class-myclass-content">
                    <p className="class-myclass-name">{item.classname}</p>
                    <p className="class-myclass-classTeacher">{i18n('classTeacher')}：{item.teachername ? item.teachername : '-'}</p>
                    {item.status === 1 && <span className="class-myclass-classStatus joined">{i18n('joined')}</span>}
                    {item.status === 2 && <span className="class-myclass-classStatus applying">{i18n('applying')}</span>}
                    {item.status === 3 && <span className="class-myclass-classStatus rejected">{i18n('rejected')}</span>}
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  classes: state.classes,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyClasses);

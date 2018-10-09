import React from 'react';
import classnames from 'classnames';
import i18n from '~/common/i18n';

const { Component, PropTypes } = React;

export default class School extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    school: PropTypes.shape(),
  };

  static defaultProps = {
    visible: false,
    school: null,
  };


  render() {
    const { visible, school } = this.props;
    if (!visible) {
      return null;
    }
    const {
      provincename: provinceName,
      cityname: cityName,
      districtname: districtName,
      schoolname: schoolName,
    } = school;
    return (
      <p className={classnames('school-detail', { 'fn-hide': !visible })}>
        <span className="school-label fn-hide">{i18n('school')}：</span>
        {`${provinceName} / ${cityName} / ${districtName} ${schoolName}`}
      </p>
    );
  }
}

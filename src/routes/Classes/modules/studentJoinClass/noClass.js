import React from 'react';
import classnames from 'classnames';
import i18n from '~/common/i18n/';

const { Component, PropTypes } = React;

export default class NoClass extends Component {
  static propTypes = {
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: false,
  };


  render() {
    const { visible } = this.props;
    return (
      <div className={classnames('no-data', { 'fn-hide': !visible })}>
        <p>{i18n('studentJoinClassNoDataPartOne')}</p>
        <p dangerouslySetInnerHTML={{__html: i18n('studentJoinClassNoDataPartTwo', '<span class="tel">4000-211-985</span>')}} />
      </div>
    );
  }
}

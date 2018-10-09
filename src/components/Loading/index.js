import React from 'react';
import i18n from '~/common/i18n';

import './style.scss';

const { Component, PropTypes } = React;

export default class Loading extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  static defaultProps = {
    text: i18n('loading'),
  };


  render() {
    const { text } = this.props;
    return (
      <div className="component-loading">
        {text}
      </div>
    );
  }
}

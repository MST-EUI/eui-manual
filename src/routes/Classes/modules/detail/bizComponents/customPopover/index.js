import React from 'react';
import Utils from '~/common/utils';

import './style.scss';

const { PropTypes, Component } = React;

export default class CustomPopover extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any),
  };

  static defaultProps = {
    onClick: () => {},
    data: [], // item format { text: '', value: '', render: (item) => {} }
  };

  render() {
    const { data, onClick } = this.props;
    const items = data.map((item) => {
      let innerContent = null;
      if (item.render) {
        innerContent = item.render(item);
      } else {
        innerContent = item.text;
      }
      return (
        <li className="menu-li" key={Utils.generateKeyForReact(item.value)}>
          <div role="button" tabIndex="0" onClick={() => { onClick(item); }} className="button-area">{innerContent}</div>
        </li>
      );
    });
    return (
      <div className="class-detail-custom-popover">
        <ul className="menu-ul">
          {items}
        </ul>
      </div>
    );
  }
}

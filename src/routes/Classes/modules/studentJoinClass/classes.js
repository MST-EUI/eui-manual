import React from 'react';

const { Component, PropTypes } = React;

export default class Classes extends Component {
  static propTypes = {
    classes: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    classes: [],
  };


  render() {
    const { classes, onClick } = this.props;
    return (
      <ul className="class-ul">
        {
          classes.map(item =>
            (<li
              className="class-li"
              title={item.classname}
              key={item.classid}
            >
              <div
                role="button"
                tabIndex="0"
                onClick={() => {
                  onClick(item);
                }}
              >
                {item.classname}
              </div>
            </li>))
        }
      </ul>
    );
  }
}

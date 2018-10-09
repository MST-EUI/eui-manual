import React from 'react';
import classnames from 'classnames';
import i18n from '~/common/i18n';
import Button from '~/components/Button';
import './style.scss';

const { PropTypes, Component } = React;

export default class DetailEmpty extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    type: PropTypes.string,
  };

  static defaultProps = {
    onClick: () => {},
    type: 'subjectClass',
  };

  render() {
    const { type: renderType, onClick } = this.props;
    const isSubjectClass = renderType === 'subjectClass';
    const text = isSubjectClass ? i18n('clsSubjectClassEmptyDescription') : i18n('clsNormalClassEmptyDescription');
    return (
      <div className="class-detail-empty">
        <p className="description">{text}</p>
        <div className={classnames('add-btn', { 'fn-hide': !isSubjectClass })}>
          <Button onClick={onClick} type="primary">{i18n('clsAddStudentNow')}</Button>
        </div>
      </div>
    );
  }
}

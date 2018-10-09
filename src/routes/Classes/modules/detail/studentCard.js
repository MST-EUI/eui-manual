import React from 'react';
import classnames from 'classnames';
import i18n from '~/common/i18n';
import CustomPopover from './bizComponents/customPopover';

const { PropTypes, Component } = React;

export default class StudentCard extends Component {
  static propTypes = {
    onDelete: PropTypes.func,
    canRemove: PropTypes.bool,
  };

  static defaultProps = {
    onDelete: () => {},
    canRemove: true,
  };

  render() {
    const self = this;
    const {
      onDelete,
      canRemove,
      data: student,
    } = self.props;
    const {
      name,
      headimage: avatar,
      cousetime: coursePlayTime,
      answerquestioncount: subjectAnwserNum,
      fmtime: FMTime,
      soulboardcount: soulBoardReadingCount,
    } = student;
    return (
      <div className="student-item">
        <div className={classnames('delete-student-block', { 'fn-hide': !canRemove })}>
          <i className="icon iconfont icon-more-horizental more-action" />
          <div className="student-action"><CustomPopover onClick={() => { onDelete(student); }} data={[{ text: i18n('clsDeleteStudent'), value: '1' }]} /></div>
        </div>
        <div className="avatar">
          <div className="avatar-block">
            <img src={avatar} className="img" alt="" />
          </div>
          <p className="name">{name}</p>
        </div>
        <div className="others-info">
          <div className="info-item">
            <span className="label">{i18n('clsSubjectVideoPlayDufation')}</span>
            <span className="value">
              <span className="color-orange">{coursePlayTime}</span>
              <span className="unit">{i18n('minute')}</span>
            </span>
          </div>
          <div className="info-item">
            <span className="label">{i18n('clsSubjectAnwserQuestion')}</span>
            <span className="value">
              <span className="color-orange">{subjectAnwserNum}</span>
              <span className="unit">{i18n('individual')}</span>
            </span>
          </div>
          <div className="info-item">
            <span className="label">{i18n('clsFMPlayDufation')}</span>
            <span className="value">
              <span className="color-orange">{FMTime}</span>
              <span className="unit">{i18n('minute')}</span>
            </span>
          </div>
          <div className="info-item">
            <span className="label">{i18n('clsSoulPlateReading')}</span>
            <span className="value">
              <span className="color-orange">{soulBoardReadingCount}</span>
              <span className="unit">{i18n('piece')}</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

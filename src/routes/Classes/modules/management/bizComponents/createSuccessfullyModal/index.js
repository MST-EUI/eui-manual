import React from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Modal } from 'antd';

import i18n from '~/common/i18n';

import './style.scss';

export default class CreateSuccessfullyModal extends React.Component {
  static propTypes = {
    classId: PropTypes.string,
    visible: PropTypes.bool,
    onCancel: PropTypes.func,
  }

  static defaultProps = {
    classId: '',
    visible: false,
    onCancel: () => {},
  }

  redirectToClassDetail = () => {
    const { classId } = this.props;
    hashHistory.push(`/classes/detail/${Number(classId)}/1`);
  }

  render() {
    const { visible, onCancel } = this.props;
    const dialogConfig = {
      width: 360,
      maskClosable: false,
      wrapClassName: 'create-successfully-modal-wrapper',
      closable: false,
      okText: i18n('clsAddStudent'),
      cancelText: i18n('close'),
      visible,
      onCancel,
      onOk: this.redirectToClassDetail,
    };

    return (
      <Modal {...dialogConfig}>
        <div className="create-successfully-modal-body">
          <div className="success-icon">
            <span className="iconfont icon-circle-right" />
          </div>
          <p className="successful-modal-title">{i18n('createClassSuccessfully')}</p>
          <p className="successful-modal-prompt">{i18n('cmYouCanAddStudentsToClass')}</p>
        </div>
      </Modal>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Input } from 'antd';
import Action from '~/actions';

import i18n from '~/common/i18n';
import Label from '~/routes/Classes/modules/components/Label';

import './style.scss';

export default class RenameClassModal extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    data: PropTypes.objectOf(PropTypes.any),
    dispatch: PropTypes.func,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
  }

  static defaultProps = {
    visible: false,
    data: {},
    dispatch: () => {},
    onCancel: () => {},
    onConfirm: () => {},
  }

  constructor(props) {
    super(props);
    this.state = {
      classname: '',
      noClassNumPrompt: false,
      noClassNamePrompt: false,
      classNameErrorPrompt: '',
    };
  }

  classnameOnchange = (e) => {
    const classname = e.target.value;

    this.setState({
      classname,
      noClassNumPrompt: false,
      noClassNamePrompt: false,
      classNameErrorPrompt: '',
    });
  }

  checkClassname = (classnameType, className) => {
    if (!className && classnameType === 1) {
      this.setState({ noClassNumPrompt: true });

      return false;
    } else if (classnameType === 2
      && (!className || className.length > 10)) {
      this.setState({ noClassNamePrompt: true });

      return false;
    }

    return true;
  }

  renameClass = () => {
    const { classname } = this.state;
    const { data, onConfirm, dispatch } = this.props;
    const pData = {
      classid: data.classid,
      classnametype: data.classnametype,
      classname,
    };
    const _this = this;

    if (this.checkClassname(data.classnametype, classname)) {
      const promise = dispatch(Action.updateClassname(pData));

      promise.then((res) => {
        if (Object.prototype.hasOwnProperty.call(res, 'data')) {
          _this.setState({
            classNameErrorPrompt: res.msg,
          });
        } else {
          onConfirm();
        }
      });
    }
  }

  render() {
    const { visible, onCancel, data } = this.props;
    const { classname, noClassNumPrompt, noClassNamePrompt, classNameErrorPrompt } = this.state;
    const dialogConfig = {
      width: 528,
      title: i18n('modifyClassName'),
      maskClosable: false,
      wrapClassName: 'rename-class-modal-wrapper',
      visible,
      onCancel,
      onOk: this.renameClass,
    };

    return (
      <Modal {...dialogConfig}>
        <div className="rename-class-body-wrapper">
          <Label label={i18n('belongSchool')}>
            <p className="content">{data.schoolName}</p>
            <p className="content-prompt">
              {i18n('cmErrorSchoolPrompt')}
              <span className="phone-num">4000211985</span>
            </p>
          </Label>
          <Label label={i18n('belongGrade')}>
            <p className="content">{data.belonggrade}</p>
          </Label>
          {
            data.classtype === 2 ?
              <Label label={i18n('subject')}>
                <p className="content">{data.subjectname}</p>
              </Label> : null
          }
          {
            data.classnametype === 1 ?
              <Label label={i18n('classname')}>
                <div className="content">
                  {data.classprefix}（
                  <div className="class-no-input">
                    <Input placeholder={i18n('pleaseInputClassNo')} size="large" onChange={this.classnameOnchange} />
                  </div>
                  ）班{data.entranceyear}
                  { noClassNumPrompt ? <p className="error-prompt">{i18n('cmPleaseInputClassNo')}</p> : null }
                  { classNameErrorPrompt ? <p className="error-prompt">{classNameErrorPrompt}</p> : null }
                </div>
              </Label>
              :
              <Label label={i18n('classname')}>
                <div className="content">
                  <div className="classname-input">
                    <Input placeholder={i18n('cannotBeMoreThenTenWorlds')} size="large" onChange={this.classnameOnchange} />
                  </div>
                  {data.entranceyear}
                </div>
                <p className="content-prompt">{i18n('cmRenameClassPrompt')}</p>
                {
                  classname.length === 0 && noClassNamePrompt ?
                    <p className="error-prompt">{i18n('cmPleaseInputClassName')}</p>
                    : null
                }
                {
                  classname.length > 10 && noClassNamePrompt ?
                    <p className="error-prompt">{i18n('cmNoMoreThanTenWords')}</p>
                    : null
                }
                { classNameErrorPrompt ? <p className="error-prompt">{classNameErrorPrompt}</p> : null }
              </Label>
          }
        </div>
      </Modal>
    );
  }
}

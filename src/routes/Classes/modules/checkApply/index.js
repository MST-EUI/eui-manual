import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import api from '~/service/';
import i18n from '~/common/i18n';
import Action from '~/actions';
import PageTitle from '~/components/PageTitle';
import Button from '~/components/Button';
import {
  Table,
  Select,
  Modal,
  message,
} from 'antd';

import './style.scss';

const { PropTypes, Component } = React;
const Option = Select.Option;
const confirm = Modal.confirm;


function ConfirmContent({children, isAll}) {
  let exText = '该';
  if (isAll) {
    exText = '这些';
  }
  return (
    <div className="confirm-content">
      确定 <span className="highlight">{children}</span> {exText}申请吗？
    </div>
  );
}
ConfirmContent.propTypes = {
  children: PropTypes.node.isRequired,
  isAll: PropTypes.bool,
};
ConfirmContent.defaultProps = {
  isAll: false,
};

class Check extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    studentApply: PropTypes.objectOf(PropTypes.any),
  };

  static defaultProps = {
    dispatch: () => {},
    studentApply: {
      statusOptions: [],
      recordList: { recordcount: 0, list: [] },
    },
  };

  state = {
    selectedRowKeys: [],
    status: '',
    page: 1,
    pagesize: 10,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(Action.studentApplyGetStatusOptions());
    this.onLoadData();
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };
  onChangeStatus = (value) => {
    this.setState({
      status: value,
    }, () => {
      this.onLoadData();
    });
  };
  onLoadData = () => {
    const { dispatch } = this.props;
    const { page, pagesize, status } = this.state;
    this.setState({
      selectedRowKeys: [],
    });
    dispatch(Action.studentApplyGetData({
      status,
      page,
      pagesize,
    }));
  };
  onPageChange = (page) => {
    this.setState({
      page,
    }, () => {
      this.onLoadData();
    });
  };
  onReject = (id) => {
    const { dispatch } = this.props;
    confirm({
      title: '提示',
      content: <ConfirmContent>驳回</ConfirmContent>,
      iconType: 'none',
      onOk() {
        api.studentApplyPostReject({id}).then(() => {
          dispatch(Action.studentApplyGetData());
        });
      },
      onCancel() {},
    });
  };
  onResolve = (id) => {
    const { dispatch } = this.props;
    confirm({
      title: '提示',
      content: <ConfirmContent>通过</ConfirmContent>,
      iconType: 'none',
      onOk() {
        api.studentApplyPostResolve({id}).then(() => {
          dispatch(Action.studentApplyGetData());
        });
      },
      onCancel() {},
    });
  };
  onRejectArr = () => {
    const { dispatch } = this.props;
    const { selectedRowKeys } = this.state;
    const ids = selectedRowKeys;
    if (ids.length <= 0) {
      message.error('请至少选择一条申请');
      return;
    }
    confirm({
      title: '提示',
      content: <ConfirmContent isAll>驳回</ConfirmContent>,
      iconType: 'none',
      onOk: () => {
        api.studentApplyPostRejectBatch({ids}).then(() => {
          dispatch(Action.studentApplyGetData());
        });
        this.setState({
          selectedRowKeys: [],
        });
      },
      onCancel() {},
    });
  };
  onResolveArr = () => {
    const { dispatch } = this.props;
    const { selectedRowKeys } = this.state;
    const ids = selectedRowKeys;
    if (ids.length <= 0) {
      message.error('请至少选择一条申请');
      return;
    }
    confirm({
      title: '提示',
      content: <ConfirmContent isAll>通过</ConfirmContent>,
      iconType: 'none',
      onOk: () => {
        api.studentApplyPostResolveBatch({ids}).then(() => {
          dispatch(Action.studentApplyGetData());
        });
        this.setState({
          selectedRowKeys: [],
        });
      },
      onCancel() {},
    });
  };
  render() {
    const operator = (text, record) => {
      let node = '';
      switch (text) {
        case 0:
          node = (
            <span>
              <a className="opa-btn" tabIndex={record.ID} role={'button'} onClick={() => { this.onReject(record.ID); }}>驳回</a>
              <span className="ant-divider" />
              <a className="opa-btn" tabIndex={record.ID} role={'button'} onClick={() => { this.onResolve(record.ID); }}>通过</a>
            </span>
          );
          break;
        case 1:
          node = (
            <span className="status-span green">
              已通过
            </span>
          );
          break;
        case 2:
          node = (
            <span className="status-span gray">
              已驳回
            </span>
          );
          break;
        case 3:
          node = (
            <span className="status-span gray">
              无效申请
            </span>
          );
          break;
        default:
          node = '';
      }
      return node;
    };
    const columns = [{
      title: '申请人',
      dataIndex: 'RealName',
    }, {
      title: '班级名称',
      dataIndex: 'Title',
    }, {
      title: '验证信息',
      dataIndex: 'Message',
    }, {
      title: '申请时间',
      dataIndex: 'ApplyDate',
      render: text => moment(text).format('YYYY-MM-DD HH:mm'),
    }, {
      title: '状态',
      dataIndex: 'StatusCode',
      render: operator,
    }];
    const { selectedRowKeys } = this.state;
    const { studentApply: { statusOptions, recordList: {recordcount, list} } } = this.props;
    const { onPageChange } = this;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.StatusCode !== 0,
      }),
    };
    const pagination = {
      total: recordcount,
      onChange(current) {
        onPageChange(current);
      },
    };
    return (
      <div className="check-detail">
        <div className="check-container">
          <div className="check-header">
            <PageTitle title={'学生申请'} />
          </div>
          <div className="check-data">
            <div className="check-filter">
              <span className="sort-label">{'状态'}：</span>
              <Select defaultValue="" style={{width: 230}} size="large" onChange={this.onChangeStatus}>
                <Option value="">{'全部'}</Option>
                {
                  statusOptions.map(item => <Option key={item.key} value={`${item.key}`}>{item.value}</Option>)
                }
              </Select>
              <span className="btn-group">
                <Button onClick={this.onRejectArr} type="secondary">{'批量驳回'}</Button>
                <Button onClick={this.onResolveArr} type="primary">{'批量通过'}</Button>
              </span>
            </div>
            <div className="check-content">
              <p className="total">{i18n('total')}&nbsp;<span className="color-orange">{recordcount}</span>&nbsp;个申请</p>
              <Table
                rowKey="ID"
                bordered
                rowSelection={rowSelection}
                columns={columns}
                dataSource={list}
                pagination={pagination}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  studentApply: state.studentApply,
});
const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Check);


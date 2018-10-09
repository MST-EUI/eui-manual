import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import i18n from '~/common/i18n';
// import Action from '~/actions';
import Loading from '~/components/Loading';
import EmptyData from '~/components/EmptyData';
import utils from '~/common/utils';

const { PropTypes, Component } = React;
const studentMessageTimeFormat = (millisecond) => {
  const num = Number(millisecond);
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const ONE_DAY_TIME = 24 * 60 * 60 * 1000;
  const todayBegin = new Date(year, month, day, 0, 0, 0, 0).getTime();
  const todayEnd = new Date(year, month, day, 23, 59, 59, 0).getTime();
  const isToday = num >= todayBegin && num <= todayEnd;
  const isYesterday = num >= (todayBegin - ONE_DAY_TIME) &&
  num <= (todayEnd - ONE_DAY_TIME);
  const isCurrentYear = new Date(num).getFullYear() === year;
  if (isToday) {
    return `${i18n('today')} ${moment(num).format('HH:mm')}`;
  } else if (isYesterday) {
    return `${i18n('yesterday')} ${moment(num).format('HH:mm')}`;
  } else if (isCurrentYear) {
    return `${moment(num).format('MM-DD HH:mm')}`;
  }
  return moment(num).format('YYYY年MM月DD日 HH:mm');
};

class studentState extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    data: PropTypes.arrayOf(PropTypes.any),
    loading: PropTypes.bool,
  };

  static defaultProps = {
    dispatch: () => {},
    data: [],
    loading: true,
  };

  componentDidMount() {
    // temporary plan
    // const {
    //   dispatch,
    // } = this.props;
    // dispatch(Action.overviewQueryStudentDynamicMessages());
  }

  render() {
    const {
      loading,
      data,
    } = this.props;
    let liEles = null; // temporary plan
    if (loading) {
      liEles = <Loading />;
    } else {
      liEles = data.map((item) => {
        const {
          studentid: studentId,
          studentname: studentName,
          title,
          time,
        } = item;
        return (
          <li className="state-li" key={studentId}>
            <span className="avatar"><img src={utils.avatar(studentId)} alt="" /></span>
            <span className="detail-info">
              <p>
                <span className="user-name" title={studentName}>{studentName}</span>
                <span className="play">{i18n('ovvwPlay')}</span>
                <span className="video-title" title={title}>{title}</span>
              </p>
              <p className="time">{studentMessageTimeFormat(time)}</p>
            </span>
          </li>
        );
      });
      if (data.length === 0) {
        liEles = <EmptyData />;
      }
    }
    return (
      <div className="student-dynamic-state">
        <div className="title">
          <span className="text">{i18n('ovvwStudentDynamicState')}</span>
        </div>
        <div className="student-state-list">
          <ul className="state-ul">
            <EmptyData text={i18n('waitForSurprise')} />
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.overview.studentDynamicMessages,
  loading: state.overview.studentDynamicMessagesLoading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(studentState);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import i18n from '~/common/i18n';
import Action from '~/actions';
import Loading from '~/components/Loading';
import HomeworkItem from '~/components/HomeworkItem';
import EmptyData from '~/components/EmptyData';

const { PropTypes, Component } = React;

class newestHomework extends Component {
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
    const {
      dispatch,
    } = this.props;
    dispatch(Action.overviewQueryStudentLatestHomework());
  }

  render() {
    const {
      loading,
      data,
    } = this.props;
    let liEles = null;
    if (loading) {
      liEles = <Loading />;
    } else {
      liEles = data.map(item => <HomeworkItem preview key={item.homeworkid} item={item} />);
      if (data.length === 0) {
        liEles = <EmptyData />;
      }
    }
    return (
      <div className="newest-homework">
        <div className="bg-container">
          <div className="title">
            <span className="text">{i18n('ovvwNewestHomework')}</span>
            <Link className="more" to="/homework/record">{i18n('more')}</Link>
          </div>
          <div className="newest-homework-list">
            {liEles}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.overview.studentLatestHomework,
  loading: state.overview.studentLatestHomeworkLoading,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(newestHomework);

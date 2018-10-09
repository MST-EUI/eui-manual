import assign from 'object-assign';
import {
  OVERVIEW_RECEIVE_STUDENT_DYNAMIC_MESSAGE,
  OVERVIEW_RECEIVE_STUDENT_LATEST_HOMEWORK,
  OVERVIEW_RECEIVE_PSYCHOLOGICAL_REPORT_COUNT,
  OVERVIEW_RECEIVE_STUDENT_APPLY_COUNT,
} from '~/actions/actionTypes';

const updateObject = (oldObject, newValue) => assign({}, oldObject, newValue);

const receiveStudentDynamicMessages = (state, action) => {
  const { data: res } = action.payload;
  return updateObject(state, {
    studentDynamicMessages: res,
    studentDynamicMessagesLoading: false,
  });
};

const receiveStudentLatestHomework = (state, action) => {
  const { data: res } = action.payload;
  return updateObject(state, {
    studentLatestHomework: res,
    studentLatestHomeworkLoading: false,
  });
};

const getInitState = () => ({
  studentDynamicMessages: [],
  studentDynamicMessagesLoading: true,
  studentLatestHomework: [],
  studentLatestHomeworkLoading: true,
  applyCount: null,
  psychologicalReportCount: null,
});

export default (state = getInitState(), action) => {
  const { type } = action;
  switch (type) {
    case OVERVIEW_RECEIVE_STUDENT_DYNAMIC_MESSAGE:
      return receiveStudentDynamicMessages(state, action);
    case OVERVIEW_RECEIVE_STUDENT_LATEST_HOMEWORK:
      return receiveStudentLatestHomework(state, action);
    case OVERVIEW_RECEIVE_PSYCHOLOGICAL_REPORT_COUNT:
      return updateObject(state, {
        psychologicalReportCount: action.payload.data,
      });
    case OVERVIEW_RECEIVE_STUDENT_APPLY_COUNT:
      return updateObject(state, {
        applyCount: action.payload.data,
      });
    default:
  }
  return state;
};

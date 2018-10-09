import assign from 'object-assign';
import {
  RECEIVE_TEACHER_INFO,
  RECEIVE_STUDENT_INFO,
} from '~/actions/actionTypes';

const getInitState = () => ({
  teacherInfo: {},
  studentInfo: {},
  loading: true,
});

export default (state = getInitState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case RECEIVE_TEACHER_INFO:
      return assign({}, state, payload, {
        loading: false,
      });
    case RECEIVE_STUDENT_INFO:
      return assign({}, state, {
        studentInfo: payload.data,
        loading: false,
      });
    default:
      return state;
  }
};

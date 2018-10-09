import assign from 'object-assign';

import {
  SHD_RECEIVE_VIDEO_HOMEWORK_DETAIL_INFO,
  SHD_GET_CLASS_STUDENT_LIST,
  SHD_RECEIVE_CLASS_STUDENT_LIST,
  SHD_RECEIVE_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND,
  SHD_RECEIVE_CLASS_LIST,
  SHD_GET_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST,
  SHD_RECEIVE_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST,
  SHD_CLEAR_STUDENT_VIDEO_HOMEWORK_DIALOG_DATA,
  SHD_RECEIVE_NON_PARTICIPANTS,
  SHD_RECEIVE_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND,
  SHD_SET_STUDENT_VIDEO_HOMEWORK_DATA_EMPTY,
  SHD_RECEIVE_EXERCISE_KNOWLEDGE_ERROR_RATE,
  SHD_RECEIVE_CLASS_VIDEO_HOMEWORK_PLAY_SITUATION,
  SHD_RECEIVE_QUESTION_ANSWER_CONDITION,
  SHD_UPDATE_VIDEO_HOMEWORK_PLAY_DETAIL_STATUS,
  SHD_RECEIVE_VIDEO_HOMEWORK_PLAY_DETAIL_DATA,
  SHD_UPDATE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA_STATUS,
  SHD_RECEIVE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA,
  SHD_RECEIVE_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE,
  SHD_RECEIVE_EXERCISE_MORE_ERROR_STUDENTS,
  SBHD_RECEIVE_VIDEO_DETAIL_CLASS_COMPLETION,
} from '~/actions/actionTypes';

const updateObject = (oldObject, newValue) => assign({}, oldObject, newValue);

const updateClassStudentsStatus = (state, action) => {
  const { payload } = action;
  const { currentStudent } = payload;
  return updateObject(state, {
    currentStudent,
    students: [],
    studentsLoading: true,
  });
};

const receiveClassStudentsList = (state, action) => {
  const { payload } = action;
  const { data } = payload;
  return updateObject(state, {
    students: data,
    studentsLoading: false,
    studentVideoHomeworkCurrentStudentId: data && data[0] && data[0].studentuserid,
  });
};

const updateVideoHomeworkListStatus = state => updateObject(state, {
  studentVideoHomeworkList: [],
  studentVideoHomeworkLoading: true,
});

const receiveStudentVideoHomeworkList = (state, action) => {
  const { payload } = action;
  const { data } = payload;
  return updateObject(state, {
    studentVideoHomeworkList: data,
    studentVideoHomeworkLoading: false,
  });
};

const clearStudentVideoHomeworkData = state => updateObject(state, {
  students: [],
  studentsLoading: true,
  studentVideoHomeworkList: [],
  studentVideoHomeworkLoading: true,
  studentVideoHomeworkCurrentStudentId: null,
});

const setStudentVideoHomeworkDataEmpty = state => updateObject(state, {
  studentVideoHomeworkList: [],
  studentVideoHomeworkLoading: false,
  studentVideoHomeworkCurrentStudentId: null,
});

const receiveVideoHomeworkPlaySituation = (state, action) => {
  const { data, totalcount: totalCount, totalvideoseconds: totalDuration } = action.payload.data;
  return updateObject(state, {
    videoHomeworkPlaySituation: {
      loading: false,
      videoList: data,
      totalCount,
      totalDuration,
    },
  });
};

const updateVideoHomeworkItemPlayDetailStatus = state => updateObject(state, {
  videoHomeworkItemPlayDetail: {
    loading: true,
  },
});

const receiveVideoHomeworkItemPlayDetailData = (state, action) => {
  const { data } = action.payload;
  const { data: detailList, totalcount: totalCount } = data;
  return updateObject(state, {
    videoHomeworkItemPlayDetail: {
      loading: false,
      data: detailList,
      totalCount,
    },
  });
};

const updateExerciseHomeworkClassStudentFinishedStatus = state => updateObject(state, {
  excerciseHomeworkClassStudentFinishedData: {
    loading: true,
  },
});

const receiveExerciseHomeworkClassStudentFinishedStatus = (state, action) => {
  const { data } = action.payload;
  const { data: detailList, totalcount: totalCount } = data;
  return updateObject(state, {
    excerciseHomeworkClassStudentFinishedData: {
      loading: false,
      data: detailList,
      totalCount,
    },
  });
};

const receiveExerciseCurQuestionIdAndVisible = (state, action) => {
  const data = action.payload;

  return updateObject(state, {
    errorStudents: {
      questionId: data.questionId,
      visible: data.visible,
      students: state.errorStudents.students,
    },
  });
};

const receiveExerciseMoreErrorStudents = (state, action) => {
  const { students } = action.payload;

  return updateObject(state, {
    errorStudents: {
      questionId: state.errorStudents.questionId,
      visible: state.errorStudents.visible,
      students,
    },
  });
};

const getInitState = () => ({
  students: [],
  studentsLoading: true,
  currentClass: {},
  studentVideoHomeworkList: [],
  studentVideoHomeworkLoading: true,
  classFininshCond: {
    loading: true,
    data: [],
    totalCount: 0,
  },
  nonParticipants: {
    loading: true,
    data: [],
    totalCount: 0,
  },
  videoHomeworkPlaySituation: {
    loading: true,
    videoList: [],
    totalCount: null,
    totalDuration: null,
  },
  questionAnswerCond: [],
  videoHomeworkItemPlayDetail: {
    loading: true,
    data: [],
    totalCount: null,
  },
  excerciseHomeworkClassStudentFinishedData: {
    loading: true,
    data: [],
    totalCount: null,
  },
  errorStudents: {
    questionId: null,
    visible: false,
    students: {
      loading: true,
      data: [],
      totalCount: 0,
    },
  },
});

const homeworkDetail = (state = getInitState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case SHD_RECEIVE_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE:
      return receiveExerciseCurQuestionIdAndVisible(state, action);
    case SHD_UPDATE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA_STATUS:
      return updateExerciseHomeworkClassStudentFinishedStatus(state, action);
    case SHD_RECEIVE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA:
      return receiveExerciseHomeworkClassStudentFinishedStatus(state, action);
    case SHD_UPDATE_VIDEO_HOMEWORK_PLAY_DETAIL_STATUS:
      return updateVideoHomeworkItemPlayDetailStatus(state, action);
    case SHD_RECEIVE_VIDEO_HOMEWORK_PLAY_DETAIL_DATA:
      return receiveVideoHomeworkItemPlayDetailData(state, action);
    case SHD_RECEIVE_CLASS_VIDEO_HOMEWORK_PLAY_SITUATION:
      return receiveVideoHomeworkPlaySituation(state, action);
    case SHD_RECEIVE_VIDEO_HOMEWORK_DETAIL_INFO:
    case SHD_RECEIVE_CLASS_LIST:
    case SHD_RECEIVE_EXERCISE_KNOWLEDGE_ERROR_RATE:
    case SHD_RECEIVE_QUESTION_ANSWER_CONDITION:
      return updateObject(state, payload);
    case SHD_RECEIVE_EXERCISE_MORE_ERROR_STUDENTS:
      return receiveExerciseMoreErrorStudents(state, action);
    case SHD_GET_CLASS_STUDENT_LIST:
      return updateClassStudentsStatus(state, action);
    case SHD_RECEIVE_CLASS_STUDENT_LIST:
      return receiveClassStudentsList(state, action);
    case SHD_RECEIVE_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND:
    case SHD_RECEIVE_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND:
    case SBHD_RECEIVE_VIDEO_DETAIL_CLASS_COMPLETION:
      return updateObject(state, {
        classFininshCond: {
          loading: false,
          data: payload.data,
          totalCount: payload.totalcount,
        },
      });
    case SHD_GET_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST:
      return updateVideoHomeworkListStatus(state, action);
    case SHD_RECEIVE_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST:
      return receiveStudentVideoHomeworkList(state, action);
    case SHD_CLEAR_STUDENT_VIDEO_HOMEWORK_DIALOG_DATA:
      return clearStudentVideoHomeworkData(state, action);
    case SHD_SET_STUDENT_VIDEO_HOMEWORK_DATA_EMPTY:
      return setStudentVideoHomeworkDataEmpty(state, action);
    case SHD_RECEIVE_NON_PARTICIPANTS:
      return updateObject(state, {
        nonParticipants: {
          loading: false,
          data: payload.data,
          totalCount: payload.totalcount,
        },
      });
    default:
      return state;
  }
};

export default homeworkDetail;

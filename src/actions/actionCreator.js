import api from '~/service/';
import assign from 'object-assign';
import {
  STUDENT_JOIN_CLASS_DIALOG_TOGGLE,
  STUDENT_JOIN_CLASS_TEACHER_NAME_VALID,
  STUDENT_JOIN_CLASS_STUDENT_SELF_NAME_VALID,
  REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES,
  RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES,
  REQUEST_SCHOOL_LIST_BY_NAME,
  RECEIVE_SCHOOL_LIST_BY_NAME,
  UPDATE_SEARCH_SCHOOL_OBJECT,
  RECEIVE_SEARCH_SCHOOL_CLASSES,
  SCHOOL_SEARCH_INPUT_OUTLINE_VISIBLE,
  HIDE_SEARCH_SCHOOL_RESULT_BLOCK,

  // SSP - Summer Study Plan Actions,
  SSP_GET_SCHOOL_INFO,
  SSP_RECEIVE_SCHOOL_INFO,
  SSP_GET_TOP_THREE_BLOCK_DATA,
  SSP_RECEIVE_TOP_THREE_BLOCK_DATA,
  SSP_GET_SUBJECTS_COURSES_SELECT_DATA,
  SSP_RECEIVE_SUBJECTS_COURSES_SELECT_DATA,
  SSP_RECEIVE_STANDARD_PLAN_STUDENT_NUM,
  SSP_RECEIVE_STANDARD_PLAN_KNOWLEDGE_MODULE_STUDENT_NUM,
  SSP_GET_CAREER_SOUL_ENCOURAGEMENT_DATA,
  SSP_RECEIVE_CAREER_SOUL_ENCOURAGEMENT_DATA,
  SSP_GET_KNOWLEDGE_ERROR_RATE,
  SSP_RECEIVE_KNOWLEDGE_ERROR_RATE,
  SSP_CHANGE_STANDARD_PLAN_CURRENT_SUBJECT,
  SSP_GET_EXCLUSIVE_TWO_BLOCK_DATA,
  SSP_RECEIVE_EXCLUSIVE_TWO_BLOCK_DATA,
  SSP_GET_BACK_TEST_KNOWLEDGE_ERROR_RATE,
  SSP_RECEIVE_BACK_TEST_KNOWLEDGE_ERROR_RATE,
  SSP_CHANGE_BACK_TEST_KNOWLEDGE_ERROR_RATE_SUBJECT,
  SSP_GET_BACK_TEST_KNOWLEDGE_CORRECT_RATE,
  SSP_RECEIVE_BACK_TEST_KNOWLEDGE_CORRECT_RATE,
  SSP_CHANGE_BACK_TEST_KNOWLEDGE_CORRECT_RATE_SUBJECT,
  SSP_CHANGE_SUBJECTS_HOMEWORK_ERROR_RATIO_CURRENT_SUBJECT,
  SSP_GET_FRONT_AND_BACK_TEST_TRANSCRIPT,
  SSP_RECEIVE_FRONT_AND_BACK_TEST_TRANSCRIPT,
  SSP_GET_STUDENTS_HOMEWORK_COMPLETION,
  SSP_RECEIVE_STUDENTS_HOMEWORK_COMPLETION,
  SSP_RECEIVE_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL,
  SSP_GET_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL,
  SSP_GET_SUMMER_PLAN_STUDENT_REPORT_CARD,
  SSP_RECEIVE_SUMMER_PLAN_STUDENT_REPORT_CARD,

  // SHD - subject homework detail
  SHD_GET_VIDEO_HOMEWORK_DETAIL_INFO,
  SHD_RECEIVE_VIDEO_HOMEWORK_DETAIL_INFO,
  SHD_GET_CLASS_STUDENT_LIST,
  SHD_RECEIVE_CLASS_STUDENT_LIST,
  SHD_GET_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND,
  SHD_RECEIVE_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND,
  SHD_GET_CLASS_LIST,
  SHD_RECEIVE_CLASS_LIST,
  SHD_GET_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST,
  SHD_RECEIVE_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST,
  SHD_CLEAR_STUDENT_VIDEO_HOMEWORK_DIALOG_DATA,
  SHD_GET_NON_PARTICIPANTS,
  SHD_RECEIVE_NON_PARTICIPANTS,
  RECEIVE_PERMISSION,
  HVT_SELECT_DATA,
  HVT_BASKET_DATA,
  SHD_GET_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND,
  SHD_RECEIVE_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND,
  LEFT_MENUS_SWITCH,
  SHD_SET_STUDENT_VIDEO_HOMEWORK_DATA_EMPTY,
  SHD_GET_EXERCISE_KNOWLEDGE_ERROR_RATE,
  SHD_RECEIVE_EXERCISE_KNOWLEDGE_ERROR_RATE,
  SHD_RECEIVE_CLASS_VIDEO_HOMEWORK_PLAY_SITUATION,
  SHD_GET_QUESTION_ANSWER_CONDITION,
  SHD_RECEIVE_QUESTION_ANSWER_CONDITION,
  SHD_UPDATE_VIDEO_HOMEWORK_PLAY_DETAIL_STATUS,
  SHD_RECEIVE_VIDEO_HOMEWORK_PLAY_DETAIL_DATA,
  SHD_GET_QUESTION_ANALYSIS,
  SHD_UPDATE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA_STATUS,
  SHD_RECEIVE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA,
  SHD_GET_EXERCISE_MORE_ERROR_STUDENTS,
  SHD_RECEIVE_EXERCISE_MORE_ERROR_STUDENTS,
  SHD_SET_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE,
  SHD_RECEIVE_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE,
  SBHD_GET_VIDEO_DETAIL_CLASS_COMPLETION,
  SBHD_RECEIVE_VIDEO_DETAIL_CLASS_COMPLETION,
  RECEIVE_TEACHER_INFO,
  RECEIVE_STUDENT_INFO,

  GET_QUESTION_INFO,
  GET_QUESTION_METHOD,
  SS_TEACHER_CREATE_PAPER,
  SS_TEACHER_LISTS,
  SS_STUDENT_PAPER,
  SS_TEACHER_REPORT_ANALYSIS,
  SS_TEACHER_REPORT_DETAILED,
  SS_TEACHER_REPORT_DETAILED_LIST,
  SS_TEACHER_REPORT_DETAILED_TWOBYONE,
  // SS_TEACHER_REPORT_NOPARTER_CLASSLIST,
} from './actionTypes';

// Action go with standard rule of FSA:(https://github.com/redux-utilities/flux-standard-action)

// actions for thunk
const innerAction = {};
// normal actions
const action = {};

[
  {name: 'subjectsystemTeacherCreatePaper', type: SS_TEACHER_CREATE_PAPER, isExport: true},
  {name: 'subjectsystemTeacherLists', type: SS_TEACHER_LISTS, isExport: true},
  {name: 'subjectsystemstudentpaper', type: SS_STUDENT_PAPER, isExport: true},
  {name: 'subjectsystemTeacherReportAnalysis', type: SS_TEACHER_REPORT_ANALYSIS, isExport: true},
  {name: 'subjectsystemTeacherReportdetailed', type: SS_TEACHER_REPORT_DETAILED, isExport: true},
  {name: 'subjectsystemTeacherReportdetailedTwoByone', type: SS_TEACHER_REPORT_DETAILED_TWOBYONE, isExport: true},
  {name: 'subjectsystemTeacherReportdetailedLists', type: SS_TEACHER_REPORT_DETAILED_LIST, isExport: true},
  // {name: 'subjectsystemTeacherReportClassList',
  // type: SS_TEACHER_REPORT_NOPARTER_CLASSLIST, isExport: true},
  { name: 'updateExerciseHomeworkClassStudentFinishedStatus', type: SHD_UPDATE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA_STATUS, isExport: false },
  { name: 'receiveExerciseHomeworkClassStudentFinishedStatus', type: SHD_RECEIVE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA, isExport: false },
  { name: 'updateVideoHomeworkPlayDetailStatus', type: SHD_UPDATE_VIDEO_HOMEWORK_PLAY_DETAIL_STATUS, isExport: false },
  { name: 'receiveVideoHomeworkPlayDetailData', type: SHD_RECEIVE_VIDEO_HOMEWORK_PLAY_DETAIL_DATA, isExport: false },
  // normal actions not export
  { name: 'receiveSearchSchoolClasses', type: RECEIVE_SEARCH_SCHOOL_CLASSES, isExport: false },
  { name: 'requestSchoolListByName', type: REQUEST_SCHOOL_LIST_BY_NAME, isExport: false },
  { name: 'receiveSchoolListByName', type: RECEIVE_SCHOOL_LIST_BY_NAME, isExport: false },
  { name: 'requestStudentSchoolAndItsClasses', type: REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES, isExport: false },
  { name: 'receiveStudentSchoolAndItsClasses', type: RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES, isExport: false },
  // normal actions to export
  { name: 'updateSearchSchoolObject', type: UPDATE_SEARCH_SCHOOL_OBJECT, isExport: true },
  { name: 'toggleStudentJoinClassDialog', type: STUDENT_JOIN_CLASS_DIALOG_TOGGLE, isExport: true },
  { name: 'teacherNameValid', type: STUDENT_JOIN_CLASS_TEACHER_NAME_VALID, isExport: true },
  { name: 'studentNameValid', type: STUDENT_JOIN_CLASS_STUDENT_SELF_NAME_VALID, isExport: true },
  { name: 'updateSearchInputOutline', type: SCHOOL_SEARCH_INPUT_OUTLINE_VISIBLE, isExport: true },
  { name: 'hideSchoolSearchResultBlock', type: HIDE_SEARCH_SCHOOL_RESULT_BLOCK, isExport: true },

  // Summer Study Plan actions
  { name: 'getSchoolInfoById', type: SSP_GET_SCHOOL_INFO, isExport: true },
  { name: 'recieveSchoolInfo', type: SSP_RECEIVE_SCHOOL_INFO, isExport: false },

  { name: 'getTopThreeBlockData', type: SSP_GET_TOP_THREE_BLOCK_DATA, isExport: true },
  { name: 'receiveTopThreeBloackData', type: SSP_RECEIVE_TOP_THREE_BLOCK_DATA, isExport: false },

  { name: 'getSubjectsCoursesSelectData', type: SSP_GET_SUBJECTS_COURSES_SELECT_DATA, isExport: true },
  { name: 'receiveSubjectsCoursesSelectData', type: SSP_RECEIVE_SUBJECTS_COURSES_SELECT_DATA, isExport: false },

  { name: 'getCareerSoulEncouragementData', type: SSP_GET_CAREER_SOUL_ENCOURAGEMENT_DATA, isExport: true },
  { name: 'receiveCareerSoulEncouragementData', type: SSP_RECEIVE_CAREER_SOUL_ENCOURAGEMENT_DATA, isExport: false },

  { name: 'getKnowledgeErrorRate', type: SSP_GET_KNOWLEDGE_ERROR_RATE, isExport: true },
  { name: 'receiveKnowledgeErrorRate', type: SSP_RECEIVE_KNOWLEDGE_ERROR_RATE, isExport: false },

  { name: 'getStandardPlanSubjectStudentNum', type: SSP_RECEIVE_STANDARD_PLAN_STUDENT_NUM, isExport: false },
  { name: 'receiveStandardPlanSubjectStudentNum', type: SSP_RECEIVE_STANDARD_PLAN_KNOWLEDGE_MODULE_STUDENT_NUM, isExport: false },
  { name: 'changeStandardPlanCurrentSubject', type: SSP_CHANGE_STANDARD_PLAN_CURRENT_SUBJECT, isExport: true },

  { name: 'getExclusiveTwoBlockData', type: SSP_GET_EXCLUSIVE_TWO_BLOCK_DATA, isExport: true },
  { name: 'receiveExclusiveTwoBlockData', type: SSP_RECEIVE_EXCLUSIVE_TWO_BLOCK_DATA, isExport: false },

  { name: 'getBackTestKnowledgeErrorRate', type: SSP_GET_BACK_TEST_KNOWLEDGE_ERROR_RATE, isExport: true },
  { name: 'receiveBackTestKnowledgeErrorRate', type: SSP_RECEIVE_BACK_TEST_KNOWLEDGE_ERROR_RATE, isExport: false },
  { name: 'changeBackTestKnowledgeErrorRateSubject', type: SSP_CHANGE_BACK_TEST_KNOWLEDGE_ERROR_RATE_SUBJECT, isExport: true },

  { name: 'getBackTestKnowledgeCorrectRate', type: SSP_GET_BACK_TEST_KNOWLEDGE_CORRECT_RATE, isExport: true },
  { name: 'receiveBackTestKnowledgeCorrectRate', type: SSP_RECEIVE_BACK_TEST_KNOWLEDGE_CORRECT_RATE, isExport: false },
  { name: 'changeBackTestKnowledgeCorrectRateSubject', type: SSP_CHANGE_BACK_TEST_KNOWLEDGE_CORRECT_RATE_SUBJECT, isExport: true },

  { name: 'chageSubjectsHomeworkErrorRatioSubject', type: SSP_CHANGE_SUBJECTS_HOMEWORK_ERROR_RATIO_CURRENT_SUBJECT, isExport: true },

  { name: 'getFrontAndBackTestTranscript', type: SSP_GET_FRONT_AND_BACK_TEST_TRANSCRIPT, isExport: true },
  { name: 'receiveFrontAndBackTestTranscript', type: SSP_RECEIVE_FRONT_AND_BACK_TEST_TRANSCRIPT, isExport: false },

  { name: 'getStudentsHomeworkCompletion', type: SSP_GET_STUDENTS_HOMEWORK_COMPLETION, isExport: false },
  { name: 'receiveStudentsHomeworkCompletion', type: SSP_RECEIVE_STUDENTS_HOMEWORK_COMPLETION, isExport: false },
  { name: 'getSummerPlanStudentLearningDetail', type: SSP_GET_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL, isExport: false },
  { name: 'receiveSummerPlanStudentLearningDetail', type: SSP_RECEIVE_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL, isExport: false },
  { name: 'getSummerPlanStudentReportCard', type: SSP_GET_SUMMER_PLAN_STUDENT_REPORT_CARD, isExport: false },
  { name: 'receiveSummerPlanStudentReportCard', type: SSP_RECEIVE_SUMMER_PLAN_STUDENT_REPORT_CARD, isExport: false },

  // SHD - subject homework detail
  { name: 'getHomeworkDetailInfo', type: SHD_GET_VIDEO_HOMEWORK_DETAIL_INFO, isExport: true },
  { name: 'receiveHomeworkDetailInfo', type: SHD_RECEIVE_VIDEO_HOMEWORK_DETAIL_INFO, isExport: false },

  { name: 'getClassStudentList', type: SHD_GET_CLASS_STUDENT_LIST, isExport: false },
  { name: 'receiveClassStudentList', type: SHD_RECEIVE_CLASS_STUDENT_LIST, isExport: false },

  { name: 'getSubjectVideoHomeworkClassFinishCond', type: SHD_GET_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND, isExport: true },
  { name: 'receiveSubjectVideoHomeworkClassFinishCond', type: SHD_RECEIVE_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND, isExport: false },

  { name: 'getClassList', type: SHD_GET_CLASS_LIST, isExport: true },
  { name: 'receiveClassList', type: SHD_RECEIVE_CLASS_LIST, isExport: false },

  { name: 'getStudentVideoHomeworkList', type: SHD_GET_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST, isExport: false },
  { name: 'receiveStudentVideoHomeworkList', type: SHD_RECEIVE_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST, isExport: false },
  { name: 'clearStudentVideoHomeworkData', type: SHD_CLEAR_STUDENT_VIDEO_HOMEWORK_DIALOG_DATA, isExport: true },
  { name: 'setStudentVideoHomeworkDataEmpty', type: SHD_SET_STUDENT_VIDEO_HOMEWORK_DATA_EMPTY, isExport: false },
  { name: 'receiveClassVideoHomeworkPlaySituation', type: SHD_RECEIVE_CLASS_VIDEO_HOMEWORK_PLAY_SITUATION, isExport: false },

  { name: 'getNonParticipants', type: SHD_GET_NON_PARTICIPANTS, isExport: true },
  { name: 'receiveNonParticipants', type: SHD_RECEIVE_NON_PARTICIPANTS, isExport: false },

  { name: 'getSubjectExerciseHomeworkClassFinishCond', type: SHD_GET_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND, isExport: true },
  { name: 'receiveSubjectExerciseHomeworkClassFinishCond', type: SHD_RECEIVE_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND, isExport: false },

  { name: 'getExerciseKnowledgeErrorRate', type: SHD_GET_EXERCISE_KNOWLEDGE_ERROR_RATE, isExport: true },
  { name: 'receiveExerciseKnowledgeErrorRate', type: SHD_RECEIVE_EXERCISE_KNOWLEDGE_ERROR_RATE, isExport: false },

  { name: 'getQuestionAnswerCond', type: SHD_GET_QUESTION_ANSWER_CONDITION, isExport: true },
  { name: 'receiveQuestionAnswerCond', type: SHD_RECEIVE_QUESTION_ANSWER_CONDITION, isExport: false },

  { name: 'getQuestionAnalysis', type: SHD_GET_QUESTION_ANALYSIS, isExport: true },
  { name: 'getExerciseMoreErrorStudents', type: SHD_GET_EXERCISE_MORE_ERROR_STUDENTS, isExport: true },
  { name: 'receiveExerciseMoreErrorStudents', type: SHD_RECEIVE_EXERCISE_MORE_ERROR_STUDENTS, isExport: false },
  { name: 'setExerciseQuestionIdAndModalVisible', type: SHD_SET_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE, isExport: true },
  { name: 'receiveExerciseQuestionIdAndModalVisible', type: SHD_RECEIVE_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE, isExport: false },

  // left menus
  // permission
  { name: 'receivePermission', type: RECEIVE_PERMISSION, isExport: false },
  { name: 'receiveTeacherInfo', type: RECEIVE_TEACHER_INFO, isExport: false },
  { name: 'receiveStudentInfo', type: RECEIVE_STUDENT_INFO, isExport: false },

  // 视频作业
  // { name: 'receiveHomeworkVideoTaskData', type: HVT_RECEIVE_DATA, isExport: true },
  // 视频作业 homework video task
  { name: 'setHVTSelectData', type: HVT_SELECT_DATA, isExport: true },
  { name: 'setHVTBasketData', type: HVT_BASKET_DATA, isExport: true },

  { name: 'getSchoolVideoHomeworClassCompletion', type: SBHD_GET_VIDEO_DETAIL_CLASS_COMPLETION, isExport: true },
  { name: 'receiveSchoolVideoHomeworClassCompletion', type: SBHD_RECEIVE_VIDEO_DETAIL_CLASS_COMPLETION, isExport: false },

  { name: 'leftMenusSwitch', type: LEFT_MENUS_SWITCH, isExport: true },

  // 获取答题信息
  { name: 'getQuestionInfo', type: GET_QUESTION_INFO, isExport: false },
  { name: 'getQuestionMethod', type: GET_QUESTION_METHOD, isExport: false },

].forEach((item) => {
  const { name, type, isExport } = item;
  const actionFunc = (payload = {}) => ({
    type,
    payload,
  });
  if (isExport === true) {
    action[name] = actionFunc;
  } else {
    innerAction[name] = actionFunc;
  }
});

// thunk actions for ajax handle default
const asyncAction = {
  queryStudentInfo: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getStudentInfo(payload);

      dispatch(innerAction.receiveStudentInfo({ data }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getTeacherInfo: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getTeacherInfo(payload);
      // res.code = ['teacher', 'classheadteacher', 'principal'];
      dispatch(innerAction.receiveTeacherInfo({teacherInfo: res}));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getQuestionInfo: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getQuestionInfo(payload);
      dispatch(
        innerAction.getQuestionInfo(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getSchoolVideoHomeworClassCompletion: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getSchoolVideoHomeworkClassCompletion(payload);
      dispatch(
        innerAction.receiveSchoolVideoHomeworClassCompletion(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  setExerciseQuestionIdAndModalVisible: (payload = {}) => async (dispatch) => {
    try {
      const data = {
        questionId: payload.questionId,
        visible: payload.visible,
      };
      dispatch(innerAction.receiveExerciseQuestionIdAndModalVisible(data));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getExerciseMoreErrorStudents: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getExerciseMoreErrorStudents(payload);
      const data = {
        students: {
          loading: false,
          data: res.data,
          totalCount: res.totalcount,
        },
      };
      dispatch(innerAction.receiveExerciseMoreErrorStudents(data));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getQuestionAnalysis: (payload = {}) => async () => {
    try {
      const res = await api.getQuestionAnalysis(payload);

      return res;
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getExerciseHomeworkClassStudentFinishedData: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.updateExerciseHomeworkClassStudentFinishedStatus({}));
      const res = await api.getClassStudentExerciseFinishedData(payload);
      dispatch(innerAction.receiveExerciseHomeworkClassStudentFinishedStatus({
        data: res,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getVideoHomeworkPlayDetailData: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.updateVideoHomeworkPlayDetailStatus({}));
      const res = await api.getVideoHomeworkPlayDetail(payload);
      dispatch(innerAction.receiveVideoHomeworkPlayDetailData({
        data: res,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getSchoolBasedVideoHomeworkPlayDetailData: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.updateVideoHomeworkPlayDetailStatus({}));
      const res = await api.getSchoolBasedVideoHomeworkItemPlayDetail(payload);
      dispatch(innerAction.receiveVideoHomeworkPlayDetailData({
        data: res,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // permission
  getPermission: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getPermission(payload);
      dispatch(innerAction.receivePermission({
        data,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // Subject homework detail
  getClassVideosHomeworkPlayData: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getVideosHomeworkPlaySituation(payload);
      dispatch(innerAction.receiveClassVideoHomeworkPlaySituation({
        data,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // shcool based video homework detail
  getSchoolBasedClassVideosHomeworkPlayData: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getSchoolBasedVideoHomeworkListPlaySituation(payload);
      dispatch(innerAction.receiveClassVideoHomeworkPlaySituation({
        data,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getStudentVideoHomeworkList: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.getStudentVideoHomeworkList({}));
      const data = await api.getStudentVideoHomeworkCompleteList(payload);
      dispatch(innerAction.receiveStudentVideoHomeworkList({
        data: data.data,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getSchoolBasedStudentVideoHomeworkList: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.getStudentVideoHomeworkList({}));
      const data = await api.getSchoolBasedStudentVideoHomeworkCompleteList(payload);
      dispatch(innerAction.receiveStudentVideoHomeworkList({
        data: data.data,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getClassStudentList: (payload = {}) => async (dispatch) => {
    try {
      const cb = payload.cb;
      delete payload.cb;
      dispatch(innerAction.getClassStudentList());
      const data = await api.getClassStudentList(payload);
      dispatch(innerAction.receiveClassStudentList({
        data,
      }));
      if (cb && typeof cb === 'function') {
      // only first init react
        if (data.length <= 0) {
          dispatch(innerAction.setStudentVideoHomeworkDataEmpty());
        } else {
          cb(data[0] && data[0].studentuserid);
        }
      }
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getHomeworkDetailInfo: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getHomeworkDetailInfo(payload);
      dispatch(innerAction.receiveHomeworkDetailInfo({ homeworkDetail: res }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getClassList: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getClassList(payload);
      dispatch(innerAction.receiveClassList({ classList: res }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getNonParticipants: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getNonParticipants(payload);
      dispatch(innerAction.receiveNonParticipants(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getSubjectVideoHomeworkClassFinishCond: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getSubjectVideoHomeworkClassFinishCond(payload);
      dispatch(
        innerAction.receiveSubjectVideoHomeworkClassFinishCond(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getSubjectExerciseHomeworkClassFinishCond: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getSubjectExerciseHomeworkClassFinishCond(payload);
      dispatch(
        innerAction.receiveSubjectExerciseHomeworkClassFinishCond(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getExerciseKnowledgeErrorRate: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getSubjectExerciseKnowledgeErrorRate(payload);
      dispatch(
        innerAction.receiveExerciseKnowledgeErrorRate({exerciseKnowledgeErrorRate: res}));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  getQuestionAnswerCond: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getQuestionAnswerCond(payload);
      dispatch(
        innerAction.receiveQuestionAnswerCond({questionAnswerCond: res}));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },

  fetchClassesBySchoolName: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.fetchClassesBySchool(payload);
      dispatch(innerAction.receiveSearchSchoolClasses(data));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  fetchSchoolListByName: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.requestSchoolListByName());
      const data = await api.fetchSchoolListByName(payload);
      dispatch(innerAction.receiveSchoolListByName(data));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  fetchStudentSchoolAndItsClasses: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.requestStudentSchoolAndItsClasses());
      const data = await api.fetchStudentSchoolAndItsClasses(payload);
      const { hasschool, classes = [], schoolinfo } = (data || {});
      dispatch(innerAction.receiveStudentSchoolAndItsClasses({
        school: schoolinfo,
        hasSchool: hasschool,
        classes,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // Summer Study Plan get school info by school id;
  getSchoolInfoById: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getShcoolInfoById(payload);

      dispatch(innerAction.recieveSchoolInfo({topSchoolInfo: data, year: data.enrollmentyear}));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // SSP get top data (standard & exclusive data);
  getTopThreeBlockData: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getTopThreeBlockData(payload);

      dispatch(innerAction.receiveTopThreeBloackData(
        {
          topData: {
            standard: data.standardandvipcounts.data[0],
            exclusive: data.standardandvipcounts.data[1],
          },
          participatecount: {
            loading: false,
            data: data.summerparticipatecounts.data,
          },
          homeworkFinishCond: {
            loading: false,
            data: data.summerhomeworkfinishcounts.data,
          },
        },
      ));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // SSP get subjects courses select students number;
  getSubjectsCoursesSelectData: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getSubjectsCoursesSelectStuNumAndTime(payload);

      dispatch(innerAction.receiveSubjectsCoursesSelectData({subjectsCoursesData: data}));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // SSP get career soul encouragement three charts data;
  getCareerSoulEncouragementData: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getCareerSoulEncouragementData(payload);

      dispatch(innerAction.receiveCareerSoulEncouragementData({
        careerData: data.careercounts,
        soulGrouthData: data.soulcounts,
        encouragementGrouthData: data.encouragementcounts,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // SSP get all subjects knowledge error rate;
  getKnowledgeErrorRate: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getKnowledgeErrorRate(payload);
      const { axis, data } = res;
      const errorRate = axis.map((item, index) => ({
        id: index,
        knowledgePoint: item,
        errorRate: data[index],
      }));
      dispatch(innerAction.receiveKnowledgeErrorRate({
        knowledgeErrorRate: errorRate,
        subjectId: payload.kemuid,
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  recieveStandardPlanSubjectStudentNum: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getStandardPlanSubjectStudentNum(payload);
      dispatch(innerAction.getStandardPlanSubjectStudentNum(data));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  receiveStandardPlanKnowledgeModuleStudentNum: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getStandardPlanKnowledgeModuleStudentNum(payload);
      data.subjectId = payload.kemuid;
      dispatch(innerAction.receiveStandardPlanSubjectStudentNum(data));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // SSP get exclusive page first two block data;
  getExclusiveTwoBlockData: (payload = {}) => async (dispatch) => {
    try {
      const data = await api.getExclusiveTwoBlockData(payload);

      const frontAndBackTestPartData = data.beforeaftertestparticipation.data;
      const frontAndBackTestPart = {};
      frontAndBackTestPartData.map((item, index) => {
        let key = index + 1;

        if (key > 6) {
          key += 1;
        }
        frontAndBackTestPart[key] = Object.keys(item).map(itemKey => item[itemKey]);

        return null;
      });

      dispatch(innerAction.receiveExclusiveTwoBlockData({
        exclusiveSelectCount: {loading: false, data: data.subjectchoicecount},
        frontAndBackTestPart: {loading: false, data: frontAndBackTestPart},
        frontAndBackTestPartPC: { loading: false, data: data.beforeaftertestparticipation.data },
      }));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  // SSP get back test knowledge error rate;
  getBackTestKnowledgeErrorRate: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getBackTestKnowledgeErrorRate(payload);
      const { axis, data } = res;
      const errorRateList = axis.map((item, index) => ({
        knowledgePoint: item,
        errorRate: data[index],
      }));
      const assignData = {
        subjectId: payload.kemuid,
        data: errorRateList,
      };
      dispatch(
        innerAction.receiveBackTestKnowledgeErrorRate(assignData));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getBackTestKnowledgeCorrectRate: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getBackTestKnowledgeCorrectRate(payload);
      const { axis, data } = res;
      const totalNum = data.reduce((prevValue, nextValue) => (prevValue + nextValue));
      const correctRateList = axis.map((item, index) => ({
        itemName: item,
        stuNum: data[index],
        correctRate: Number((data[index] / totalNum).toFixed(1)),
      }));
      const assignData = {
        subjectId: payload.kemuid,
        data: correctRateList,
        dataPC: data,
      };
      dispatch(
        innerAction.receiveBackTestKnowledgeCorrectRate(assignData));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getFrontAndBackTestTranscript: (payload = {}) => async (dispatch) => {
    try {
      const res = await api.getFrontAndBackTestTranscript(payload);

      dispatch(innerAction.receiveFrontAndBackTestTranscript({frontAndBackTestTranscript: res}));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getStudentsHomeworkCompletion: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.getStudentsHomeworkCompletion());
      const res = await api.getStudentsHomeworkCompletion(payload);

      dispatch(innerAction.receiveStudentsHomeworkCompletion(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getSummerPlanStudentsLearningDetail: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.getSummerPlanStudentLearningDetail());
      const res = await api.getSummerPlanStudentLearningDetail(payload);
      dispatch(innerAction.receiveSummerPlanStudentLearningDetail(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
  getSummerPlanStudentReportCard: (payload = {}) => async (dispatch) => {
    try {
      dispatch(innerAction.getSummerPlanStudentReportCard());
      const res = await api.getFrontAndBackTestTranscript(payload);
      dispatch(innerAction.receiveSummerPlanStudentReportCard(res));
    } catch (e) {
      if (e) {
        // handle error special if needed
        // const { code } = e;
        // if (code === 700) {
        // }
      }
    }
  },
};

let otherActions = {};
((req) => {
  req.keys().forEach((key) => {
    const md = req(key).default;
    otherActions = assign({}, otherActions, md);
  });
})(require.context('./', true, /\.\/[^/]+\/actionCreator.js$/));

const eventualAction = assign({}, action, asyncAction, otherActions);

export default eventualAction;

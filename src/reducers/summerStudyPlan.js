import assign from 'object-assign';
import {
  SSP_RECEIVE_SCHOOL_INFO,
  SSP_RECEIVE_TOP_THREE_BLOCK_DATA,
  SSP_RECEIVE_SUBJECTS_COURSES_SELECT_DATA,
  SSP_RECEIVE_CAREER_SOUL_ENCOURAGEMENT_DATA,
  SSP_RECEIVE_STANDARD_PLAN_STUDENT_NUM,
  SSP_RECEIVE_STANDARD_PLAN_KNOWLEDGE_MODULE_STUDENT_NUM,
  SSP_RECEIVE_KNOWLEDGE_ERROR_RATE,
  SSP_CHANGE_STANDARD_PLAN_CURRENT_SUBJECT,
  SSP_RECEIVE_EXCLUSIVE_TWO_BLOCK_DATA,
  SSP_RECEIVE_BACK_TEST_KNOWLEDGE_ERROR_RATE,
  SSP_CHANGE_BACK_TEST_KNOWLEDGE_ERROR_RATE_SUBJECT,
  SSP_RECEIVE_BACK_TEST_KNOWLEDGE_CORRECT_RATE,
  SSP_CHANGE_BACK_TEST_KNOWLEDGE_CORRECT_RATE_SUBJECT,
  SSP_CHANGE_SUBJECTS_HOMEWORK_ERROR_RATIO_CURRENT_SUBJECT,
  SSP_RECEIVE_FRONT_AND_BACK_TEST_TRANSCRIPT,
  SSP_GET_STUDENTS_HOMEWORK_COMPLETION,
  SSP_RECEIVE_STUDENTS_HOMEWORK_COMPLETION,
  SSP_RECEIVE_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL,
  SSP_GET_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL,
  SSP_GET_SUMMER_PLAN_STUDENT_REPORT_CARD,
  SSP_RECEIVE_SUMMER_PLAN_STUDENT_REPORT_CARD,
} from '~/actions/actionTypes';

const summerStudyPlan = (state = {
  participatecount: {
    loading: true,
    data: [],
  },
  homeworkFinishCond: {
    loading: true,
    data: [],
  },
  standardPlanSubjectStudentNum: {
    loading: true,
    data: null,
  },
  standardPlanKnowledgeModuleStudentNum: {
    loading: true,
    data: {},
    currentSubject: 1,
  },
  exclusiveSelectCount: {
    loading: true,
  },
  frontAndBackTestPart: {
    loading: true,
  },
  frontAndBackTestPartPC: {
    loading: true,
  },
  knowledgeErrorRate: [],
  topSchoolInfo: {},
  backTestKnowledgeErrorRate: {
    data: {},
    curSubjectId: 1,
    loading: true,
  },
  backTestKnowledgeCorrectRate: {
    data: {},
    curSubjectId: 1,
    loading: true,
  },
  backTestKnowledgeCorrectRatePC: {
    data: {},
    currentSubject: 1,
    loading: true,
  },
  standardVsSpecial: {
    loading: true,
    spicialCount: null,
    standardCount: null,
  },
  subjectsCoursesDataPC: {
    loading: true,
    subject: {},
    totalcounts: {},
  },
  subjectsHomeworkKnowledgeModuleErrorRatio: {
    loading: true,
    data: {},
    currentSubject: 1,
  },
  studentLearningDetail: {
    loading: true,
    data: [],
    totalCount: 0,
  },
  studentReportCard: {
    loading: true,
    data: [],
    totalCount: 0,
  },
  homeworkCompletion: {
    loading: true,
    data: [],
    totalCount: 0,
  },
}, action) => {
  const { type, payload } = action;

  switch (type) {
    case SSP_RECEIVE_SCHOOL_INFO:
      return assign({}, state, payload);
    case SSP_RECEIVE_TOP_THREE_BLOCK_DATA:
      return assign({}, state, {
        standardVsSpecial: {
          loading: false,
          spicialCount: payload.topData.exclusive.participatecount,
          standardCount: payload.topData.standard.participatecount,
        },
      }, payload);
    case SSP_RECEIVE_SUBJECTS_COURSES_SELECT_DATA:
      return assign({}, state, {
        subjectsCoursesDataPC: {
          loading: false,
          ...payload.subjectsCoursesData,
        },
      }, payload);
    case SSP_RECEIVE_CAREER_SOUL_ENCOURAGEMENT_DATA:
      return assign({}, state, payload);
    case SSP_CHANGE_SUBJECTS_HOMEWORK_ERROR_RATIO_CURRENT_SUBJECT:
      return assign({}, state, {
        subjectsHomeworkKnowledgeModuleErrorRatio: {
          ...state.subjectsHomeworkKnowledgeModuleErrorRatio,
          currentSubject: payload.subjectId,
          loading: !state.subjectsHomeworkKnowledgeModuleErrorRatio.data[payload.subjectId],
        },
      });
    case SSP_RECEIVE_KNOWLEDGE_ERROR_RATE:
      return assign({}, state, {
        subjectsHomeworkKnowledgeModuleErrorRatio: {
          data: {
            ...state.subjectsHomeworkKnowledgeModuleErrorRatio.data,
            [payload.subjectId]: payload.knowledgeErrorRate,
          },
          currentSubject: payload.subjectId,
          loading: false,
        },
      }, payload);
    case SSP_RECEIVE_STANDARD_PLAN_STUDENT_NUM:
      return assign({}, state, {
        standardPlanSubjectStudentNum: {
          data: payload,
          loading: false,
        },
      });
    case SSP_RECEIVE_STANDARD_PLAN_KNOWLEDGE_MODULE_STUDENT_NUM:
      return assign({}, state, {
        standardPlanKnowledgeModuleStudentNum: {
          data: {
            ...state.standardPlanKnowledgeModuleStudentNum.data,
            [payload.subjectId]: payload,
          },
          currentSubject: payload.subjectId,
          loading: false,
        },
      });
    case SSP_CHANGE_STANDARD_PLAN_CURRENT_SUBJECT:
      return assign({}, state, {
        standardPlanKnowledgeModuleStudentNum: {
          ...state.standardPlanKnowledgeModuleStudentNum,
          currentSubject: payload.subjectId,
          loading: !state.standardPlanKnowledgeModuleStudentNum.data[payload.subjectId],
        },
      });
    case SSP_RECEIVE_EXCLUSIVE_TWO_BLOCK_DATA:
      return assign({}, state, payload);
    case SSP_RECEIVE_BACK_TEST_KNOWLEDGE_ERROR_RATE:
      return assign({}, state, {
        backTestKnowledgeErrorRate: {
          data: {
            ...state.backTestKnowledgeErrorRate.data,
            [payload.subjectId]: payload.data,
          },
          curSubjectId: payload.subjectId,
          loading: false,
        },
      });
    case SSP_CHANGE_BACK_TEST_KNOWLEDGE_ERROR_RATE_SUBJECT:
      return assign({}, state, {
        backTestKnowledgeErrorRate: {
          data: {
            ...state.backTestKnowledgeErrorRate.data,
          },
          curSubjectId: payload.subjectId,
          loading: !state.backTestKnowledgeErrorRate.data[payload.subjectId],
        }});
    case SSP_RECEIVE_BACK_TEST_KNOWLEDGE_CORRECT_RATE:
      return assign({}, state, {
        backTestKnowledgeCorrectRate: {
          data: {
            ...state.backTestKnowledgeCorrectRate.data,
            [payload.subjectId]: payload.data,
          },
          curSubjectId: payload.subjectId,
          loading: false,
        },
        backTestKnowledgeCorrectRatePC: {
          data: {
            ...state.backTestKnowledgeCorrectRatePC.data,
            [payload.subjectId]: payload.dataPC,
          },
          currentSubject: payload.subjectId,
          loading: false,
        },
      });
    case SSP_CHANGE_BACK_TEST_KNOWLEDGE_CORRECT_RATE_SUBJECT:
      return assign({}, state, {
        backTestKnowledgeCorrectRate: {
          data: {
            ...state.backTestKnowledgeCorrectRate.data,
          },
          curSubjectId: payload.subjectId,
          loading: !state.backTestKnowledgeCorrectRate.data[payload.subjectId],
        }}, {
        backTestKnowledgeCorrectRatePC: {
          data: {
            ...state.backTestKnowledgeCorrectRatePC.data,
          },
          currentSubject: payload.subjectId,
          loading: !state.backTestKnowledgeCorrectRatePC.data[payload.subjectId],
        }});
    case SSP_RECEIVE_FRONT_AND_BACK_TEST_TRANSCRIPT:
      return assign({}, state, payload);
    case SSP_GET_STUDENTS_HOMEWORK_COMPLETION:
      return assign({}, state, {
        homeworkCompletion: {
          loading: true,
          data: [],
          totaCount: state.studentLearningDetail.totalCount,
        },
      });
    case SSP_RECEIVE_STUDENTS_HOMEWORK_COMPLETION:
      return assign({}, state, {
        homeworkCompletion: {
          loading: false,
          data: payload.data,
          totaCount: payload.totalcount,
        },
      });
    case SSP_GET_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL:
      return assign({}, state, {
        studentLearningDetail: {
          loading: true,
          data: [],
          totalCount: state.studentLearningDetail.totalCount,
        },
      });
    case SSP_RECEIVE_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL:
      return assign({}, state, {
        studentLearningDetail: {
          loading: false,
          data: payload.data,
          totalCount: payload.totalcount,
        },
      });
    case SSP_GET_SUMMER_PLAN_STUDENT_REPORT_CARD:
      return assign({}, state, {
        studentReportCard: {
          loading: true,
          data: [],
          totalCount: state.studentReportCard.totalCount,
        },
      });
    case SSP_RECEIVE_SUMMER_PLAN_STUDENT_REPORT_CARD:
      return assign({}, state, {
        studentReportCard: {
          loading: false,
          data: payload.data,
          totalCount: payload.totalcount,
        },
      });
    default:
      return state;
  }
};

export default summerStudyPlan;

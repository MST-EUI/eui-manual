// action types for view studentJoinClass begin
export const STUDENT_JOIN_CLASS_DIALOG_TOGGLE = 'STUDENT_JOIN_CLASS_DIALOG_TOGGLE';
export const STUDENT_JOIN_CLASS_TEACHER_NAME_VALID = 'STUDENT_JOIN_CLASS_TEACHER_NAME_VALID';
export const STUDENT_JOIN_CLASS_STUDENT_SELF_NAME_VALID = 'STUDENT_JOIN_CLASS_STUDENT_SELF_NAME_VALID';
export const REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES = 'REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES';
export const RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES = 'RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES';
export const REQUEST_SCHOOL_LIST_BY_NAME = 'REQUEST_SCHOOL_LIST_BY_NAME';
export const RECEIVE_SCHOOL_LIST_BY_NAME = 'RECEIVE_SCHOOL_LIST_BY_NAME';
export const UPDATE_SEARCH_SCHOOL_OBJECT = 'UPDATE_SEARCH_SCHOOL_OBJECT';
export const RECEIVE_SEARCH_SCHOOL_CLASSES = 'RECEIVE_SEARCH_SCHOOL_CLASSES';
export const SCHOOL_SEARCH_INPUT_OUTLINE_VISIBLE = 'SCHOOL_SEARCH_INPUT_OUTLINE_VISIBLE';
export const HIDE_SEARCH_SCHOOL_RESULT_BLOCK = 'HIDE_SEARCH_SCHOOL_RESULT_BLOCK';
// action types for view studentJoinClass end

/**
 * Summer study plan h5 types;
 * @author yhm1694;
 * @date 2018/07/04;
 */
export const SSP_GET_SCHOOL_INFO = 'SSP_GET_SCHOOL_INFO';
export const SSP_RECEIVE_SCHOOL_INFO = 'SSP_RECEIVE_SCHOOL_INFO';
export const SSP_GET_TOP_THREE_BLOCK_DATA = 'SSP_GET_TOP_THREE_BLOCK_DATA';
export const SSP_RECEIVE_TOP_THREE_BLOCK_DATA = 'SSP_RECEIVE_TOP_THREE_BLOCK_DATA';
export const SSP_GET_SUBJECTS_COURSES_SELECT_DATA = 'SSP_GET_SUBJECTS_COURSES_SELECT_DATA';
export const SSP_RECEIVE_SUBJECTS_COURSES_SELECT_DATA = 'SSP_RECEIVE_SUBJECTS_COURSES_SELECT_DATA';
export const SSP_GET_CAREER_SOUL_ENCOURAGEMENT_DATA = 'SSP_GET_CAREER_SOUL_ENCOURAGEMENT_DATA';
export const SSP_RECEIVE_CAREER_SOUL_ENCOURAGEMENT_DATA = 'SSP_RECEIVE_CAREER_SOUL_ENCOURAGEMENT_DATA';
export const SSP_GET_KNOWLEDGE_ERROR_RATE = 'SSP_GET_KNOWLEDGE_ERROR_RATE';
export const SSP_RECEIVE_KNOWLEDGE_ERROR_RATE = 'SSP_RECEIVE_KNOWLEDGE_ERROR_RATE';
export const SSP_RECEIVE_STANDARD_PLAN_STUDENT_NUM = 'SSP_RECEIVE_STANDARD_PLAN_STUDENT_NUM';
export const SSP_RECEIVE_STANDARD_PLAN_KNOWLEDGE_MODULE_STUDENT_NUM = 'SSP_RECEIVE_STANDARD_PLAN_KNOWLEDGE_MODULE_STUDENT_NUM';
export const SSP_CHANGE_STANDARD_PLAN_CURRENT_SUBJECT = 'SSP_CHANGE_STANDARD_PLAN_CURRENT_SUBJECT';
export const SSP_GET_EXCLUSIVE_TWO_BLOCK_DATA = 'SSP_GET_EXCLUSIVE_TWO_BLOCK_DATA';
export const SSP_RECEIVE_EXCLUSIVE_TWO_BLOCK_DATA = 'SSP_RECEIVE_EXCLUSIVE_TWO_BLOCK_DATA';
export const SSP_GET_BACK_TEST_KNOWLEDGE_ERROR_RATE = 'SSP_GET_BACK_TEST_KNOWLEDGE_ERROR_RATE';
export const SSP_RECEIVE_BACK_TEST_KNOWLEDGE_ERROR_RATE = 'SSP_RECEIVE_BACK_TEST_KNOWLEDGE_ERROR_RATE';
export const SSP_CHANGE_BACK_TEST_KNOWLEDGE_ERROR_RATE_SUBJECT = 'SSP_CHANGE_BACK_TEST_KNOWLEDGE_ERROR_RATE_SUBJECT';
export const SSP_GET_BACK_TEST_KNOWLEDGE_CORRECT_RATE = 'SSP_GET_BACK_TEST_KNOWLEDGE_CORRECT_RATE';
export const SSP_RECEIVE_BACK_TEST_KNOWLEDGE_CORRECT_RATE = 'SSP_RECEIVE_BACK_TEST_KNOWLEDGE_CORRECT_RATE';
export const SSP_CHANGE_BACK_TEST_KNOWLEDGE_CORRECT_RATE_SUBJECT = 'SSP_CHANGE_BACK_TEST_KNOWLEDGE_CORRECT_RATE_SUBJECT';
export const SSP_CHANGE_SUBJECTS_HOMEWORK_ERROR_RATIO_CURRENT_SUBJECT = 'SSP_CHANGE_SUBJECTS_HOMEWORK_ERROR_RATIO_CURRENT_SUBJECT';
export const SSP_GET_FRONT_AND_BACK_TEST_TRANSCRIPT = 'SSP_GET_FRONT_AND_BACK_TEST_TRANSCRIPT';
export const SSP_RECEIVE_FRONT_AND_BACK_TEST_TRANSCRIPT = 'SSP_RECEIVE_FRONT_AND_BACK_TEST_TRANSCRIPT';
export const SSP_GET_STUDENTS_HOMEWORK_COMPLETION = 'SSP_GET_STUDENTS_HOMEWORK_COMPLETION';
export const SSP_RECEIVE_STUDENTS_HOMEWORK_COMPLETION = 'SSP_RECEIVE_STUDENTS_HOMEWORK_COMPLETION';
export const SSP_GET_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL = 'SSP_GET_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL';
export const SSP_RECEIVE_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL = 'SSP_RECEIVE_SUMMER_PLAN_STUDENTS_LEARNING_DETAIL';
export const SSP_GET_SUMMER_PLAN_STUDENT_REPORT_CARD = 'SSP_GET_SUMMER_PLAN_STUDENT_REPORT_CARD';
export const SSP_RECEIVE_SUMMER_PLAN_STUDENT_REPORT_CARD = 'SSP_RECEIVE_SUMMER_PLAN_STUDENT_REPORT_CARD';

// Subject homework detail;
export const SHD_GET_VIDEO_HOMEWORK_DETAIL_INFO = 'SHD_GET_VIDEO_HOMEWORK_DETAIL_INFO';
export const SHD_RECEIVE_VIDEO_HOMEWORK_DETAIL_INFO = 'SHD_RECEIVE_VIDEO_HOMEWORK_DETAIL_INFO';
export const SHD_GET_CLASS_STUDENT_LIST = 'SHD_GET_CLASS_STUDENT_LIST';
export const SHD_RECEIVE_CLASS_STUDENT_LIST = 'SHD_RECEIVE_CLASS_STUDENT_LIST';
export const SHD_GET_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND = 'SHD_GET_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND';
export const SHD_RECEIVE_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND = 'SHD_RECEIVE_SUBJECT_VIDEO_HOMEWORK_CLASS_FINISH_COND';
export const SHD_GET_CLASS_LIST = 'SHD_GET_CLASS_LIST';
export const SHD_RECEIVE_CLASS_LIST = 'SHD_RECEIVE_CLASS_LIST';
export const SHD_GET_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST = 'SHD_GET_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST';
export const SHD_RECEIVE_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST = 'SHD_RECEIVE_SUBJECT_STUDENTS_VIDEO_HOMEWORK_COMPLETE_RATIO_LIST';
export const SHD_CLEAR_STUDENT_VIDEO_HOMEWORK_DIALOG_DATA = 'SHD_CLEAR_STUDENT_VIDEO_HOMEWORK_DIALOG_DATA';
export const SHD_GET_NON_PARTICIPANTS = 'SHD_GET_NON_PARTICIPANTS';
export const SHD_RECEIVE_NON_PARTICIPANTS = 'SHD_RECEIVE_NON_PARTICIPANTS';
export const SHD_GET_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND = 'SHD_GET_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND';
export const SHD_RECEIVE_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND = 'SHD_RECEIVE_SUBJECT_EXERCISE_HOMEWORK_CLASS_FINISH_COND';
export const SHD_SET_STUDENT_VIDEO_HOMEWORK_DATA_EMPTY = 'SHD_SET_STUDENT_VIDEO_HOMEWORK_DATA_EMPTY';
export const SHD_GET_EXERCISE_KNOWLEDGE_ERROR_RATE = 'SHD_GET_EXERCISE_KNOWLEDGE_ERROR_RATE';
export const SHD_RECEIVE_EXERCISE_KNOWLEDGE_ERROR_RATE = 'SHD_RECEIVE_EXERCISE_KNOWLEDGE_ERROR_RATE';
export const SHD_RECEIVE_CLASS_VIDEO_HOMEWORK_PLAY_SITUATION = 'SHD_RECEIVE_CLASS_VIDEO_HOMEWORK_PLAY_SITUATION';
export const SHD_GET_QUESTION_ANSWER_CONDITION = 'SHD_GET_QUESTION_ANSWER_CONDITION';
export const SHD_RECEIVE_QUESTION_ANSWER_CONDITION = 'SHD_RECEIVE_QUESTION_ANSWER_CONDITION';
export const SHD_UPDATE_VIDEO_HOMEWORK_PLAY_DETAIL_STATUS = 'SHD_UPDATE_VIDEO_HOMEWORK_PLAY_DETAIL_STATUS';
export const SHD_RECEIVE_VIDEO_HOMEWORK_PLAY_DETAIL_DATA = 'SHD_RECEIVE_VIDEO_HOMEWORK_PLAY_DETAIL_DATA';
export const SHD_GET_QUESTION_ANALYSIS = 'SHD_GET_QUESTION_ANALYSIS';
export const SHD_UPDATE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA_STATUS = 'SHD_UPDATE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA_STATUS';
export const SHD_RECEIVE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA = 'SHD_RECEIVE_EXERCISE_HOMEWORK_CLASS_STUDENT_FINISHED_DATA';
export const SHD_GET_EXERCISE_MORE_ERROR_STUDENTS = 'SHD_GET_EXERCISE_MORE_ERROR_STUDENTS';
export const SHD_RECEIVE_EXERCISE_MORE_ERROR_STUDENTS = 'SHD_RECEIVE_EXERCISE_MORE_ERROR_STUDENTS';
export const SHD_SET_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE = 'SHD_SET_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE';
export const SHD_RECEIVE_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE = 'SHD_RECEIVE_EXERCISE_CURRENT_QUESTION_ID_AND_MODAL_VISIBLE';
export const SBHD_GET_VIDEO_DETAIL_CLASS_COMPLETION = 'SBHD_GET_VIDEO_DETAIL_CLASS_COMPLETION';
export const SBHD_RECEIVE_VIDEO_DETAIL_CLASS_COMPLETION = 'SBHD_RECEIVE_VIDEO_DETAIL_CLASS_COMPLETION';

// permission
export const RECEIVE_PERMISSION = 'RECEIVE_PERMISSION';
export const LEFT_MENUS_SWITCH = 'LEFT_MENUS_SWITCH';

// teacher info
export const RECEIVE_TEACHER_INFO = 'RECEIVE_TEACHER_INFO';

// student info
export const RECEIVE_STUDENT_INFO = 'RECEIVE_STUDENT_INFO';

// 视频作业相关   Homework video task
export const HVT_SELECT_DATA = 'HVT_SELECT_DATA';
export const HVT_BASKET_DATA = 'HVT_BASKET_DATA';

// 校本试卷班级完成情况相关
export const AMEND_CLASS_COMPLETION_DATA = 'AMEND_CLASS_COMPLETION_DATA';

// school based video homework detail
export const SBVD_RECEIVE_VIDEO_HOMEWORK_LIST_PLAY_SITUATION = 'SBVD_RECEIVE_VIDEO_HOMEWORK_LIST_PLAY_SITUATION';

// 答题卡
export const GET_QUESTION_INFO = 'GET_QUESTION_INFO';
export const GET_QUESTION_METHOD = 'GET_QUESTION_METHOD';

// subject system
export const SS_TEACHER_CREATE_PAPER = 'SS_TEACHER_CREATE_PAPER';
export const SS_TEACHER_LISTS = 'SS_TEACHER_LISTS';
export const SS_STUDENT_PAPER = 'SS_STUDENT_PAPER';
export const SS_TEACHER_REPORT_ANALYSIS = 'SS_TEACHER_REPORT_ANALYSIS';
export const SS_TEACHER_REPORT_DETAILED = 'SS_TEACHER_REPORT_DETAILED';
export const SS_TEACHER_REPORT_DETAILED_TWOBYONE = 'SS_TEACHER_REPORT_DETAILED_TWOBYONE';
export const SS_TEACHER_REPORT_DETAILED_LIST = 'SS_TEACHER_REPORT_DETAILED_LIST';
// export const SS_TEACHER_REPORT_NOPARTER_CLASSLIST = 'SS_TEACHER_REPORT_NOPARTER_CLASSLIST';


((req) => {
  req.keys().forEach((key) => {
    const md = req(key);
    Object.keys(md).forEach((item) => {
      const exportConst = md[item];
      module.exports[item] = exportConst;
    });
  });
})(require.context('./', true, /\.\/[^/]+\/actionTypes.js$/));

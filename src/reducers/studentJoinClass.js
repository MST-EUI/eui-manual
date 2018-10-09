import assign from 'object-assign';

import {
  STUDENT_JOIN_CLASS_DIALOG_TOGGLE,
  STUDENT_JOIN_CLASS_TEACHER_NAME_VALID,
  STUDENT_JOIN_CLASS_STUDENT_SELF_NAME_VALID,
  SCHOOL_SEARCH_INPUT_OUTLINE_VISIBLE,
  REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES,
  RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES,
  REQUEST_SCHOOL_LIST_BY_NAME,
  RECEIVE_SCHOOL_LIST_BY_NAME,
  UPDATE_SEARCH_SCHOOL_OBJECT,
  RECEIVE_SEARCH_SCHOOL_CLASSES,
  HIDE_SEARCH_SCHOOL_RESULT_BLOCK,
} from '~/actions/actionTypes';

// select school and fetch it's classes
const searchSchoolAndItsClasses = (state = {
  isFetchedClassesBySchoolName: false,
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_SEARCH_SCHOOL_OBJECT:
      return assign({}, state, {
        isFetchedClassesBySchoolName: false,
        searchTargetSchool: payload,
        searchTargetClasses: [],
      });
    case RECEIVE_SEARCH_SCHOOL_CLASSES:
      return assign({}, state, {
        isFetchedClassesBySchoolName: true,
        searchTargetClasses: payload,
      });
    default:
      return state;
  }
};

// page init data of school and it's classes
const defaultSchoolAndItsClasses = (state = {
  isGoAheadFetching: true,
  school: null,
  classes: null,
}, action) => {
  const { type, payload } = action;
  const { school, classes, hasSchool } = (payload || {});
  switch (type) {
    case REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES:
      return assign({}, state, {
        isGoAheadFetching: true,
      });
    case RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES:
      return assign({}, state, {
        isGoAheadFetching: false,
        school,
        classes,
        hasSchool,
      });
    default:
      return state;
  }
};

const studentJoinClass = (state = {
  joinClassDialogVisible: false,
  tearcherNameValid: true,
  studentNameValid: true,
  isSearchInputFocus: false,
  defaultSchoolAndItsClasses: {
    isGoAheadFetching: true,
  },
  searchSchoolAndItsClasses: {
    isFetchedClassesBySchoolName: false,
    searchTargetSchool: null,
    searchTargetClasses: [],
  },
  searchSchoolResultVisible: false,
  searchSchoolResultList: [],
}, action) => {
  const { type, payload } = action;
  switch (type) {
    case STUDENT_JOIN_CLASS_DIALOG_TOGGLE:
      return assign({}, state, { joinClassDialogVisible: !state.joinClassDialogVisible });
    case STUDENT_JOIN_CLASS_TEACHER_NAME_VALID:
      return assign({}, state, { tearcherNameValid: payload.isValid });
    case STUDENT_JOIN_CLASS_STUDENT_SELF_NAME_VALID:
      return assign({}, state, { studentNameValid: payload.isValid });
    case SCHOOL_SEARCH_INPUT_OUTLINE_VISIBLE:
      return assign({}, state, {
        isSearchInputFocus: payload.isFocus,
      });
    case HIDE_SEARCH_SCHOOL_RESULT_BLOCK:
      return assign({}, state, {
        searchSchoolResultVisible: false,
      });
    case REQUEST_STUDENT_SCHOOL_AND_ITS_CLASSES:
    case RECEIVE_STUDENT_SCHOOL_AND_ITS_CLASSES:
      return assign({}, state, {
        defaultSchoolAndItsClasses: defaultSchoolAndItsClasses(
          state.defaultSchoolAndItsClasses,
          action,
        ),
      });
    case REQUEST_SCHOOL_LIST_BY_NAME:
      return assign({}, state);
    case RECEIVE_SCHOOL_LIST_BY_NAME:
      return assign({}, state, {
        searchSchoolResultVisible: true,
        searchSchoolResultList: payload,
      });
    case UPDATE_SEARCH_SCHOOL_OBJECT:
      return assign({}, state, {
        searchSchoolResultVisible: false,
        searchSchoolAndItsClasses: searchSchoolAndItsClasses(
          state.searchSchoolAndItsClasses,
          action,
        ),
      });
    case RECEIVE_SEARCH_SCHOOL_CLASSES:
      return assign({}, state, {
        searchSchoolAndItsClasses: searchSchoolAndItsClasses(
          state.searchSchoolAndItsClasses,
          action,
        ),
      });
    default:
      return state;
  }
};

export default studentJoinClass;

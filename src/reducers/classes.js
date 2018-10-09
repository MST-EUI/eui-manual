import assign from 'object-assign';
import {
  RECEIVE_CLASS_TYPES,
  RECEIVE_BELONG_GRADES,
  RECEIVE_CLASS_MANAGE_CLASSES_LIST,
  RECEIVE_BELONG_GRADES_FOR_CREATE_CLASS_MODAL,
  RECEIVE_BELONG_SUBJECT_FOR_CREATE_CLASS_MODAL,
  CLASSES_RECEIVE_SINGLE_CLASS_DETAIL_INFO,
  CLASSES_GET_SINGLE_CLASS_DETAIL_INFO,
  CLASSES_RECEIVE_TEACHERS_GRADE_CLASSES,
  CLASSES_GET_STUDENT_LIST_BY_CLASS_ID,
  CLASSES_RECEIVE_STUDENT_LIST_BY_CLASS_ID,
  CLASSES_REVEIVE_STUDENT_SORT_ORDER_LIST,
  CLASSES_RECEIVE_ALL_CLASSES_STUDENT_LIST,
  CLASSES_REVEIVE_MY_CLASS_LIST,
  CLASSES_CLEAR_DETAIL_PAGE_DATA,
} from '~/actions/actionTypes';

const updateObject = (oldObject, newValue) => assign({}, oldObject, newValue);
const getClassDetailInfo = state => updateObject(state, {
  detail: {
    ...state.detail,
    classInfo: {},
    classInfoLoading: true,
  },
});
const receiveClassDetailInfo = (state, action) => {
  const { data } = action.payload;
  return updateObject(state, {
    detail: {
      ...state.detail,
      classInfo: data,
      classInfoLoading: false,
    },
  });
};

const receiveTeachersGradeClassList = (state, action) => {
  const { data } = action.payload;
  return updateObject(state, {
    detail: {
      ...state.detail,
      teachersGradeClassList: data,
      teachersGradeClassListLoading: false,
    },
  });
};

const getStudentListByClassId = state => updateObject(state, {
  detail: {
    ...state.detail,
    pageClassStudentDataLoading: true,
  },
});

const receiveStudentListByClassId = (state, action) => {
  const { data } = action.payload;
  return updateObject(state, {
    detail: {
      ...state.detail,
      pageClassStudentData: data,
      pageClassStudentDataLoading: false,
    },
  });
};

const receiveStudentSortOrderList = (state, action) => {
  const { data } = action.payload;
  return updateObject(state, {
    detail: {
      ...state.detail,
      pageStudentSortOrderList: data,
      pageStudentSortOrderListLoading: false,
    },
  });
};

const receiveMyClassesList = (state, action) => {
  const { myClassesList } = action.payload;
  return updateObject(state, {
    myClassesList,
  });
};

const receiveAllClassesStudentList = (state, action) => {
  const { data: res } = action.payload;
  return updateObject(state, {
    detail: {
      ...state.detail,
      classesAndStudentList: res.classlist,
      classesAndStudentListLoading: false,
      classesAndStudentListTotalCount: res.totalcount,
    },
  });
};

const clearDetailPageData = state => updateObject(state, {
  detail: {
    ...state.detail,
    classInfo: {},
    classInfoLoading: true,
    teachersGradeClassList: [],
    teachersGradeClassListLoading: true,
    pageClassStudentData: {},
    pageClassStudentDataLoading: true,
    classesAndStudentList: [],
    classesAndStudentListLoading: true,
    classesAndStudentListTotalCount: null,
  },
});

const getInitState = () => ({
  classTypes: [],
  belongGrades: [{text: '全部', value: 0}],
  classList: {
    totalcount: 0,
    classlist: [],
  },
  myClassesList: [],
  detail: {
    classInfo: {},
    classInfoLoading: true,
    teachersGradeClassList: [],
    teachersGradeClassListLoading: true,
    pageClassStudentData: {},
    pageClassStudentDataLoading: true,
    pageStudentSortOrderList: [],
    pageStudentSortOrderListLoading: true,
    classesAndStudentList: [],
    classesAndStudentListLoading: true,
    classesAndStudentListTotalCount: null,
  },
  belongGradesForCreateClass: [
    {
      text: '请选择年级',
      value: 0,
    },
  ],
  belongSubjectForCreateClass: [
    {
      text: '请选择学科',
      value: 0,
    },
  ],
});

export default (state = getInitState(), action) => {
  const { type, payload } = action;
  switch (type) {
    case CLASSES_CLEAR_DETAIL_PAGE_DATA:
      return clearDetailPageData(state, action);
    case CLASSES_RECEIVE_ALL_CLASSES_STUDENT_LIST:
      return receiveAllClassesStudentList(state, action);
    case CLASSES_REVEIVE_STUDENT_SORT_ORDER_LIST:
      return receiveStudentSortOrderList(state, action);
    case CLASSES_GET_STUDENT_LIST_BY_CLASS_ID:
      return getStudentListByClassId(state, action);
    case CLASSES_RECEIVE_STUDENT_LIST_BY_CLASS_ID:
      return receiveStudentListByClassId(state, action);
    case CLASSES_RECEIVE_TEACHERS_GRADE_CLASSES:
      return receiveTeachersGradeClassList(state, action);
    case RECEIVE_CLASS_TYPES:
    case RECEIVE_CLASS_MANAGE_CLASSES_LIST:
      return assign({}, state, payload);
    case RECEIVE_BELONG_GRADES:
      return assign({}, state, {
        belongGrades: [
          ...state.belongGrades,
          ...payload.belongGrades,
        ],
      });
    case RECEIVE_BELONG_GRADES_FOR_CREATE_CLASS_MODAL:
      return assign({}, state, {
        belongGradesForCreateClass: [
          ...state.belongGradesForCreateClass,
          ...payload.belongGradesForCreateClass,
        ],
      });
    case RECEIVE_BELONG_SUBJECT_FOR_CREATE_CLASS_MODAL:
      return assign({}, state, {
        belongSubjectForCreateClass: [
          ...state.belongSubjectForCreateClass,
          ...payload.belongSubjectForCreateClass,
        ],
      });
    case CLASSES_GET_SINGLE_CLASS_DETAIL_INFO:
      return getClassDetailInfo(state, action);
    case CLASSES_RECEIVE_SINGLE_CLASS_DETAIL_INFO:
      return receiveClassDetailInfo(state, action);
    case CLASSES_REVEIVE_MY_CLASS_LIST:
      return receiveMyClassesList(state, action);
    default:
      return state;
  }
};

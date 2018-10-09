
import assign from 'object-assign';


import {
  SS_TEACHER_CREATE_PAPER,
  SS_TEACHER_LISTS,
  SS_STUDENT_PAPER,
  SS_TEACHER_REPORT_ANALYSIS,
  SS_TEACHER_REPORT_DETAILED,
  SS_TEACHER_REPORT_DETAILED_LIST,
  SS_TEACHER_REPORT_DETAILED_TWOBYONE,
  // SS_TEACHER_REPORT_NOPARTER_CLASSLIST,
} from '~/actions/actionTypes';

const initState = {
  teacherlists: {
    listloading: true,
    page: 1,
    pagesize: 5,
    records: [],
    totalcnt: 0,
    totalpage: 0,
  },
  successState: false,
  studentpaper: {
    grade: '',
    subjectgrouplist: [],
    subjectlist: [],
    title: '',
    type: null,
  },
  teacherReport: {
    homeworkInfo: {
      deadline: null,
      homeworkstatus: null,
      participatedcount: 0,
      recordgradename: null,
      recordteachername: null,
      recordtime: null,
      subject: null,
      subjecttype: null,
      title: '',
      totalcount: 0,
      unparticipatedcount: 0,
    },
    analysisData: {
      onesubjectanalyselist: [],
      twosubjectanalyselist: [],
      threesubjectanalyselist: [],
      subjecttype: null,
    },
    detailedData: {
      classlist: [],
      onesubjectanalyselist: [],
      twoorthreesubjectanalyselist: [],
      loading: true,
    },
    detailedlistsData: {
      pageindex: 1,
      pagesize: 15,
      records: [],
      totalcount: 0,
    },
    grouptwobyeone: [],
    // noparterClasslist: [],
  },
};

function transTypeToText(type) {
  let typeText = null;
  switch (type) {
    case 1:
      typeText = '自由选科';
      break;
    case 2:
      typeText = '定二走一';
      break;
    case 3:
      typeText = '固定套餐';
      break;
    default:
      break;
  }
  return typeText;
}

export default (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SS_TEACHER_CREATE_PAPER: {
      return assign({}, state.successState, payload);
    }
    case SS_TEACHER_LISTS: {
      return {
        ...state,
        listloading: false,
        teacherlists: payload,
      };
    }
    case SS_STUDENT_PAPER: {
      return {
        ...state,
        studentpaper: payload,
      };
    }
    case SS_TEACHER_REPORT_ANALYSIS: {
      return {
        ...state,
        homeworkInfo: {
          deadline: payload.subjectinfo.deadlinetimestamp,
          homeworkstatus: payload.subjectinfo.status,
          participatedcount: payload.subjectinfo.completenum,
          recordgradename: payload.subjectinfo.gradename,
          recordteachername: payload.subjectinfo.adduser,
          recordtime: payload.subjectinfo.adddatetimestamp,
          subject: transTypeToText(payload.subjectinfo.electivetype),
          subjecttype: payload.subjectinfo.electivetype,
          title: payload.subjectinfo.title,
          totalcount: payload.subjectinfo.totalnum,
          unparticipatedcount: payload.subjectinfo.nocompletenum,
        },
        analysisData: {
          onesubjectanalyselist: payload.onesubjectanalyselist,
          twosubjectanalyselist: payload.twosubjectanalyselist,
          threesubjectanalyselist: payload.threesubjectanalyselist,
          subjecttype: payload.subjectinfo.electivetype,
        },
      };
    }
    case SS_TEACHER_REPORT_DETAILED: {
      return {
        ...state,
        detailedData: {
          classlist: payload.classlist,
          onesubjectanalyselist: payload.onesubjectanalyselist,
          twoorthreesubjectanalyselist: payload.twoorthreesubjectanalyselist,
          loading: false,
        },
      };
    }
    case SS_TEACHER_REPORT_DETAILED_LIST: {
      return {
        ...state,
        detailedlistsData: {
          pageindex: payload.pageindex,
          pagesize: payload.pagesize,
          records: payload.records,
          totalcount: payload.totalcount,
          loading: false,
        },

      };
    }
    case SS_TEACHER_REPORT_DETAILED_TWOBYONE: {
      return {
        ...state,
        grouptwobyeone: payload.subjectlist,
      };
    }
    // case SS_TEACHER_REPORT_NOPARTER_CLASSLIST: {
    //   return {
    //     ...state,
    //     noparterClasslist: payload,
    //   };
    // }
    default:
      return state;
  }
};

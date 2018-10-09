
import { generator } from '../utils/apiGenerator';
import apiUrls from './apiUrls';
// 全局的接口

const URLS = {
  test: {
    method: 'get',
    url: 'http://yapi.235.mistong.com/mock/79/admin/test',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/79/admin/test',
  },
  getNavigatorAndMenus: {
    method: 'get',
    url: '/api/menu/naviandmenus',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/376/api/menu/naviandmenus',
  },
  getStudentApplyCount: {
    method: 'post',
    url: '/api/teacher/overview/getstudentjoinclasscounts',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/overview/getstudentjoinclasscounts',
  },
  getLatestHomework: {
    method: 'post',
    url: '/api/teacher/overview/getlatesthomework',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/overview/getlatesthomework',
  },
  getPsychologicalCounts: {
    method: 'post',
    url: '/api/teacher/overview/psychologicalevaluationcounts',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/overview/psychologicalevaluationcounts',
  },
  modifyTeacherName: {
    method: 'post',
    url: '/api/teacher/overview/modifyteachername',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/overview/modifyteachername',
  },
  getOverviewStudentDynamicMessage: {
    method: 'post',
    url: '/api/teacher/overview/getstudentdynamic',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/overview/getstudentdynamic',
  },
  getStudentInfo: {
    method: 'post',
    url: '/api/student/students/userinfo',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/students/userinfo',
  },
  addStudentToClass: {
    method: 'post',
    url: '/api/teacher/classes/createclass/submitaddedstudentlist',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/createclass/submitaddedstudentlist',
  },
  fetchStudentSchoolAndItsClasses: {
    method: 'post',
    url: '/api/student/classes/schoolandclassinfo',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/classes/schoolandclassinfo',
  },
  joinClass: {
    method: 'post',
    url: '/api/student/classes/submitjoinclassdata',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/classes/submitjoinclassdata',
  },
  fetchSchoolListByName: {
    method: 'post',
    url: '/api/student/classes/searchschools',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/classes/searchschools',
  },
  fetchClassesBySchool: {
    method: 'post',
    url: '/api/student/classes/searchclasses',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/classes/searchclasses',
  },
  /**
     * Summer study plan interfaces info;
     * @author yhm1694;
     * @date 2018/07/04;
     */
  getShcoolInfoById: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/SchoolInfo',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/SchoolInfo',
  },
  getTopThreeBlockData: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/StudyPlanCounts',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/StudyPlanCounts',
  },
  getSubjectsCoursesSelectStuNumAndTime: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/SubjectPersonAndDuration',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/SubjectPersonAndDuration',
  },
  getCareerSoulEncouragementData: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/ShengYaXinLingAndLiZhiPersonAndDuration',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/ShengYaXinLingAndLiZhiPersonAndDuration',
  },
  getKnowledgeErrorRate: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/KnowledgeWrongRate',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/KnowledgeWrongRate',
  },
  getStandardPlanSubjectStudentNum: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/StandardSubjectSelectPerson',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/StandardSubjectSelectPerson',
  },
  getStandardPlanKnowledgeModuleStudentNum: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/StandardKnowledgeSelectPerson',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/StandardKnowledgeSelectPerson',
  },
  getExclusiveTwoBlockData: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/SubjectSelectionAndParticipation',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/SubjectSelectionAndParticipation',
  },
  getBackTestKnowledgeErrorRate: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/KnowledgePointsErrorRate',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/KnowledgePointsErrorRate',
  },
  getBackTestKnowledgeCorrectRate: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/SubjectsCorrectRate',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/SubjectsCorrectRate',
  },
  getFrontAndBackTestTranscript: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/ReportCard',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/ReportCard',
  },
  getStudentsHomeworkCompletion: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/HomeworkCompletionDetail',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/HomeworkCompletionDetail',
  },
  getSummerPlanClassList: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/ClassList',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/ClassList',
  },
  getSummerPlanStudentLearningDetail: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/SummerStudyDetail',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/SummerStudyDetail',
  },
  summerPlanExportExcel: {
    method: 'post',
    url: '/api/teacher/SummerStudySituationReport/DownloadExcelData',
    mockMethod: 'post',
    mockUrl: '/api/teacher/SummerStudySituationReport/DownloadExcelData',
  },
  isLogin: {
    method: 'post',
    url: '/api/login/islogin',
    mockMethod: 'post',
    mockUrl: '/api/login/islogin',
  },
  GetSbrPaperFilter: {
    // 获取学科年级列表
    method: 'get',
    url: '/api/teacher/homework/sbrpaper/GetSbrPaperFilter',
    mockMethod: 'get',
    // mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/GetSbrPaperFilter'
    mockUrl: '/api/teacher/homework/sbrpaper/GetSbrPaperFilter',
  },
  GetSbrPaperPagingList: {
    // 获取试卷列表
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/getSbrPaperPagingList',
    mockMethod: 'post',
    // mockUrl:'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/getSbrPaperPagingList'
    mockUrl: '/api/teacher/homework/sbrpaper/getSbrPaperPagingList',
  },
  /*   GetNoJoinClassList:{
      method:'post',
      url:'/api/teacher/homework/sbrpaper/getNoJoinClassList',
      mockMethod:'get',
      mockUrl:'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/getNoJoinClassList'
    }, */
  GetNoJoinStuList: {
    method: 'get',
    url: '/api/teacher/homework/sbrpaper/getNoJoinStuList',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/getNoJoinStuList',
  },
  GetSettingSuccessMessage: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/GetSetSbrHomeworkInfo',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/GetSetSbrHomeworkInfo',
  },
  Getexampaperstaticbypaperid: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/getexampaperstaticbypaperid',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/getexampaperstaticbypaperid',
  },
  GetWrongUserListByQuestionId: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/GetWrongUserListByQuestionId',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/GetWrongUserListByQuestionId',
  },
  GetUnCompleted: {
    method: 'post',
    url: '/api/teacher/homework/UnCompleted',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/UnCompleted',
  },
  Gethomeworkcompletion: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/homeworkcompletion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/homeworkcompletion',
  },
  GetClassStudentHomeworkCompletion: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/ClassStudentHomeworkCompletion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/ClassStudentHomeworkCompletion',
  },
  // 获取试卷详情头信息
  homeworkinfo: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/GetHomeworkInfoByHomeworkId',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/GetHomeworkInfoByHomeworkId',
  },
  HomeworkRecordClasses: {
    method: 'post',
    url: '/api/teacher/homework/HomeworkRecordClasses',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/HomeworkRecordClasses',
  },
  SetSbrPaperHomework: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/SetSbrPaperHomework',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbrpaper/SetSbrPaperHomework',
    // mockUrl:'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/SetSbrPaperHomework'
  },
  getHomeworkDetailInfo: {
    method: 'post',
    url: '/api/teacher/homework/homeworkinfo',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/homeworkinfo',
  },
  getClassStudentList: {
    method: 'post',
    url: '/api/teacher/homework/video/StudentList',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/video/StudentList',
  },
  getSubjectVideoHomeworkClassFinishCond: {
    method: 'post',
    url: '/api/teacher/homework/video/homeworkcompletion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/video/homeworkcompletion',
  },
  getClassList: {
    method: 'post',
    url: '/api/teacher/homework/HomeworkRecordClasses',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/HomeworkRecordClasses', // http://yapi.235.mistong.com/mock/215
  },
  getStudentVideoHomeworkCompleteList: {
    method: 'post',
    url: '/api/teacher/homework/video/StudentHomeworkCompletion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/video/StudentHomeworkCompletion',
  },
  getSchoolBasedStudentVideoHomeworkCompleteList: {
    method: 'post',
    url: '/api/teacher/homework/sbr/video/student/completion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbr/video/student/completion',
  },
  getNonParticipants: {
    method: 'post',
    url: '/api/teacher/homework/UnCompleted',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/UnCompleted', // http://yapi.235.mistong.com/mock/215
  },
  getClassCompletion: {
    method: 'post',
    url: '/api/teacher/homework/sbrpaper/getexampaperstaticbygroupid',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbrpaper/getexampaperstaticbygroupid',
  },
  // end pz
  getPermission: {
    method: 'post',
    url: '/api/menu/permissionmenu',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/231/api/menu/permissionmenu',
  },
  getVideoHomeworkPlayDetail: {
    method: 'post',
    url: '/api/teacher/homework/video/ClassStudentVideoPlayDetail',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/video/ClassStudentVideoPlayDetail',
  },
  getClassStudentExerciseFinishedData: {
    method: 'post',
    url: '/api/teacher/homework/exercises/ClassHomeworkCompletion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/exercises/ClassHomeworkCompletion',
  },

  /*
     * 视频作业api接口列表;
     */
  // 科目获取;
  getKemuList: {
    method: 'post',
    url: '/api/teacher/homework/getkemu',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/getkemu',
  },

  // 获取知识点树;
  getKnowledgeList: {
    method: 'post',
    url: '/api/teacher/homework/getknowledgelist',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/getknowledgelist',
  },
  // 获取年级列表
  getAvailableGrades: {
    method: 'post',
    url: '/api/teacher/homework/sbr/getavailablegrades',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/getavailablegrades',
  },
  // 获取视频列表;
  getVideos: {
    method: 'post',
    url: '/api/teacher/homework/sbr/getvideos',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/getvideos',
  },
  // 获取校本资源作业篮子列表
  getBasketList: {
    method: 'post',
    url: '/api/teacher/homework/sbr/gesbrbasketitems',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/gesbrbasketitems',
  },

  // 添加校本资源到作业篮子
  addBasketItem: {
    method: 'post',
    url: '/api/teacher/homework/sbr/addtosbrbasket',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/addtosbrbasket',
  },

  // 删除作业篮子中的校本资源
  removeBasketItem: {
    method: 'post',
    url: '/api/teacher/homework/sbr/removefromsbrbasket',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/removefromsbrbasket',
  },

  // 清空校本资源作业篮子
  cleanBasket: {
    method: 'post',
    url: '/api/teacher/homework/sbr/clearsbrbasket',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/clearsbrbasket',
  },
  // 布置校本作业
  setHomework: {
    method: 'post',
    url: '/api/teacher/homework/sbr/set/homework',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/sbr/set/homework',
  },
  getSubjectExerciseHomeworkClassFinishCond: {
    method: 'post',
    url: '/api/teacher/homework/exercises/homeworkcompletion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/exercises/homeworkcompletion',
  },
  getSubjectExerciseKnowledgeErrorRate: {
    method: 'post',
    url: '/api/teacher/homework/exercises/KnowledgeErrorRate',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/exercises/KnowledgeErrorRate',
  },
  getVideosHomeworkPlaySituation: {
    method: 'post',
    url: '/api/teacher/homework/video/VideoPalyViewing',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/video/VideoPalyViewing',
  },
  getQuestionAnswerCond: {
    method: 'post',
    url: '/api/teacher/homework/exercises/QuestionAnswerDetail',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/exercises/QuestionAnswerDetail',
  },
  getClassesWithGradeinfo: {
    method: 'post',
    url: '/api/teacher/homework/xueke/getclasseswithgradeinfo',
    mockMethod: 'post',
    mockUrl: '/api/teacher/homework/xueke/getclasseswithgradeinfo',
  },
  getQuestionAnalysis: {
    method: 'get',
    url: '/api/teacher/homework/xueke/analysis',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/xueke/analysis',
  },
  getExerciseMoreErrorStudents: {
    method: 'post',
    url: '/api/teacher/homework/exercises/QuestionErrorStudents',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/215/api/teacher/homework/exercises/QuestionErrorStudents',
  },
  getSchoolVideoHomeworkClassCompletion: {
    method: 'post',
    url: '/api/teacher/homework/sbr/video/completion',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbr/video/completion',
  },
  getSchoolBasedVideoHomeworkListPlaySituation: {
    method: 'post',
    url: '/api/teacher/homework/sbr/video/viewlist',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbr/video/viewlist',
  },
  getSchoolBasedVideoHomeworkItemPlayDetail: {
    method: 'post',
    url: '/api/teacher/homework/sbr/video/viewdetail',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homework/sbr/video/viewdetail',
  },
  getEnumOptions: {
    method: 'get',
    url: '/api/teacher/SelectOptions',
    mockMethod: 'get',
    mockUrl: '/api/teacher/SelectOptions',
  },
  getClassDetailInfo: {
    method: 'post',
    url: '/api/teacher/classes/classdetail/classinfo',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classdetail/classinfo',
  },
  getBelongGrades: {
    method: 'post',
    url: '/api/teacher/classes/classmanage/grades',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classmanage/grades',
  },
  getClassManageClassesList: {
    method: 'post',
    url: '/api/teacher/classes/classmanage/classlist',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classmanage/classlist',
  },
  getTeachersGradeClasses: {
    method: 'post',
    url: '/api/teacher/classes/classdetail/gradeclassinfo',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classdetail/gradeclassinfo',
  },
  teacherDismissJob: {
    method: 'post',
    url: '/api/teacher/classes/classdetail/resignjob',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classdetail/resignjob',
  },
  disbandClass: {
    method: 'post',
    url: '/api/teacher/classes/classdetail/disbandclass',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classdetail/disbandclass',
  },
  getStudentListByClassIdForClassDetail: {
    method: 'post',
    url: '/api/teacher/classes/classdetail/studentlist',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classdetail/studentlist',
  },
  deleteStudentFromClass: {
    method: 'post',
    url: '/api/teacher/classes/classdetail/removestudent',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classdetail/removestudent',
  },
  getBelongGradesForCreateClassModal: {
    method: 'post',
    url: '/api/teacher/classes/createclass/grades',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/createclass/grades',
  },
  createTeachingClass: {
    method: 'post',
    url: '/api/teacher/classes/classmanage/createteachingclass',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classmanage/createteachingclass',
  },
  getAllClassesStudentList: {
    method: 'post',
    url: '/api/teacher/classes/createclass/addedstudentlist',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/createclass/addedstudentlist',
  },
  getTeacherInfo: {
    method: 'post',
    url: '/api/teacher/psychology/userinfo',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/psychology/userinfo',
  },
  updateClassname: {
    method: 'post',
    url: '/api/teacher/classes/classmanage/updatename',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/classes/classmanage/updatename',
  },
  receiveMyClassesList: {
    method: 'post',
    url: '/api/student/classes/myclasslist',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/classes/myclasslist',
  },
  ...apiUrls,
  /**
     * 获取报告页相关接口
     */
  getReportBasic: {
    method: 'post',
    url: '/api/teacher/StatisticsReport/FetchBasicData',
    mockMethod: 'post',
    mockUrl: '/api/teacher/StatisticsReport/FetchBasicData',
  },
  getGeneralAndRank: {
    method: 'post',
    url: '/api/teacher/StatisticsReport/FetchGeneralAndRank',
    mockMethod: 'post',
    mockUrl: '/api/teacher/StatisticsReport/FetchGeneralAndRank',
  },
  getChartData: {
    method: 'post',
    url: '/api/teacher/StatisticsReport/fetchchartdata',
    mockMethod: 'post',
    mockUrl: '/api/teacher/StatisticsReport/fetchchartdata',
  },
  getTopStudent: {
    method: 'post',
    url: '/api/teacher/StatisticsReport/fetchtopstudent',
    mockMethod: 'post',
    mockUrl: '/api/teacher/StatisticsReport/fetchtopstudent',
  },
  getFavoriteCourses: {
    method: 'post',
    url: '/api/teacher/StatisticsReport/fetchvideolesson',
    mockMethod: 'post',
    mockUrl: '/api/teacher/StatisticsReport/fetchvideolesson',
  },
  // 老师使用情况基本信息年级选择时间
  fetchTeacherBasicData: {
    method: 'post',
    url: '/api/teacher/statisticsreport/FetchTeacherBasicData',
    mockMethod: 'post',
    mockUrl: '/api/teacher/statisticsreport/FetchTeacherBasicData',
  },
  // 老师使用情况基本信息统计
  fetchTeacherGeneralAndRank: {
    method: 'post',
    url: '/api/teacher/statisticsreport/FetchTeacherGeneralAndRank',
    mockMethod: 'post',
    mockUrl: '/api/teacher/statisticsreport/FetchTeacherGeneralAndRank',
  },


  // 获取题目信息
  getQuestionInfo: {
    method: 'post',
    url: '/api/student/homework/GetQuestionListByHomeworkId',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/homework/GetQuestionListByHomeworkId',
  },
  // 获取题目解析
  getQuestionMethod: {
    method: 'post',
    url: '/api/student/homework/GetQuestionMethodByQid',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/homework/GetQuestionMethodByQid',
  },
  // 获取教师题目解析
  getTeacherQuestionMethod: {
    method: 'post',
    url: '/api/teacher/homeworkpaper/GetQuestionMethodByQid',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homeworkpaper/GetQuestionMethodByQid',
  },
  // 获取题目报告
  getHomeworkPaperrePort: {
    method: 'post',
    url: '/api/student/homework/gethomeworkpaperreport',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homeworkpaper/gethomeworkpaperreport',
  },
  // 老师获取题目报告
  getTeacherHomeworkPaperrePort: {
    method: 'post',
    url: '/api/teacher/homeworkpaper/gethomeworkpaperreport',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/homeworkpaper/gethomeworkpaperreport',
  },
  // 提交答案
  submitHomeworkPaper: {
    method: 'post',
    url: '/api/student/homework/submithomeworkpaper',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/student/homework/submithomeworkpaper',
  },

  // 模拟选科
  getSubjectSystemTeacherPaper: { // 获取问卷信息
    method: 'post',
    url: '/api/teacher/analogselectionfortea/getquestionnaireinfo',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/getquestionnaireinfo',
  },
  getSubjectSystemTeacherSubmitPaper: { // 发布问卷
    method: 'post',
    url: '/api/teacher/analogselectionfortea/submithomework',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/submithomework',
  },
  getSubjectSystemTeacherListfilter: { // 获取列表筛选条件
    method: 'post',
    url: '/api/teacher/analogselectionfortea/GetConditions',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/255/api/teacher/analogselectionfortea/GetConditions',
    // yapi.235.mistong.com/mock/255
  },
  getSubjectSystemTeacherCreateSuccess: { // 发布问卷成功
    method: 'post',
    url: '/api/teacher/analogselectionfortea/getsuccesshomeworkdetail',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/getsuccesshomeworkdetail',
    // yapi.235.mistong.com/mock/255
  },
  getSubjectSystemTeacherLists: { // 获取列表
    method: 'post',
    url: '/api/teacher/analogselectionfortea/GetListByPage',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/GetListByPage',
    // yapi.235.mistong.com/mock/255
  },
  getSubjectSystemTeacherRevoke: { // 撤销问卷
    method: 'post',
    url: '/api/teacher/analogselectionfortea/cancelsubject',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/cancelsubject',
    // yapi.235.mistong.com/mock/255
  },
  getSubjectSystemStudenthomework: { // 学生获取问卷
    method: 'post',
    url: '/api/student/analogselectionforstu/gethomeworkinfo',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/255/api/student/analogselectionforstu/gethomeworkinfo',
    // yapi.235.mistong.com/mock/255
  },
  getSubjectSystemStudentSubmitHomework: { // 学生提交问卷
    method: 'post',
    url: '/api/student/analogselectionforstu/submithomework',
    mockMethod: 'post',
    mockUrl: '/api/student/analogselectionforstu/submithomework',
  },
  getSubjectSystemStudentSuccess: { // 学生提交问卷成功
    method: 'post',
    url: '/api/student/analogselectionforstu/GetSelectedSubjects',
    mockMethod: 'post',
    mockUrl: '/api/student/analogselectionforstu/GetSelectedSubjects',
  },
  getSubjectSystemTeacherReport: { // 选科报告
    method: 'post',
    url: '/api/teacher/analogselectionfortea/posthomeworkstatistics',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/posthomeworkstatistics',
  },
  getSubjectSystemTeacherReportDetailed: { // 选科明细
    method: 'post',
    url: '/api/teacher/analogselectionfortea/posthomeworkstatisticsdetail',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/posthomeworkstatisticsdetail',
  },
  getSubjectSystemTeacherReportDetailedgroupTwoByone: { // 选科明细走二筛选一
    method: 'post',
    url: '/api/teacher/analogselectionfortea/postthirdsubjects',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/postthirdsubjects',
  },
  getSubjectSystemTeacherReportDetailedLists: { // 选科明细
    method: 'post',
    url: '/api/teacher/analogselectionfortea/postselectedsubjectlist',
    mockMethod: 'post',
    mockUrl: '/api/teacher/analogselectionfortea/postselectedsubjectlist',
  },
  // getSubjectSystemTeacherReportNoParterClass: { // 未参与人班级列表
  //   method: 'post',
  //   url: '/api/teacher/analogselectionfortea/UnCompletedDistinct',
  //   mockMethod: 'post',
  //   mockUrl:
  // '//yapi.235.mistong.com/mock/255/api/teacher/analogselectionfortea/UnCompletedDistinct',
  // },

  // 作业查询
  gethomeworkrecord: {
    method: 'post',
    url: '/api/teacher/homework/homeworkrecord',
    mockMethod: 'post',
    mockUrl:
    '//yapi.235.mistong.com/mock/243/api/teacher/homework/homeworkrecord',
  },
  // 作业撤回
  deletehomework: {
    method: 'post',
    url: '/api/teacher/homework/deletehomework',
    mockMethod: 'post',
    mockUrl:
    '//yapi.235.mistong.com/mock/243/api/teacher/homework/homeworkrecord',
  },
  // 作业分类
  homeworkgetkemu: {
    method: 'post',
    url: '/api/teacher/homework/getclassification',
    mockMethod: 'post',
    mockUrl:
    '//yapi.235.mistong.com/mock/243/api/teacher/homework/getclassification',
  },
  // 形式
  homeworkworktype: {
    method: 'post',
    url: '/api/teacher/homework/gethomeworktype',
    mockMethod: 'post',
    mockUrl:
    '//yapi.235.mistong.com/mock/243/api/teacher/homework/gethomeworktype',
  },
  // 布置人
  getfixusers: {
    method: 'post',
    url: '/api/teacher/homework/getfixusers',
    mockMethod: 'post',
    mockUrl:
    '//yapi.235.mistong.com/mock/243/api/teacher/homework/getfixusers',
  },
  // 布置年级
  getgrades: {
    method: 'post',
    url: '/api/teacher/homework/getgrades',
    mockMethod: 'post',
    mockUrl:
    '//yapi.235.mistong.com/mock/243/api/teacher/homework/getgrades',
  },
  getHomeworkTypeList: { // 作业ID获取类型列表 //yapi.235.mistong.com/mock/307
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/postheadertypelist',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/postheadertypelist',
  },
  getHomeworkCourseList: { // 获取作业列表 //yapi.235.mistong.com/mock/307
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/gethomworklist',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/gethomworklist',
  },
  getHomeworkAddBasket: { // 加入作业篮子
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/addbasket',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/addbasket',
  },
  getHomeworkBasket: { // 获取作业篮子
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/getbaseketvideolist',
    mockMethod: 'post',
    mockUrl: '/api/teacher/assignhomeworkfortea/getbaseketvideolist',
  },
  getHomeworkRemove: { // 删除作业
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/removebaseket',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/removebaseket',
  },
  getHomeworkClearBasket: { // 清空作业篮
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/clearbaseket',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/clearbaseket',
  },
  getHomeworkGradeClass: { // 获取年级&班级
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/getgradeandclassinfo',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/getgradeandclassinfo',
  },
  getHomeworkPublish: { // 发布作业
    method: 'post',
    url: '/api/teacher/assignhomeworkfortea/submithomework',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/307/api/teacher/assignhomeworkfortea/submithomework',
  },
  courseRecommendations4Fraud: { // 获取推荐课程
    method: 'post',
    url: '/api/student/homework/CourseRecommendations4Fraud',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/385/api/student/homework/CourseRecommendations4Fraud',
  },
  getOaTaskList: {
    method: 'get',
    url: '/manageapi/fraud/PaperList',
    mockMethod: 'get',
    mockUrl: '//yapi.235.mistong.com/mock/385/manageapi/fraud/PaperList',
  },
  getOaTaskClassOptions: {
    method: 'get',
    url: '/manageapi/fraud/SchoolClasses4Fraud',
    mockMethod: 'get',
    mockUrl: '//yapi.235.mistong.com/mock/385/manageapi/fraud/SchoolClasses4Fraud',
  },
  publishOaTask: {
    method: 'post',
    url: '/manageapi/fraud/assignSpecificHomework',
    mockMethod: 'post',
    mockUrl: '//yapi.235.mistong.com/mock/385/manageapi/fraud/assignSpecificHomework',
  },
};

export default generator(URLS);

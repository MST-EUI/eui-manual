export default {
  studentApplyGetStatusOptions: {
    method: 'get',
    url: '/api/teacher/joinclass/statuslist',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/joinclass/statuslist',
  },
  studentApplyGetData: {
    method: 'get',
    url: '/api/teacher/joinclass/pagelist',
    mockMethod: 'get',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/joinclass/pagelist',
  },
  studentApplyPostResolve: {
    method: 'post',
    url: '/api/teacher/joinclass/agree',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/joinclass/agree',
  },
  studentApplyPostReject: {
    method: 'post',
    url: '/api/teacher/joinclass/reject',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/joinclass/reject',
  },
  studentApplyPostResolveBatch: {
    method: 'post',
    url: '/api/teacher/joinclass/batchagree',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/joinclass/batchagree',
  },
  studentApplyPostRejectBatch: {
    method: 'post',
    url: '/api/teacher/joinclass/batchreject',
    mockMethod: 'post',
    mockUrl: 'http://yapi.235.mistong.com/mock/243/api/teacher/joinclass/batchreject',
  },
};

import axios from 'axios';
import { notification, message } from 'antd';
// import { loginPage, logoutPage } from './url';
import { getQueryString } from '~/utils';
import assign from 'object-assign';

const fetcher = axios.create({
  withCredentials: false,
  timeout: 30000,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
});

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


fetcher.interceptors.request.use((config) => {
  const url = config.url;
  const apiPre = '/api/teacher/SummerStudySituationReport';

  config.headers.referUrl = location.href;
  if (!config.data) {
    config.data = {};
  }

  if (url.indexOf(apiPre) > -1) {
    const data = {
      schoolid: getQueryString('schoolid'),
      gradeid: getQueryString('gradeid'),
    };
    assign(config.data, data);
  }
  return config;
}, error => Promise.reject(error));


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    // 错误码特殊处理
    switch (response.data.code) {
      // 没有权限直接跳转到登录页
      case 703:
        location.href = response.data.data;
        // message.error(response.data.errmsg);
        break;
      default:
        break;
    }
    if (response.data.code !== 200) {
      console.error(`
      XHR request error, the request url is ${response.config.url},
      code is ${response.data.code},
      msg is ${response.data.msg}`);
      return Promise.reject({...response.data});
    }

    return response.data.data;
  }

  // 网络错误提示
  const errortext = codeMessage[response.status] || response.statusText;
  console.error(`请求错误 ${response.status}: ${response.config.url || null}`, errortext);

  // 是同弹框提示
  // notification.error({
  //   message: `请求错误 ${response.status}: ${response.config.url || null}`,
  //   description: errortext,
  // });
}


// 拦截器,response之后
fetcher.interceptors.response.use(response => checkStatus(response), e => Promise.reject(e));

// 添加请求拦截器
// fetcher.interceptors.request.use(config =>
//   // 在发送请求之前做某事，比如说 设置loading动画显示
//   config
//   , error =>
//   // 请求错误时做些事
//   Promise.reject(error),
// );

export default fetcher;
export const post = fetcher.post;
export const put = fetcher.put;
export const get = axios.get;
export const del = (url, params) => fetcher.delete(url, { params });

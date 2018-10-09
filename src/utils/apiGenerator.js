import request from './request';

const api = {};
export const generator = (URLS) => {
  const generalUrl = (key) => {
    const {method, url, mockUrl, mockMethod} = URLS[key];
    const result = {
      method: __MOCK__ ? mockMethod || 'get' : method,
      url: __MOCK__ ? mockUrl : url,
    };
    return result;
  };

  api.getUrl = key => generalUrl(key).url;

  Object.keys(URLS)
    .forEach((item) => {
      const { method, url } = generalUrl(item);
      switch (String(method).toUpperCase()) {
        case 'POST':
          api[item] = params => request.post(url, params);
          break;
        case 'GET':
          api[item] = params => request.get(url, {params});
          break;
        case 'DELETE':
          api[item] = params => request.del(url, {params});
          break;
        case 'PUT':
          api[item] = params => request.put(url, params);
          break;
        default:
          api[item] = params => request.post(url, params);
      }
    });
  return api;
};
export default api;

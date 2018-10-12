import i18n from '~/common/i18n';

const IS_DEV = process.env.NODE_ENV === 'development';
const routeUrlFixedReg = /[^#]*#/;
const menusArrayFlat = (arr = []) => {
  const result = {};
  const flat = (innerArr) => {
    innerArr.forEach((item) => {
      if (item.children && item.children.length) {
        flat(item.children);
      }
      const urlRemovedPathname = (item.url || '').replace(routeUrlFixedReg, ''); // replace pathname for prod env
      item.url = urlRemovedPathname;
      item.pid = typeof item.pid !== 'undefined' ? item.pid : item.parentid;
      result[item.url || item.id] = item;
    });
  };
  flat(arr);
  return result;
};
const getCurrentRoute = (route) => {
  if (route) {
    return route;
  }
  let currentRoute = '/';
  const routeReg = /#(\/[^?]*)/;
  const routeTmpMatch = location.hash.match(routeReg);
  if (routeTmpMatch && routeTmpMatch[1]) {
    currentRoute = routeTmpMatch[1];
  }
  return currentRoute;
};
const generateMenus = (data = [], role, currentRoute) => {
  // const currentRoute = getCurrentRoute();
  const flatMenusObj = menusArrayFlat(data);
  return data.map((item) => {
    const { id, title, url } = item;
    let { children } = item;
    let pid;
    let urlType;
    switch (role) {
      case 'student':
        urlType = item.urlType;
        pid = item.pid;
        break;
      case 'teacher':
        urlType = item.urltype;
        pid = item.parentid;
        break;
      default:
        urlType = 'normal';
    }
    // check is current route
    let isCurrent = false;
    const compareUrl = (url || '').replace(routeUrlFixedReg, ''); // replace pathname for prod env
    if (urlType === 'react') {
      item.url = compareUrl;
    }
    if (urlType === 'react' && compareUrl === currentRoute) {
      isCurrent = true;
    }
    // special route for current selected
    if (urlType === 'react' && compareUrl === '/classes/myClasses' && currentRoute === '/classes/studentJoinClass') {
      isCurrent = true;
    }
    // check is unfold
    let unfold = typeof item.unfold !== 'undefined' ? item.unfold : false;
    if (children && children.length) {
      if (flatMenusObj[currentRoute] && flatMenusObj[currentRoute].pid === id) {
        unfold = true;
      }
      children = generateMenus(children, role, currentRoute);
    } else {
      children = null;
    }
    if (id === 1) {
      // Components always unfold
      unfold = true;
    }
    return {
      ...item,
      id,
      pid,
      title,
      url: compareUrl,
      urlType,
      isCurrent,
      unfold,
      children,
    };
  });
};

export default {
  avatar: uid => (IS_DEV ? `http://my.test.mistong.com/User/Avatar?uid=${uid}` : `http://passport.ewt360.com/User/Avatar?uid=${uid}`),
  routeRedirect: (hashPath) => {
    const { protocol, hostname, port, pathname } = location;
    location.href = `${protocol}//${hostname}:${port}${pathname}#${hashPath}`;
  },
  addEvent: (name, callback, element = document, useCapture) => {
    if (element.addEventListener) {
      element.addEventListener(name, callback, useCapture);
    } else if (element.attachEvent) {
      element.attachEvent(`on${name}`, callback, useCapture);
    }
  },
  delEvent: (name, callback, element = document, useCapture) => {
    if (element.removeEventListener) {
      element.removeEventListener(name, callback, useCapture);
    } else if (element.attachEvent) {
      element.detachEvent(`on${name}`, callback, useCapture);
    }
  },
  videoSecondsParse: (secondsNum = 0) => {
    const numToColonStr = (num) => {
      if (Number(num) <= 0) {
        return '00';
      } else if (Number(num) < 10) {
        return `0${num}`;
      }
      return num;
    };
    const hours = Math.floor(secondsNum / 3600);
    const minutes = Math.floor((secondsNum - (hours * 3600)) / 60);
    const seconds = Math.floor(secondsNum - (hours * 3600) - (minutes * 60));
    const result = {
      hours,
      hourStr: hours > 0 ? `${hours} ${i18n('hour')} ` : '',
      minutes,
      minutesStr: `${minutes} ${i18n('minute')} `,
      seconds,
      secondsStr: `${seconds} ${i18n('second')}`,
    };
    result.colonStyleStr = `${hours ? `${numToColonStr(hours)}:` : ''}${numToColonStr(minutes)}:${numToColonStr(seconds)}`;
    result.i18nStyleStr = `${result.hourStr}${result.minutesStr}${result.secondsStr}`;
    return result;
  },
  indexOf: (arr, value) => {
    let result = -1;
    if (Array.prototype.indexOf) {
      result = arr.indexOf(value);
    } else {
      for (let i = 0, len = arr.length; i < len; i += 1) {
        if (arr[i] === value) {
          result = i;
        }
      }
    }
    return result;
  },
  getUrlParamValueByKey: (url, key) => {
    const reg = new RegExp(`${key}=([^&]*)`, 'i');
    const r = url.match(reg);
    return (r && r[1]) || '';
  },
  generateKeyForReact: (id) => {
    // TODO not stable
    if (id) {
      return id;
    }
    return `${new Date().getTime()}${(Math.random(0, 1) * 1000000).toFixed(0)}`;
  },
  // array flat for left menus
  menusArrayFlat,
  // get current route for react-router
  getCurrentRoute,
  generateMenus,
};

export const dateFormat = (date, format) => {
  date = new Date(date);
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return format;
};


export function timeFormat(ms, zh) {
  const h = Math.floor((ms / 1000 / 3600) / 60);
  const m = Math.floor((ms / 1000 / 60) % 60);
  const s = Math.floor((ms / 1000) % 60);
  const numFormat = n => ((`${n}`).length === 1 ? `0${n}` : n);
  if (zh) {
    return `${h}小时 ${m}分钟 ${s}秒`;
  }
  return `${numFormat(h)} : ${numFormat(m)} : ${numFormat(s)}`;
}

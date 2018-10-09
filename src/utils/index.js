

export const getQueryString = (name) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

export const getFlatMenuData = (menus) => {
  let keys = {};
  menus.forEach((item) => {
    if (item.childRoutes) {
      keys[item.path] = { ...item,
      };
      keys = { ...keys,
        ...getFlatMenuData(item.childRoutes),
      };
    } else {
      keys[item.path] = { ...item,
      };
    }
  });
  return keys;
};

export default { getQueryString };

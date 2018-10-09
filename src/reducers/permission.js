import assign from 'object-assign';
import {
  RECEIVE_PERMISSION,
  LEFT_MENUS_SWITCH,
} from '~/actions/actionTypes';

const receivePermission = (state, action) => {
  const { data } = action.payload;
  const {
    role,
    menuinfos: leftMenus,
    onliteschoolpermission: onlineSchoolPermission,
    onliteschoolurl: onlineSchoolUrl,
    xiaoshanpermission: xiaoshanSchoolPermission,
    schoolbaseresourcespermission: schoolBasedResourcePermission,
  } = data;
  return assign({}, state, {
    loading: false,
    leftMenus,
    role,
    onlineSchoolPermission,
    onlineSchoolUrl,
    xiaoshanSchoolPermission,
    schoolBasedResourcePermission,
  });
};

const leftMenusSwitch = (state, action) => {
  const { data } = action.payload;
  return assign({}, state, {
    leftMenus: data,
  });
};

const permission = (state = {
  loading: true,
  leftMenus: [],
  role: null,
}, action) => {
  const { type } = action;
  switch (type) {
    case RECEIVE_PERMISSION:
      return receivePermission(state, action);
    case LEFT_MENUS_SWITCH:
      return leftMenusSwitch(state, action);
    default:
      return state;
  }
};

export default permission;

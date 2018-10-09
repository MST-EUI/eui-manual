/**
 * 校本视频作业布置相关reducer
 */
import assign from 'object-assign';

import {
  HVT_SELECT_DATA,
  HVT_BASKET_DATA,
} from '~/actions/actionTypes';

const defaultState = {
  select: {
    kemuList: null,
    knowledgeTree: null,
    videos: null,
    availableGrades: null,
    knowledgetype: 1,
    knowledgeId: undefined,
  },
  basket: {

  },
};
export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case HVT_SELECT_DATA: {
      const select = assign({}, state.select, payload);
      return assign({}, state, {select});
    }
    case HVT_BASKET_DATA: {
      const basket = assign({}, state.basket, payload);
      return assign({}, state, {basket});
    }
    default:
      return state;
  }
};

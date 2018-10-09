import assign from 'object-assign';
import { combineReducers } from 'redux';
import {
  SA_RECEIVE_GET_DATA,
  SA_RECEIVE_GET_STATUS_OPTIONS,
} from '~/actions/actionTypes';

const statusOptions = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case SA_RECEIVE_GET_STATUS_OPTIONS:
      return [...payload];
    default:
  }
  return state;
};
const recordList = (state = { recordcount: 0, list: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SA_RECEIVE_GET_DATA:
      return assign({}, state, payload);
    default:
  }
  return state;
};

const studentApply = combineReducers({
  statusOptions,
  recordList,
});

export default studentApply;

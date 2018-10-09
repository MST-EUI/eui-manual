import { combineReducers } from 'redux';
import rootReducer from '~/reducers/';
import locationReducer from './location';

// 合并
export const makeRootReducer = asyncReducers => combineReducers({
  ...rootReducer,
  location: locationReducer,
  ...asyncReducers,
});

// 注入reducer
export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers));
};

export default makeRootReducer;

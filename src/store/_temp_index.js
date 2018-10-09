// 该文件代码即将废弃
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '~/reducers/';

const loggerMiddleware = createLogger();

const devApplyMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
);

const prodApplyMiddleware = applyMiddleware(
  thunkMiddleware,
);

export default createStore(rootReducer, process.env.NODE_ENV === 'development' ? devApplyMiddleware : prodApplyMiddleware);

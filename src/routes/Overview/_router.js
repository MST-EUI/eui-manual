import { injectReducer } from '~/store/reducers';

export default store => ({
  mid: module.id,
  path: '/overview',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      // 加载组件
      const Overview = require('.').default;

      // 加载modules
      // const reducer = require('./modules/index').default

      // 注入redux
      // injectReducer(store, { key: 'reducerKey', reducer })
      cb(null, Overview);
    });
  },
});

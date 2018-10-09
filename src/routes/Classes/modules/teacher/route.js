const getComponent = (nextState, callback) => {
  require.ensure([], (require) => {
    callback(null, require('./').default);
  }, 'detail');
};

export default {
  mid: module.id,
  getComponent,
};

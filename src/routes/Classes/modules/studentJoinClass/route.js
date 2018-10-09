const getComponent = (nextState, callback) => {
  require.ensure([], (require) => {
    callback(null, require('./').default);
  }, 'studentJoinClass');
};

export default {
  mid: module.id,
  getComponent,
};

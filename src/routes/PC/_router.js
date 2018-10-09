const modules = [];
((req) => {
  req.keys().forEach((key) => {
    const md = req(key).default;
    md.path = md.path || key.split('/')[2];
    modules.push(md);
  });
})(require.context('./', true, /\.\/modules\/[^/]+\/route.js$/));

const getComponent = (nextState, callback) => {
  require.ensure([], (require) => {
    callback(null, require('.').default);
  }, 'pc');
};

export default store => ({
  mid: module.id,
  path: 'pc',
  getComponent,
  childRoutes: [
    ...modules,
  ],
});

const reducers = {};
((req) => {
  req.keys().forEach((key) => {
    if (key.indexOf('index.js') === -1) {
      reducers[key.split('/')[1].split('.')[0]] = req(key).default;
    }
  });
})(require.context('./', true, /\.js$/));


export default reducers;

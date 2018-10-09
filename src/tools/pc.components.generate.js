const { copyDir } = require('./utils');

const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const chalk = require('chalk');

const components = require('./components.list');

const {
  log,
  error,
} = console;
const exists = (...p) => fs.existsSync(path.resolve(__dirname, ...p));
const relPath = (...p) => path.resolve(__dirname, ...p);
const NODE_MODULES_PREFIX = '../../node_modules/@mistong/';
const TARGET_DIR_PREFIX = '../routes/PC/modules';
const TARGET_DIR = relPath(TARGET_DIR_PREFIX);
const recreateJsFile = (filePath, componentName) => {
  if (exists(filePath)) {
    const originStr = fs.readFileSync(filePath).toString();
    const SRC_REG = /\/\* placeholder begin src \*\/\nimport .* from '(.*)';\n\/\* placeholder end src \*\//;
    const REACT_DOM_RENDER_REG = /\/\* placeholder begin ReactDOM \*\/([\s\S]*)\/\* placeholder end ReactDOM \*\//;
    const CLASS_BEGIN_REG = /\/\* placeholder begin class \*\/\n/;
    let resultStr = originStr;
    resultStr = resultStr.replace(SRC_REG, (match, p1) => match.replace(p1, `@mistong/${componentName}`));
    resultStr = resultStr.replace(REACT_DOM_RENDER_REG, '');
    resultStr = resultStr.replace(CLASS_BEGIN_REG, 'export default ');
    fs.writeFileSync(filePath, resultStr);
  }
};
const ROUTES_DEMO_CODE = `
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
    callback(null, require('./').default);
  }, 'detail');
};

export default {
  mid: module.id,
  getComponent,
  childRoutes: [
    ...modules,
  ],
};
`;

// rimraf.sync(TARGET_DIR);
// log('directory lib is removed');
// mkdirp.sync(TARGET_DIR);
// log('directory lib is created');

if (exists(NODE_MODULES_PREFIX)) {
  try {
    components.forEach((item) => {
      const targetDir = relPath(NODE_MODULES_PREFIX, `${item}`);
      if (exists(targetDir)) {
        const isKeepSrcRootDir = false;
        const currentDisDirName = String(item).replace('eui-', '');
        copyDir(
          relPath(NODE_MODULES_PREFIX, `${item}/demo`),
          relPath(TARGET_DIR_PREFIX, currentDisDirName),
          isKeepSrcRootDir,
        );
        log(chalk.blue(`${item} demo is copied`));
        // rewrite index.js code
        recreateJsFile(relPath(TARGET_DIR_PREFIX, `${currentDisDirName}/index.js`), item);
        log(chalk.blue(`${item} index.js is recreated`));
        fs.copyFileSync(relPath('./routes.demo.js'), relPath(TARGET_DIR_PREFIX, `${currentDisDirName}/route.js`));
        log(chalk.blue(`${item} route.js is created`));
      } else {
        log(chalk.red(`${item} has no directory demo`));
      }
    });
    log(chalk.green('files copy success'));
  } catch (e) {
    error(e);
  }
} else {
  log(chalk.red('directory node_modules is not exists, please try command npm i'));
}

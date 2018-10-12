const { copyDir } = require('./utils');

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');

const exists = (...p) => fs.existsSync(path.resolve(__dirname, ...p));
const relPath = (...p) => path.resolve(__dirname, ...p);
const DIST_DIR = relPath('../../dist/');
const EUI_SITE_DIR = relPath('../../../eui-site');
const {
  log,
} = console;

['img', 'js', 'style', 'index.html'].forEach((item) => {
  const dupliDir = relPath(EUI_SITE_DIR, item);
  if (exists(dupliDir)) {
    rimraf.sync(dupliDir);
    log(chalk.blue(`old eui-site/${item} removed`));
  }
});

copyDir(
  DIST_DIR,
  EUI_SITE_DIR,
  false,
);
log(chalk.green('files copy success'));

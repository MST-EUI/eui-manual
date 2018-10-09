const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const mkdirp = require('mkdirp');

const { log, error } = console;

const utils = {
  copyDir(src, dist, isKeepSrcRootDir = true) {
    const copy = (_src, _dist) => {
      const levelOneStat = fs.statSync(_src);
      const levelOneName = _src.split(path.sep)[_src.split(path.sep).length - 1];
      const levelOneDist = path.resolve(`${_dist}${path.sep}${levelOneName}`);
      if (levelOneStat.isDirectory()) {
        mkdirp(levelOneDist);
        const files = fs.readdirSync(_src);
        files.forEach((item) => {
          copy(path.resolve(`${_src}${path.sep}`, `${item}`), levelOneDist);
        });
      } else if (levelOneStat.isFile()) {
        fs.writeFileSync(levelOneDist, fs.readFileSync(_src));
      }
    };
    if (fs.existsSync(src)) {
      if (!fs.existsSync(dist)) {
        mkdirp.sync(dist);
      }
      if (isKeepSrcRootDir) {
        copy(src, dist);
      } else {
        const files = fs.readdirSync(src);
        files.forEach((item) => {
          copy(path.resolve(`${src}${path.sep}`, `${item}`), dist);
        });
      }
    } else {
      log(`${src} is not exists`);
    }
  },
  // open url in default browser
  open(url) {
    let command;
    switch (process.platform) {
      case 'darwin':
        command = 'open';
        break;
      case 'win32':
        command = 'explorer.exe';
        break;
      case 'linux':
        command = 'xdg-open';
        break;
      default:
        error('Can not open browser');
        return;
    }
    spawn(command, [url]);
  },
  // get absolute path to cwd
  cwdPath(...args) {
    return path.resolve(process.cwd(), ...args);
  },
  // get absolute path to __dirname
  relPath(...args) {
    return path.resolve(__dirname, ...args);
  },
};


module.exports = utils;

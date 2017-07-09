const chokidar = require('chokidar');
const { execFile } = require('child_process');
const { Set } = require('immutable');

const watcher = chokidar.watch('.', {
  ignored: ['**/node_modules', '.git', '**/build'],
  cwd: '.'
});
let copySource = Set();
let inTimer = false;
const DELAY = 500;

function addToCopySource(path) {
  copySource = copySource.add(path);
  if (inTimer) {
    return;
  }
  initSyncCall();
}

function initSyncCall() {
  inTimer = true;
  setTimeout(() => {
    const argString = copySource.reduce((acc, val) => (
      acc + ' ' + val
    ), '');
    execFile('./sync', ['\"'+argString+'\"'], (err, stdout, stderr) => {
      console.log(stdout);
    });
    copySource = Set();
    inTimer = false;
  }, DELAY);
}

watcher
  .on('add', path => {
    addToCopySource(path);
  })
  .on('change', path => {
    addToCopySource(path);
  });

/**
 * Copy files from src to dest
 */
const fs = require('fs');
const _p = require('path');
const path = (...subpaths) => _p.resolve(...subpaths);
const copy = (src, dest) => {
  fs.copyFileSync(path(...src), path(...dest),
    (err) => {
      if (err) throw err;

      console.log(`${_p.join(src)} copied to ${_p.join(dest)}`);
    }
)};
copy(['src', 'index.html'], ['dist', 'index.html']);
copy(['node_modules', 'three', 'build', 'three.js'], ['dist', 'three.js']);
copy(['src', 'img', 'smoke-1.png'], ['dist', 'smoke-1.png']);


/**
 * Hot reload (no auto refresh)
 */
const watcher = require('chokidar').watch(path('dist'));
watcher.on('ready', () => {
  watcher.on('all', () => {
    console.log('File change detected! Clearing module cache from server');
    for (const id in require.cache) {
      if (/[\/\\]dist[\/\\]/.test(id)) delete require.cache[id];
    }
  });
});


/**
 * Run a server that serves static files
 */
const express = require('express');
const app = express();
app.use(express.static(path('dist')));

const port = 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));


/**
 * Opens your browser automatically
 */
const open = require('open');
open(`http://localhost:${port}`);

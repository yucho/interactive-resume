/**
 * Copy files from src to dest
 */
const fs = require('fs');
const path = (...subpaths) => require('path').resolve(...subpaths);
fs.copyFileSync(path('src', 'index.html'), path('dist', 'index.html'),
    (err) => {
      if (err) throw err;

      console.log('src/index.html copied to dist');
    }
);


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

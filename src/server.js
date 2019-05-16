const express = require('express');
const path = require('path');
const fs = require('fs');

const src = (file) => path.resolve(__dirname, file);
const dest = (...file) => path.resolve(__dirname, '..', 'dist', ...file);
fs.copyFileSync(src('index.html'), dest('index.html'), (err) => {
  if (err) throw err;

  console.log('index.html copied to dist');
});

const app = express();
app.use(express.static(dest()));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server is running on port ${port}`));

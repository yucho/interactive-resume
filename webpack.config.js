const path = require('path');
const root = (...paths) => path.resolve(__dirname, ...paths);

module.exports = {
  entry: root('src', 'index.js'),
  output: {
    path: root('dist'),
    filename: 'interactive-resume.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: (loader) => [require('postcss-import')(), require('postcss-cssnext')(), require('autoprefixer')(), require('cssnano')()]
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  target: 'web'
};
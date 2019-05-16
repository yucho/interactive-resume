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
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: (loader) => [require('postcss-import')(), require('postcss-cssnext')(), require('cssnano')()]
            }
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  target: 'web'
};

const path = require('path');
const root = (...paths) => path.resolve(__dirname, ...paths);

module.exports = {
  mode: 'production',
  entry: root('src', 'index.js'),
  output: {
    path: root('dist'),
    filename: 'interactive.js',
    library: 'Interactive',
    libraryTarget: 'window',
    libraryExport: 'default'
  },
  externals: {
    THREE: 'THREE'
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

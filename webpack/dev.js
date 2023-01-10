const Html = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: [
      'core-js/stable/promise',
      'core-js/stable/symbol',
      path.resolve(__dirname, '/src/app/app.js')
    ],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: /node_modules[\\/]core-js[\\/].*/,
              presets: [
                ['@babel/preset-env', {
                  useBuiltIns: 'entry',
                  corejs: '3.21.1',
                  modules: 'auto',
                  targets: { esmodules: true },
                }],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Html({
      template: path.resolve(__dirname, '/src/app/index.html')
    }),
  ],
  devServer: {
    hot: true,
  },
};

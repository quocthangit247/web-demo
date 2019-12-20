const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

module.exports = {
  watch: true,
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.scss$/, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'public'),
  // },
  devServer: {
    inline: true,
    open: true,
    host: '127.0.0.1',
    port: 3000,
    hot: true,
    liveReload: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    compress: true,
  },
  plugins: [htmlPlugin],
};

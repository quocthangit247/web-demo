const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Extract CSS
const extractCSS = new ExtractTextPlugin('style', 'css', 'less', 'sass', 'scss');

module.exports = {
  // devtool: 'source-map',
  watch: false,
  entry: './src/index.tsx',
  output: {
    // sourceMapFilename: '[file].map',
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract(['css-loader', 'postcss-loader']),
      },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.tsx?$/, exclude: /node_modules/, loader: 'ts-loader' },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'dist/css',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    htmlPlugin,
    extractCSS,
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
    new ExtractTextPlugin('[name].min.css', {
      allChunks: true,
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
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
  optimization: {
    minimize: true,
    // minify js
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};

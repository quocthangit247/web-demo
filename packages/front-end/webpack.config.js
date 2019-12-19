module.exports = (env, argv) => ({
  // watch: true,
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: argv.mode === 'development' ? 'source-map' : false,
  module: {
    rules: [
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.tsx?$/, loader: 'babel-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  devServer: {
    inline: true,
    host: '127.0.0.1', // whatever computer name you prefer
    port: 3000, //whatever port you prefer
    compress: true,
  },
});

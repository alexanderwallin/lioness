const path = require('path')
const babelConfig = require('../babel.config.js')

module.exports = {
  entry: path.join(__dirname, 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cwd: path.resolve(__dirname, '..'),
            ...babelConfig,
          },
        },
      },
      {
        test: /\.json$/,
        include: path.resolve(path.join(__dirname, '..')),
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, 'node_modules'),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: '0.0.0.0',
    port: process.env.PORT || 8111,
    historyApiFallback: {
      index: 'index.html',
    },
    inline: true,
  },
}

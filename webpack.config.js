var path = require('path')

module.exports = {
  devtool: 'inline-source-map',
  entry: path.join(__dirname, 'examples', 'src', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'examples', 'build'),
    publicPath: '/assets/',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
}

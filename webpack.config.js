const path = require('path');
const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');
module.exports = {
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.js?/,
        include: SRC_DIR,
        loader: 'babel-loader',
      },
      { test: /\.css$/, loader: 'style-loader' },
      {
        test: /\.css$/,
        include: SRC_DIR,
        loader: 'css-loader',
        query: {
          modules: true,
          localIdentName: '[name]__[local]___[hash:base64:5]',
        },
      },
    ],
  },
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
  },
};

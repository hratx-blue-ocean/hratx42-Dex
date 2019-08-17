const path = require('path');
const webpack = require('webpack');
const SRC_DIR = path.join(__dirname, '/src');
const DIST_DIR = path.join(__dirname, '/public');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
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
        include: SRC_DIR,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env', 'minify'],
        },
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
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
            booleans_as_integers: true,
            passes: 5,
            unsafe_arrows: true,
            unsafe_undefined: true
          },
          ecma: 6,
          output: {
            comments: false
          }
        },
      }),
    ],
  },
  devServer: {
    contentBase: DIST_DIR,
    compress: true,
    port: 9000,
  },
};

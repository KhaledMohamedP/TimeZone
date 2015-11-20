'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "main.js",
  output: "bundle.js",
  devtool: 'source-map',
  module: {
    preLoaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}
    ],
    loaders: [
      {test: /\.css$/, loaders: ['style', 'css']},
      {test: /\.html$/, loader: 'raw'}
    ]
  }
};
'use strict';
var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.join(__dirname),
  entry: "./main.js",
  output: {
  	filename: "./bundle.js"
  },
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
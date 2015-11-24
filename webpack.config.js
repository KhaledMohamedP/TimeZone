var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname),
    entry: "./src/js/main.js",
    output: {
        filename: "./dist/js/bundle.js"
    },
    devtool: 'source-map',
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'jshint-loader'
        }],
        loaders: [{
            test: /\.css$/,
            loaders: ['style', 'css']
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    }
};

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/Main.js',
    output: { path: __dirname, filename: 'public/js/bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};

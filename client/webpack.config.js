var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/Main.js',
    output: { path: __dirname, filename: 'public/js/bundle.js' },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ],
        vue: {
            loaders: {
                js: 'babel'
            }
        }
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

var webpack = require('webpack');

module.exports = {
    entry: __dirname + '/src/app.js',
    output: { path: __dirname, filename: 'public/js/bundle.js' },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&name=public/fonts/[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
                loader: 'file?name=public/fonts/[name].[ext]'
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

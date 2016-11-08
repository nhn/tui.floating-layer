var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var pkg = require('./package.json');
var shouldMinify = process.argv.indexOf('--minify') > -1;

var filename = shouldMinify ? 'floatingLayer.min.js' : 'floatingLayer.js';
var VERSION = pkg.version;

var minifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: true,
    mangle: true
});
var bannerPlugin = new webpack.BannerPlugin(
    filename +
    '\nVersion: ' + VERSION
);
var plugins = shouldMinify ? [bannerPlugin, minifyPlugin] : [bannerPlugin];

module.exports = {
    entry: './index.js',
    output: {
        path: 'dist',
        filename: filename
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                exclude: /(test|node_modules|bower_components)/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /(test|node_modules|bower_components)/,
                loader: 'babel'
            }
        ]
    },
    plugins: plugins
};

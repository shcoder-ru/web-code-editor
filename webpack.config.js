'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageConf = require('./package.json');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('assets/app.css');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: './client',
    output: {
        path: __dirname + '/dist',
        filename: 'assets/app.js',
        library: 'App'
    },
    watch: isDevelopment,
    devtool: isDevelopment ? 'inline-source-map' : null,
    devServer: {
        contentBase: './dist',
    },
    postcss: [
        autoprefixer({
            browsers: ['last 4 versions']
        })
    ],
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(env)
        }),
        new HtmlWebpackPlugin({
            minify: !isDevelopment ? {
                html5: true,
                removeComments: true,
                collapseWhitespace: true
            } : false,
            hash: true,
            title: packageConf.name,
            template: './client/ejs/index.ejs',
        }),
        extractCSS
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel?presets[]=es2015&plugins[]=transform-runtime'
        }, {
            test: /\.ejs$/,
            loader: 'ejs-loader?variable=$'
        }, {
            test: /\.less$/,
            loader: extractCSS.extract('css!less!postcss')
        }]
    }
};

if (env === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /assets\/.*\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: {removeAll: true } },
            canPrint: true
        })
    );
}

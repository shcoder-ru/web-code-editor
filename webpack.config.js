'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageConf = require('./package.json');

module.exports = {
    entry: './client',
    output: {
        path: __dirname + '/dist',
        filename: 'client.js',
        library: 'App'
    },
    watch: isDevelopment,
    devtool: isDevelopment ? 'inline-source-map' : null,
    devServer: {
        contentBase: './dist',
    },
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
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
        }, {
            test: /\.ejs$/,
            loader: 'ejs-loader',
            query: {
                variable: '$'
            }
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
        })
    );
}

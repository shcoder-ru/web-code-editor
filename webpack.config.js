'use strict';

const webpack = require('webpack');
const env = process.env.NODE_ENV || 'development';
const isDevelopment = env === 'development';

module.exports = {
    entry: './client',
    output: {
        path: __dirname + '/dist',
        filename: 'client.js',
        library: 'App'
    },
    watch: isDevelopment,
    devtool: isDevelopment ? 'inline-source-map' : null,
    plugins: [
        new webpack.DefinePlugin({
            env: JSON.stringify(env)
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

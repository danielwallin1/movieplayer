const path = require('path');
const webpack = require('webpack');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: [
        './client'
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|otf|svg)$/,
                loader: 'url-loader?limit=100000'
            }

        ]
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, '..', 'dist', 'client', 'static'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    node: {
        console: false,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};
'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        home: './Scripts/src/home/index.js'
    },
    output: {
        path: path.resolve(__dirname, './Bundle'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, './Scripts/src')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: [path.resolve(__dirname, './Scripts')]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.resolve(__dirname, './Scripts')]
            }
        ]
    },
    devtool: '#source-map',
    devServer: {
        host: 'localhost',
        port: 9090,
        publicPath: '/Bundle',
        contentBase: '/Scripts'
    },
}

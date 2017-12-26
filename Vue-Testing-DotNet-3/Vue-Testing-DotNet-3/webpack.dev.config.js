'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
        home: './Scripts/src/home/index.ts',
        login: './Scripts/src/home/login.ts'
    },
    output: {
        path: path.resolve(__dirname, './Bundle'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json', '.css'],
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
                include: [
                    path.resolve(__dirname, './Scripts/src'), 
                    path.resolve(__dirname, 'node_modules/bootstrap-vue')
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [path.resolve(__dirname, './Scripts')]
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.scss?$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css?$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            { 
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'file-loader' 
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

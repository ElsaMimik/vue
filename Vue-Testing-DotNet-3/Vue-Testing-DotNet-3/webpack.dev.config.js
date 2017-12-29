'use strict'

const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        home: './Scripts/src/home/index.ts',
        login: './Scripts/src/home/login.ts'
    },
    output: {
        path: path.resolve(__dirname, 'Bundle'),
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
                 use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            { 
                test: /\.png$/, 
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/Bundle/',
                    outputPath: 'png/'
                }  
            },
            { 
                test: /\.svg/, 
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/Bundle/',
                    outputPath: 'svg/'
                }  
            },
            { 
                test: /\.(woff|woff2|eot|ttf)$/, 
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/Bundle/',
                    outputPath: 'fonts/'
                }  
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
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compress: true
            }
        })
    ]
}

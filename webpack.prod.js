/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config({path: 'production.env'});

const PATHS = {
    app: path.resolve(__dirname, 'resources/js'),
    base: path.resolve(__dirname, 'resources'),
    entry: path.resolve(__dirname, 'resources/js/app.js'),
    image: path.resolve(__dirname, 'resources/images'),
    scss: path.resolve(__dirname, 'resources/scss'),
    dist: path.resolve(__dirname, 'dist'),
    nodeModules: path.resolve(__dirname, 'node_modules')
};

module.exports = env => ({
    mode: 'production',
    entry: PATHS.entry,
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: PATHS.nodeModules,
                include: PATHS.app,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env', 
                            '@babel/preset-react',
                            '@babel/typescript'
                        ]
                    }
                }
            },
            {
                test: /\.(sass|css|scss)$/,
                include: [ PATHS.base, PATHS.nodeModules ],
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".ts", ".tsx"],
        alias: {
            Components: path.resolve(__dirname, 'resources/js/components/'),
            API: path.resolve(__dirname, 'resources/js/api/'),
            Redux: path.resolve(__dirname, 'resources/js/redux/'),
            Helpers: path.resolve(__dirname, 'resources/js/helpers/index.tsx'),
            Routes: path.resolve(__dirname, 'resources/js/pages/'),
            Paths: path.resolve(__dirname, 'resources/js/pages/index.tsx'),
            Images: path.resolve(__dirname, 'resources/images/'),
            Variables: path.resolve(__dirname, 'resources/scss/_variables.scss')
        }
    },
    output: {
        path: PATHS.dist,
        filename: '[name].bundle.js',
        clean: true,
        publicPath: '/'
    },
    plugins: [
        require('autoprefixer'),
        new HtmlWebpackPlugin({
            title: 'Simple Trader UI',
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
        })
    ]
});
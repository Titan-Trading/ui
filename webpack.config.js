const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PATHS = {
    app: path.resolve(__dirname, 'resources/js'),
    base: path.resolve(__dirname, 'resources'),
    entry: path.resolve(__dirname, 'resources/js/app.js'),
    image: path.resolve(__dirname, 'resources/images'),
    scss: path.resolve(__dirname, 'resources/scss'),
    dist: path.resolve(__dirname, 'dist')
};

module.exports = env => ({
    entry: PATHS.entry,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                include: PATHS.app,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                include: PATHS.base,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(scss|css)$/,
                include: PATHS.base,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                include: PATHS.image,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 500,
                        name: 'media/[path][name].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: PATHS.dist,
        filename: 'app.js',
    },
    plugins: [
        require('autoprefixer'),
        new HtmlWebpackPlugin({
            title: 'Simple Trader UI',
            template: 'index.html'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        client: {
            overlay: true
        },
        compress: false,
        historyApiFallback: true,
        hot: true,
        port: 3000,
        open: true
    }
});
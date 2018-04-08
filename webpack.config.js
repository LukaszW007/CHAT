const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');
const env = process.env.NODE_ENV || 'development';

var plugins = [
    new HtmlWebpackPlugin({
        template: 'client/index.html',
        filename: 'index.html',
        inject: 'body',
    }),
];

if (env === 'production') {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin(),
        new OptimizeJsPlugin({
            sourceMap: false,
        })
    );
} else {
    plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
    entry: ['react-hot-loader/patch', './client/index.js'],
    output: {
        path: path.resolve(__dirname, 'server/static'),
        filename: 'app.bundle.js',
    },
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react'],
                    plugins: ['react-hot-loader/babel'],
                },
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            },
        ],
    },
    devServer: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true,
            },
        },
        contentBase: './build',
        hot: true,
    },
    plugins,
};

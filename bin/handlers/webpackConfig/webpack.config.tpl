const webpack = require('webpack');
const packageConfig = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const contextPath = path.join(__dirname, './src');
const appEnv = process.env.NODE_ENV || 'development';
const isProduction = appEnv == 'production';
const isDevelopment = appEnv == 'development';
const destinationDir = (isProduction) ? `./dist` : `./build`;

module.exports = {

    context: contextPath,

    devtool: "#source-map",

    entry: {
        app: <@=ENTRY.FILE=@>
    },

    resolve: {
        extensions: <@=RESOLVE.EXTENSIONS=@>,

        modules: [contextPath, "node_modules"]
    },

    output: {
        path: path.resolve(__dirname, destinationDir),
        filename: 'bundle.js'
    },

    module: {
        rules: <@=MODULE.RULES=@>
    },

    plugins: [

        new HtmlWebpackPlugin({
            inject: false,
            template: '../views/index.html'
        }),

        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.ProvidePlugin({
            'Promise': 'es6-promise'
        }),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(appEnv),
            'process.env.VERSION': JSON.stringify(packageConfig.version)
        }),

        <@=PLUGINS=@>
    ]
};

var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

var pkg = require('./package.json');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    entry: [
        PATHS.app
    ],
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.jsx?$/, loaders: ['babel'], include: PATHS.app },
            {test: /\.css$/, loaders: ['style', 'css'], include: PATHS.app }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'react-redux-router',
            appMountId: 'app'
        })
    ]
}

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,

            stats: 'errors-only',

            host: process.env.HOST,
            port: process.env.PORT
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        entry: {
            app: APP_PATH,
            vendor: Object.keys(pkg.dependencies)
        },
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js'
        },
        module: {
            loaders: [
                {test: /\.jsx?$/, loaders: ['babel'], include: PATHS.app },
                {test: /\.less$/, loader: 'style!css!less', include: PATHS.app },
                {test: /\.css$/, loader: 'style!css', include: PATHS.app },
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192', include: PATHS.app },
                {test: /\.(woff|woff2)$/, loader: 'url-loader?limit=100000', include: PATHS.app }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    })
}







const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpack = require('webpack');
const merge = require('webpack-merge');

const pkg = require('./package.json');

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
            {test: /\.jsx?$/, loaders: ['babel'], include: PATHS.app }
        ]
    },
    plugins: [
        new HtmlwebpackPlugin({
            template: 'node_modules/html-webpack-template/index.html',
            title: 'react-redux-router',
            appMountId: 'app'
        }),
        new webpack.DefinePlugin({  
            __DEBUG__: JSON.stringify(JSON.parse((TARGET === 'start') || 'false'))
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
        module: {
            loaders: [
                {test: /\.less$/, loader: 'style!css!less', include: PATHS.app },
                {test: /\.css$/, loaders: ['style', 'css'], include: PATHS.app }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    })
}

if(TARGET === 'build') {
    const vendors = Object.keys(pkg.dependencies).filter((v) => {
        return v!== 'express'
    })

    module.exports = merge(common, {
        entry: {
            app: PATHS.app,
            vendors: vendors
        },
        output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].js',
        },
        module: {
            loaders: [
                {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less'), include: PATHS.app },
                {test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css'), include: PATHS.app },
                {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192', include: PATHS.app },
                {test: /\.(woff|woff2)$/, loader: 'url-loader?limit=100000', include: PATHS.app }
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({name:'vendors'}),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({  
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new CleanPlugin([PATHS.build]),
            new ExtractTextPlugin('[name].[contenthash:20].css')
        ]
    })
}







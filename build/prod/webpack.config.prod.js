const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    CopyPlugin = require('copy-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    HtmlPlugin = require('html-webpack-plugin'),
    HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin'),
    CompressionPlugin = require('compression-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,

    config = require('../config.js'),
    baseWebpackConfig = require('../webpack.config.base.js'),
    utils = require('../utils.js'),

    env = process.env.NODE_ENV,
    vendorsAssets = require(utils.assetsVendorsAbsolutePath('vendors-assets.json', env));

module.exports = merge(baseWebpackConfig, {

    mode: 'production',

    devtool: false,

    output: {
        path: config[env].assetsRoot,
        filename: utils.assetsSubPath('js/[name].[chunkhash].js', env),
        chunkFilename: utils.assetsSubPath('js/[id].[chunkhash].js', env)
    },

    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'commons',
                    chunks: 'all'
                }
            }
        }
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: `'${env}'`
            }
        }),

        new CopyPlugin([{
            from: path.resolve(__dirname, '../../static'),
            to: config.assetsSubDirectory,
            ignore: ['.*']
        }]),

        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('polyfill-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('moment-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('react-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('tools-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('chart-manifest.json', env))
        }),

        new MiniCssExtractPlugin({
            filename: 'style/[name].[hash:7].css',
            chunkFilename: '[id].[hash:7].css'
        }),

        new HtmlPlugin({
            filename: config[env].index,
            template: './src/index.html',
            favicon: './src/assets/images/favicon.ico',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            },
            chunksSortMode: 'none'
        }),

        new HtmlIncludeAssetsPlugin({
            assets: [
                vendorsAssets['polyfill'].js,
                vendorsAssets['moment'].js,
                vendorsAssets['react'].js,
                vendorsAssets['tools'].js,
                vendorsAssets['chart'].js
            ],
            append: false
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            cache: true,
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 1,
            minRatio: 0.8
        }),

        new BundleAnalyzerPlugin()

    ]

});

const path = require('path'),
    webpack = require('webpack'),
    merge = require('webpack-merge'),
    CopyPlugin = require('copy-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
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
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [
            new OptimizeCSSAssetsPlugin({})
        ]
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
            manifest: require(utils.assetsVendorsAbsolutePath('dllPolyfill-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('dllMoment-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('dllReact-manifest.json', env))
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(utils.assetsVendorsAbsolutePath('dllTools-manifest.json', env))
        }),

        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: utils.assetsSubPath('style/[id].[contenthash].css')
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
                vendorsAssets['dllPolyfill'].js,
                vendorsAssets['dllMoment'].js,
                vendorsAssets['dllReact'].js,
                vendorsAssets['dllTools'].js
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

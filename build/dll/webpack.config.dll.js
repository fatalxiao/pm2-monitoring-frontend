const webpack = require('webpack'),
    AssetsPlugin = require('assets-webpack-plugin'),
    CompressionPlugin = require('compression-webpack-plugin'),

    config = require('../config.js'),
    utils = require('../utils.js'),

    env = process.env.NODE_ENV,
    library = '[name]_lib';

module.exports = {

    mode: 'production',

    entry: {
        'dllPolyfill': ['@babel/polyfill'],
        'dllMoment': ['moment'],
        'dllReact': ['react', 'react-dom', 'react-redux', 'react-router', 'react-router-config', 'react-router-dom',
            'react-router-redux', 'redux', 'redux-thunk', 'react-transition-group'],
        'dllChart': ['echarts', 'echarts-for-react'],
        'dllTools': ['lodash', 'classnames', 'history', 'dom-helpers']
    },

    output: {
        publicPath: './',
        path: config[env].assetsRoot,
        filename: utils.assetsSubPath('vendors/[name].[chunkhash].js', env),
        library
    },

    plugins: [

        new webpack.DllPlugin({
            context: __dirname,
            path: utils.assetsVendorsAbsolutePath('[name]-manifest.json', env),
            name: library
        }),

        new AssetsPlugin({
            path: config[env].assetsRoot,
            filename: utils.assetsSubPath('vendors/vendors-assets.json', env)
        }),

        new CompressionPlugin({
            test: new RegExp('\\.(' + config.productionGzipExtensions.join('|') + ')$'),
            cache: true,
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            threshold: 1,
            minRatio: 0.8
        })

    ]

};

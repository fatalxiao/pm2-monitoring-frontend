const path = require('path');

module.exports = {

    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],

    development: {
        port: 9617,
        srcRoot: path.resolve(__dirname, '../src'),
        index: path.resolve(__dirname, '../src/index.html'),
        assetsVirtualRoot: path.posix.join('/', 'static'),
        proxyTable: {
            '/pms': 'http://localhost:9616'
        }
    },

    production: {
        port: 9617,
        index: path.resolve(__dirname, '../dist/index.html'),
        rootDirectory: 'dist',
        assetsDirectory: 'dist',
        assetsRoot: path.resolve(__dirname, '../dist'),
        proxyTable: {
            '/pms': 'http://localhost:9616'
        }
    }

};
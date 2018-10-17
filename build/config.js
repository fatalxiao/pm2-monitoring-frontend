const path = require('path');

module.exports = {

    assetsPublicPath: '/',
    assetsDirectory: 'dist',
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],

    development: {
        port: 9617,
        srcRoot: path.resolve(__dirname, '../src'),
        index: path.resolve(__dirname, '../src/index.html'),
        assetsVirtualRoot: path.posix.join('/', 'static'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        proxyTable: {
            '/pm': 'http://localhost:9616',
            '/ws/pm': 'ws://localhost:9616'
        }
    },

    production: {
        port: 9617,
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        proxyTable: {
            '/pm': 'http://localhost:9616',
            '/ws/pm': 'ws://localhost:9616'
        }
    }

};

const path = require('path');

module.exports = {

    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],

    development: {
        port: 4000,
        srcRoot: path.resolve(__dirname, '../src'),
        index: path.resolve(__dirname, '../src/index.html'),
        assetsVirtualRoot: path.posix.join('/', 'static'),
        proxyTable: {
            '/dpe': 'http://localhost:4100'
        }
    },

    production: {
        port: 4001,
        index: path.resolve(__dirname, '../dist/index.html'),
        rootDirectory: 'dist',
        assetsDirectory: 'dist',
        assetsRoot: path.resolve(__dirname, '../dist'),
        proxyTable: {
            '/dpe': 'http://localhost:4100'
        }
    }

};
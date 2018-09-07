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
        rootDirectory: 'dist/dist-dev',
        assetsDirectory: 'dist/dist-dev/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-dev/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'http://10.200.159.15:10000'
        }
    },

    testing: {
        port: 9617,
        index: path.resolve(__dirname, '../dist/dist-test/dist/index.html'),
        rootDirectory: 'dist/dist-test',
        assetsDirectory: 'dist/dist-test/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-test/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'https://testapi.travelrtd.com'
        }
    },

    production: {
        port: 9617,
        index: path.resolve(__dirname, '../dist/dist-prod/dist/index.html'),
        rootDirectory: 'dist/dist-prod',
        assetsDirectory: 'dist/dist-prod/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-prod/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'http://api.travelrtd.com'
        }
    }

};
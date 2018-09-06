const path = require('path');

module.exports = {

    assetsPublicPath: '/',
    assetsSubDirectory: 'static',
    productionGzipExtensions: ['js', 'css'],

    development: {
        port: 3010,
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
        port: 3011,
        index: path.resolve(__dirname, '../dist/dist-test/dist/index.html'),
        rootDirectory: 'dist/dist-test',
        assetsDirectory: 'dist/dist-test/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-test/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'https://testapi.travelrtd.com'
        }
    },

    'testing-report': {
        port: 3011,
        index: path.resolve(__dirname, '../dist/dist-test-report/dist/index.html'),
        rootDirectory: 'dist/dist-test-report',
        assetsDirectory: 'dist/dist-test-report/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-test-report/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'https://testapi.travelrtd.com'
        }
    },

    'testing-bing': {
        port: 3011,
        index: path.resolve(__dirname, '../dist/dist-test-bing/dist/index.html'),
        rootDirectory: 'dist/dist-test-bing',
        assetsDirectory: 'dist/dist-test-bing/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-test-bing/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'https://testapi.travelrtd.com'
        }
    },

    demo: {
        port: 3012,
        index: path.resolve(__dirname, '../dist/dist-demo/dist/index.html'),
        rootDirectory: 'dist/dist-demo',
        assetsDirectory: 'dist/dist-demo/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-demo/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'http://35.165.139.55'
        }
    },

    production: {
        port: 3013,
        index: path.resolve(__dirname, '../dist/dist-prod/dist/index.html'),
        rootDirectory: 'dist/dist-prod',
        assetsDirectory: 'dist/dist-prod/dist',
        assetsRoot: path.resolve(__dirname, '../dist/dist-prod/dist'),
        proxyTable: {
            '/dplatform-cloud-gateway': 'http://api.travelrtd.com'
        }
    }

};
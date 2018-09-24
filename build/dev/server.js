const opn = require('opn'),
    webpack = require('webpack'),
    proxyMiddleware = require('http-proxy-middleware'),
    history = require('connect-history-api-fallback'),
    log = require('friendly-errors-webpack-plugin/src/output'),

    config = require('../config.js'),
    utils = require('../utils.js'),

    port = process.env.PORT || config.development.port,
    uri = 'http://localhost:' + port,

    proxyTable = config.development.proxyTable,

    express = require('express'),
    app = express(),

    webpackConfig = require('./webpack.config.dev.js'),
    compiler = webpack(webpackConfig),

    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: 'error'
    }),

    hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: false
    });

compiler.hooks.compilation.tap('html-webpack-plugin-after-emit', () => {
    hotMiddleware.publish({action: 'reload'});
});

// build proxies
Object.keys(proxyTable).forEach(context => {

    let options = proxyTable[context];

    if (typeof options === 'string') {
        options = {
            target: options,
            changeOrigin: true,
            logLevel: 'error'
        };
    }

    options.onProxyReq = (proxyReq, req) => {

        // add ip to header
        const ip = utils.getClientIp(req);
        ip && proxyReq.setHeader('ip', utils.ipParse(ip));

        // add token to header when token in url query
        if (req.headers && !req.headers.token && req.query && req.query.token) {
            proxyReq.setHeader('token', req.query.token);
        }

    };

    app.use(proxyMiddleware(options.filter || context, options));

});

app
.use(history())
.use(devMiddleware)
.use(hotMiddleware)
.use(config.development.assetsVirtualRoot, express.static('./static'));

devMiddleware.waitUntilValid(() => {
    log.title('success', 'DONE', `Listening At ${uri} `);
});

module.exports = app.listen(port, err => {

    if (err) {
        return console.error(err);
    }

    opn(uri);

});
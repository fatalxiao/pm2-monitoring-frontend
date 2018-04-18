const opn = require('opn'),
    webpack = require('webpack'),
    proxyMiddleware = require('http-proxy-middleware'),
    history = require('connect-history-api-fallback'),

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
        log: console.log
    });

compiler.plugin('compilation', compilation => {
    compilation.plugin('html-webpack-plugin-after-emit', () => {
        hotMiddleware.publish({action: 'reload'});
    });
});

Object.keys(proxyTable).forEach(context => {

    let options = proxyTable[context];

    if (typeof options === 'string') {
        options = {
            target: options,
            changeOrigin: true
        };
    }

    options.onProxyReq = (proxyReq, req, res) => {

        const ip = utils.getClientIp(req);
        ip && proxyReq.setHeader('ip', utils.ipParse(ip));

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
    console.log('> Listening at ' + uri + '\n');
});

module.exports = app.listen(port, err => {

    if (err) {
        return console.log(err);
    }

    opn(uri);

});
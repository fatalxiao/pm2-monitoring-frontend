const express = require('express'),
    path = require('path'),
    proxyMiddleware = require('http-proxy-middleware'),
    history = require('connect-history-api-fallback'),
    compression = require('compression'),

    config = require('./config.js'),

    app = express(),
    port = process.env.port || config.serverPort,
    uri = 'http://localhost:' + port,
    proxyTable = config.proxyTable;

Object.keys(proxyTable).forEach(context => {

    var options = proxyTable[context];

    if (typeof options === 'string') {
        options = {
            target: options,
            ws: true,
            changeOrigin: true
        };
    }

    app.use(proxyMiddleware(options.filter || context, options));

});

app
.use(compression())
.use(history())
.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, path) => {
        res.setHeader('Cache-Control', path.endsWith('index.html') ?
            'no-cache, no-store, no_store, max-age=0, must-revalidate' : 'max-age=2592000'
        );
    }
}))
.listen(port, err => {

    if (err) {
        console.log(err);
        return;
    }

    console.log('> Listening at ' + uri);

});

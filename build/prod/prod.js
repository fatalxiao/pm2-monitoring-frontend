const fs = require('fs'),
    webpack = require('webpack'),
    archiver = require('archiver'),
    crypto = require('crypto'),
    log = require('friendly-errors-webpack-plugin/src/output'),

    config = require('../config.js'),
    webpackConfig = require('./webpack.config.prod.js'),
    {fsExistsSync, copyRecursionSync, rmRecursionSync} = require('../utils.js'),

    env = process.env.NODE_ENV,
    name = env === 'production' ? 'dplatform-click-web' : `dplatform-click-web-${env}`,
    path = `./${name}`,
    zipPath = `./${name}.zip`;

log.title('info', 'WAIT', 'Building Production...');

webpack(webpackConfig, (err, stats) => {

    if (err) {
        throw err;
    }

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n');

    // remove zip file
    if (fsExistsSync(zipPath)) {
        fs.unlinkSync(zipPath);
    }

    // remove temp dir
    if (fsExistsSync(path)) {
        rmRecursionSync(path);
    }

    // make temp dir
    fs.mkdirSync(path);

    // copy files
    copyRecursionSync(config[env].rootDirectory, path, ['node_modules', '.DS_Store']);
    copyRecursionSync('./release/server', path);
    copyRecursionSync('./release/shell', path);

    // make archive
    const output = fs.createWriteStream(zipPath),
        archive = archiver('zip', {zlib: {level: 9}});

    output.on('close', () => {

        // remove temp dir
        if (fsExistsSync(path)) {
            rmRecursionSync(path);
        }

        // calculate SHA-256 Hash
        const rs = fs.createReadStream(zipPath),
            hash = crypto.createHash('sha256');

        rs.on('data', hash.update.bind(hash));
        rs.on('end', function () {
            log.title('success', 'DONE', [
                'Build Production complete',
                `Archive: ${archive.pointer()} total bytes`,
                `SHA-256 Hash: ${hash.digest('hex')}`
            ].join('\n       '));
        });

    });
    archive.pipe(output);
    archive.directory(path, name);
    archive.finalize();

});
const fs = require('fs'),
    ora = require('ora'),
    chalk = require('chalk'),
    webpack = require('webpack'),
    archiver = require('archiver'),
    crypto = require('crypto'),

    config = require('../config.js'),
    webpackConfig = require('./webpack.config.prod.js'),
    {fsExistsSync, copyRecursionSync, rmRecursionSync} = require('../utils.js'),

    env = process.env.NODE_ENV,
    name = `dpe-frontend`,
    path = `./${name}`,
    zipPath = `./${name}.zip`,
    spinner = ora('building for production...');

spinner.start();

webpack(webpackConfig, (err, stats) => {

    spinner.stop();

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
    copyRecursionSync('./release', path);

    // make archive
    const output = fs.createWriteStream(zipPath),
        archive = archiver('zip', {zlib: {level: 9}});
    output.on('close', () => {

        console.log(chalk.cyan('Archive: ' + archive.pointer() + ' total bytes'));

        // remove temp dir
        if (fsExistsSync(path)) {
            rmRecursionSync(path);
        }

        // calculate SHA-256 Hash
        const rs = fs.createReadStream(zipPath),
            hash = crypto.createHash('sha256');
        rs.on('data', hash.update.bind(hash));
        rs.on('end', function () {
            console.log('SHA-256 Hash: ', hash.digest('hex'));
            console.log(chalk.cyan('Build complete.'));
        });

    });
    archive.pipe(output);
    archive.directory(path, name);
    archive.finalize();

});
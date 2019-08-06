const path = require('path'),

    HappyPack = require('happypack'),
    autoprefixer = require('autoprefixer'),

    config = require('./config.js'),
    utils = require('./utils.js'),

    cssLoaderConfig = ['style-loader', {
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 1
        }
    }, {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                autoprefixer({
                    broswer: 'last 5 versions'
                })
            ]
        }
    }];

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {

    entry: {
        app: './src/index.js'
    },

    output: {
        publicPath: config.assetsPublicPath,
        path: config.production.assetsRoot,
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            'src': resolve('src'),
            'assets': resolve('src/assets'),
            'scss': resolve('src/assets/scss'),
            'images': resolve('src/assets/images'),
            'messages': resolve('src/assets/messages'),
            'stylesheets': resolve('src/assets/stylesheets'),
            'containers': resolve('src/containers'),
            'components': resolve('src/components'),
            'customized': resolve('src/customized'),
            'reduxes': resolve('src/reduxes'),
            'apis': resolve('src/reduxes/apis'),
            'statics': resolve('src/statics'),
            'vendors': resolve('src/vendors')
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            use: 'happypack/loader?id=js',
            include: [resolve('src')]
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1000,
                name: utils.assetsSubPath('img/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1000,
                name: utils.assetsSubPath('fonts/[name].[hash:7].[ext]')
            }
        }, {
            test: /\.scss$/,
            use: [...cssLoaderConfig, 'fast-sass-loader']
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }]
    },

    plugins: [
        new HappyPack({
            id: 'js',
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true'
            }],
            threads: 4,
            verbose: false
        })
    ]

};

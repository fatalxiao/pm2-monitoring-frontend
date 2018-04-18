const path = require('path'),
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
        path: config.production.assetsRoot,
        filename: '[name].js',
        publicPath: config.assetsPublicPath
    },

    resolve: {
        extensions: ['.js'],
        alias: {
            'src': resolve('src'),
            'apis': resolve('src/apis'),
            'assets': resolve('src/assets'),
            'scss': resolve('src/assets/scss'),
            'images': resolve('src/assets/images'),
            'stylesheets': resolve('src/assets/stylesheets'),
            'containers': resolve('src/containers'),
            'components': resolve('src/components'),
            'customized': resolve('src/customized'),
            'reduxes': resolve('src/reduxes'),
            'vendors': resolve('src/vendors')
        }
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('node_modules/xml-name-validator/lib/xml-name-validator.js')]
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
            use: [...cssLoaderConfig, 'sass-loader']
        }, {
            test: /\.css$/,
            use: cssLoaderConfig
        }]
    }

};
if (process.env.NODE_ENV === 'development') {
    module.exports = require('./configureStore.dev.js').default;
} else {
    module.exports = require('./configureStore.prod.js').default;
}
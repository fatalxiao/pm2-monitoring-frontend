module.exports = {
    apps: [{
        name: 'pm2-monitoring-frontend',
        script: 'server.js',
        env: {
            NODE_ENV: 'production'
        }
    }]
};

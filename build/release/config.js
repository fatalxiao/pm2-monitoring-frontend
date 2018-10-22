module.exports = {

    serverPort: '9617',

    proxyTable: {
        '/pm': 'http://localhost:9616',
        '/ws/pm': 'ws://localhost:9616'
    }

};

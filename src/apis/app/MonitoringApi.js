import WebSocketApi from 'apis/WebSocketApi';

export default {

    getCurrentMonitoringData(options) {
        WebSocketApi.request({
            ...options,
            url: 'ws://localhost:9616/pm/monitoring'
        });
    }

};
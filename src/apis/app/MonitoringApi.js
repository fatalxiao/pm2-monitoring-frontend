let ws;

export default {

    getCurrentMonitoringData(options) {

        if (!ws) {

            ws = new WebSocket('ws://localhost:9616/pm/monitoring');

            ws.onmessage = e => {
                console.log(e.data);
            };

            ws.onopen = function () {
                ws.send('getCurrentMonitoringData');
            };

        } else {
            ws.send('getCurrentMonitoringData');
        }

    }

};
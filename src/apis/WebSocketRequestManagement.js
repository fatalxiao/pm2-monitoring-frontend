import config from 'src/config';

const requests = {};

function add(url, initCallback) {

    return new Promise((resolve, reject) => {

        const ws = requests[url] = new WebSocket(`${config.wsPrefix}${url}`);

        ws.onopen = () => {
            resolve(ws);
        };

        ws.onerror = () => {
            reject(ws);
        };

        initCallback && initCallback(ws);

    });

}

async function get(url, initCallback) {

    if (requests[url]) {
        return requests[url];
    }

    return requests[url] = await add(url, initCallback);

}

function remove(url) {
    requests[url] && requests[url].close();
    delete requests[url];
}

export default {
    add,
    get,
    remove
};

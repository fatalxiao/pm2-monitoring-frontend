const requests = {};

function add(url, initCallback) {

    return new Promise((resolve, reject) => {

        const ws = requests[url] = new WebSocket(url);

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
    return requests[url] ? requests[url] : await add(url, initCallback);
}

function remove(url) {
    requests[url].close();
    delete requests[url];
}

export default {
    add,
    get,
    remove
};
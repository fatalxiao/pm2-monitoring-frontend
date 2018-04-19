const requests = {};

function add(url, initCallback) {

    const ws = requests[url] = new WebSocket(url);

    initCallback && initCallback(ws);

    return new Promise((resolve, reject) => {
        ws.onopen = () => {
            resolve(ws);
        };
        ws.onerror = () => {
            reject(ws);
        };
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
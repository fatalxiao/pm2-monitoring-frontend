const CANCEL_FLAG = 'CANCEL_FLAG';

let requests = [];

function add(item) {
    item && requests.push(item);
}

function cancelByName(name) {
    requests = requests.filter(item => {
        if (item && item.name && item.name === name) {
            item.xhr && item.xhr.abort();
            return false;
        } else {
            return true;
        }
    });
}

function cancelOthersByName(name) {
    requests = requests.filter(item => {
        if (item && item.name !== name) {
            if (item.xhr) {
                item.xhr[CANCEL_FLAG] = true;
                item.xhr.abort();
            }
            return false;
        } else {
            return true;
        }
    });
}

function cancelAll() {
    for (let item of requests) {
        item.xhr.abort();
    }
    requests.length = 0;
}

export default {

    CANCEL_FLAG,

    add,
    cancelByName,
    cancelOthersByName,
    cancelAll

};
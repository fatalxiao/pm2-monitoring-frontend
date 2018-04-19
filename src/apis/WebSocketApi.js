import RequestManagement from './RequestManagement';

function ajax(method, {
    name, url, params, formData, cancelable, header, contentType, isUpload,
    successCallback, failureCallback, errorCallback
}) {

    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    let body;
    if (params) {

        if (isUpload) {
            body = new FormData(formData);
        } else {
            xhr.setRequestHeader('Content-type', contentType || 'application/json');
            body = JSON.stringify(params);
        }

    }

    if (header) {
        for (let key in header) {
            xhr.setRequestHeader(key, header[key]);
        }
    }

    xhr.onreadystatechange = () => {

        if (xhr.readyState === 4) {

            let response = xhr.responseText;

            if (xhr.status === 500) {
                failureCallback && failureCallback(xhr, response);
                return;
            }

            try {
                response = JSON.parse(response);
            } catch (e) {
                failureCallback && failureCallback(xhr);
                return;
            }

            if (parseInt(+response.code / 1000) === 2) {
                successCallback && successCallback(xhr, response, response.data);
            } else {
                failureCallback && failureCallback(xhr, response, response.data);
            }

        }

    };

    // add request to cancelable list if it's cancelable
    if (cancelable !== false) {
        RequestManagement.add({
            name,
            url,
            xhr
        });
    }

    xhr.send(body);

}

function get(options) {
    ajax('GET', options);
}

function post(options) {
    ajax('POST', options);
}

function put(options) {
    ajax('PUT', options);
}

function del(options) {
    ajax('DELETE', options);
}

function postForm(options) {
    ajax('POST', {
        ...options,
        isUpload: true
    });
}

export default {
    get,
    post,
    put,
    del,
    postForm
};
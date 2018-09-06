import trim from 'lodash/trim';

function downloadMessageValid(innerText) {
    if (!innerText) {
        return true;
    }

    try {
        let json = JSON.parse(innerText);

        if (json && json.code && !(json.code.toString().startsWith('2'))) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

function range(value, min, max) {
    max !== undefined && (value = value > max ? max : value);
    min !== undefined && (value = value < min ? min : value);
    return value;
}

function isPromise(obj) {
    Object.prototype.toString.call(obj) === '[object Promise]';
}

function isValidName(value) {
    return /^[A-Za-z0-9\ \-\_]*$/.test(trim(value));
}

function isValidReportName(value) {
    value = trim(value);
    return !!value && value.length > 0 && value.length <= 128 && isValidName(value);
};

function isValidEmail(value) {
    return /^([a-zA-Z0-9]+[\_\|\.\-]+)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[\_\|\.\-]+)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    .test(trim(value));
};

function isDerbyUser(email) {
    return /\@derbysoft\.(com|net)$/i.test(email);
}

function isValidReport(profile) {

    if (!profile || !profile.email) {
        return false;
    }

    if (location.pathname.startsWith('/report') && !isDerbyUser(profile.email)) {
        return false;
    }

    return true;

}

export default {
    downloadMessageValid,
    range,
    isPromise,
    isValidName,
    isValidReportName,
    isValidEmail,
    isDerbyUser,
    isValidReport
};
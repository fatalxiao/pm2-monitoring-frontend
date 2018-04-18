import Cookies from 'js-cookie';

// ram cache
let token;

function getToken() {

    if (token) {
        return token;
    }

    return token = Cookies.get('token');

}

function setToken(token, isRemember) {

    removeToken();

    if (isRemember) {
        Cookies.set('token', token, {expires: 30});
    } else {
        Cookies.set('token', token);
    }

}

function hasToken() {
    return getToken() !== undefined;
}

function removeToken() {
    Cookies.remove('token');
}

export default {
    getToken,
    setToken,
    hasToken,
    removeToken
};
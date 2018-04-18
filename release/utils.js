function getClientIp(req) {
    return req && ((req.headers && (req.headers['x-real-ip'] || req.headers['x-forwarded-for']))
        || (req.connection && req.connection.remoteAddress)
        || (req.socket && req.socket.remoteAddress)
        || (req.connection && req.connection.socket && req.connection.socket.remoteAddress));
};

function ipParse(ip) {

    if (!ip || !ip.includes(':')) {
        return ip;
    }

    const ipArray = ip.split(':');

    if (!ipArray[3]) {
        return ip;
    }

    return ipArray[3];

}

exports.getClientIp = getClientIp;
exports.ipParse = ipParse;
import moment from 'moment';

function formatDate(timeStamp) {

    if (!timeStamp) {
        return '';
    }

    return moment.utc(new Date(timeStamp).toISOString()).format('MMM DD HH:mm:ss z YYYY');

}

function duration(t1, t2, format = 'YYYY-MM-DD HH:mm:ss') {

    if (!t1 || !t2) {
        return -1;
    }

    const time1 = moment(t1, format),
        time2 = moment(t2, format);

    if (!time1.isValid() || !time2.isValid()) {
        return -1;
    }

    return Math.abs(+time1 - +time2);

}

export default {
    formatDate,
    duration
};
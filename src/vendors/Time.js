import moment from 'moment';

function formatDate(time) {
    return time && moment(time).format('YYYY-MM-DD');
}

function convertLocalZone(time) {
    return time ? moment(time).add(moment().utcOffset(), 'minutes') : time;
}

export default {
    formatDate,
    convertLocalZone
};
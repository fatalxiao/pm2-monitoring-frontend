function cellRenderer(rowDate, prop, handler) {
    return (prop in rowDate) && rowDate[prop] !== null && rowDate[prop] !== undefined ?
        handler ?
            handler(rowDate[prop])
            :
            rowDate[prop]
        :
        '--';
}

export default {
    cellRenderer
};
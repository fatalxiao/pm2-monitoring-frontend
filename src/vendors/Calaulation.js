function formatCPU(value) {

    if (!value || +value < 0) {
        return '0';
    }

    return value.toFixed(2);

}

function formatMemory(value) {

    if (!value || +value < 0) {
        return '0';
    }

    return (value / 1024 / 1024).toFixed(2);

}

export default {
    formatCPU,
    formatMemory
};

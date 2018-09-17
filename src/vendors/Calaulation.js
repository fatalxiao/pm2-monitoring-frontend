function formatCPU(value) {

    if (!value || +value < 0) {
        return '0%';
    }

    return `${(value * 100).toFixed(2)}%`;

}

function formatMemory(value) {

    if (!value || +value < 0) {
        return '0 MB';
    }

    return `${(value / 1024 / 1024).toFixed(2)} MB`;

}

export default {
    formatCPU,
    formatMemory
};
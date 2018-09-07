function getDiag(a, b) {
    return Math.sqrt((a * a) + (b * b));
}

function getElCenterPoint(el) {

    if (!el) {
        return;
    }

    const rect = el.getBoundingClientRect();

    if (!rect) {
        return;
    }

    const {left, top, width, height} = rect;

    return {
        x: left - width / 2,
        y: top - height / 2
    };

}

export default {
    getDiag,
    getElCenterPoint
};
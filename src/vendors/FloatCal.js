function add(numa, numb) {
    let r1, r2, m;
    try {
        r1 = numa.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = numb.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (numa * m + numb * m) / m;
}

function sub(numa, numb) {
    let r1, r2, m, n;
    try {
        r1 = numa.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = numb.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((numa * m - numb * m) / m).toFixed(n);
}

function mul(numa, numb) {
    let m = 0;
    let s1 = numa.toString();
    let s2 = numb.toString();
    try {
        m += s1.split('.')[1].length;
    } catch (e) {
    }
    try {
        m += s2.split('.')[1].length;
    } catch (e) {
    }
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

function div(numa, numb) {
    let t1 = 0;
    let t2 = 0;
    let r1, r2;
    try {
        t1 = numa.toString().split('.')[1].length;
    } catch (e) {
    }
    try {
        t2 = numb.toString().split('.')[1].length;
    } catch (e) {
    }
    r1 = Number(numa.toString().replace('.', ''));
    r2 = Number(numb.toString().replace('.', ''));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

export default {
    add,
    sub,
    mul,
    div
};
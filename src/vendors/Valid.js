function range(value, min, max) {
    max !== undefined && (value = value > max ? max : value);
    min !== undefined && (value = value < min ? min : value);
    return value;
}

function validApplicationField(prop, value) {
    switch (prop) {
        case 'name':
            if (!value) {
                return 'Application Name is required';
            }
            return;
        case 'instances':
            if (value !== '' && value !== 'max' && isNaN(value)) {
                return 'Instances must be a number or "max"';
            }
            return;
        case 'port':
            if (value !== '' && isNaN(value)) {
                return 'Port must be a number';
            }
            return;
    }
}

function validApplicationForm(form) {

    const error = {};

    Object.keys(form).forEach(prop => {
        const valid = validApplicationField(prop, form[prop]);
        if (valid) {
            error[prop] = valid;
        }
    });

    return error;

}

export default {
    range,
    validApplicationField,
    validApplicationForm
};

import React, {Component} from 'react';

import CircularLoading from 'alcedo-ui/CircularLoading';

import 'scss/components/ModuleLoading.scss';

class ModuleLoading extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <CircularLoading className="module-loading"
                             size={CircularLoading.Size.LARGE}/>
        );
    }
}

export default ModuleLoading;
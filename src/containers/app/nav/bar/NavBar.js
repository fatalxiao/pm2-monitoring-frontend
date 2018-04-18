import React, {Component} from 'react';
import PropTypes from 'prop-types';

import NavBarTop from './NavBarTop';
import NavBarBottom from './NavBarBottom';
import NavPatientMenu from '../patients/NavPatientsPopover';

import 'scss/containers/app/nav/bar/NavBar.scss';

export default class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {isFold} = this.props,

            wrapperClassName = (isFold ? ' fold' : '');

        return (
            <div className={'nav-bar' + wrapperClassName}>

                <NavBarTop isFold={isFold}/>

                <NavPatientMenu isFold={isFold}/>

                <NavBarBottom/>

            </div>
        );
    }
}

NavBar.propTypes = {
    isFold: PropTypes.bool
};
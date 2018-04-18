import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import Paper from 'alcedo-ui/Paper';
import TextField from 'alcedo-ui/TextField';
import NavPatientList from 'containers/app/nav/patients/NavPatientList';

import 'scss/containers/app/nav/bar/NavSearch.scss';

class NavSearch extends Component {

    constructor(props) {

        super(props);

        this.state = {
            filterValue: ''
        };

        this.filter = ::this.filter;
        this.filterChangeHandler = ::this.filterChangeHandler;

    }

    filter(filterValue, props = this.props) {

        const {$patientList} = props;

        if (!filterValue) {
            return $patientList;
        }

        return $patientList ?
            $patientList.filter(item => (item.id && item.id.includes(filterValue)) || (item.name && item.name.includes(filterValue)))
            :
            [];

    }

    filterChangeHandler(filterValue) {
        this.setState({
            filterValue
        });
    }

    render() {

        const {visible, onRequestClose} = this.props,
            {filterValue} = this.state,

            data = this.filter(filterValue),

            className = classNames('nav-search-wrapper', {
                hidden: !visible
            });

        return (
            <div className={className}>
                <div className="nav-search-modal"
                     onTouchTap={onRequestClose}></div>
                <Paper className="nav-search"
                       nonRounded={true}
                       depth={6}>
                    <div className="nav-search-content">
                        <TextField className="nav-search-field"
                                   value={filterValue}
                                   placeholder="Search"
                                   onChange={this.filterChangeHandler}/>
                        {
                            data && data.length > 0 ?
                                <NavPatientList data={this.filter(filterValue)}/>
                                :
                                <div className="no-patient-found">
                                    No Patient Found
                                </div>
                        }
                    </div>
                </Paper>
            </div>
        );

    }
}

NavSearch.propTypes = {

    $patientList: PropTypes.array,
    visible: PropTypes.bool,

    onRequestClose: PropTypes.func

};

export default connect(state => ({
    $patientList: state.patients.list
}), dispatch => bindActionCreators(actions, dispatch))(NavSearch);
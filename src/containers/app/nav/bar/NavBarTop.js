import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';

import * as actions from 'reduxes/actions';

import IconButton from 'alcedo-ui/IconButton';
import DownloadField from 'alcedo-ui/DownloadField';
import AddPatientDialog from 'containers/app/modules/editPatient/patientBaseInfo/AddPatientDialog';
import NavSearch from './NavSearch';

import config from 'src/config';
import {DEFAULT_ROUTE} from 'src/config.routes';

import 'scss/containers/app/nav/bar/NavBarTop.scss';

class NavBarTop extends Component {

    constructor(props) {

        super(props);

        this.state = {
            searchDrawerVisible: false,
            addPatientDialogVisible: false
        };

        this.goToLanding = ::this.goToLanding;
        this.toggleSearch = ::this.toggleSearch;
        this.hideSearch = ::this.hideSearch;
        this.showAddPatient = ::this.showAddPatient;
        this.hideAddPatient = ::this.hideAddPatient;
        this.export = ::this.export;
        this.exportLoadedHandler = ::this.exportLoadedHandler;

    }

    goToLanding() {
        this.props.routerPush(DEFAULT_ROUTE);
    }

    toggleSearch() {
        this.setState({
            searchDrawerVisible: !this.state.searchDrawerVisible
        });
    }

    hideSearch() {
        this.setState({
            searchDrawerVisible: false
        });
    }

    showAddPatient() {
        this.setState({
            addPatientDialogVisible: true
        }, () => {
            this.props.resetPatientBaseInfo();
        });
    }

    hideAddPatient() {
        this.setState({
            addPatientDialogVisible: false
        });
    }

    export() {
        this.downloadFieldEl.download();
    }

    exportLoadedHandler(e, innerText) {
        //
    }

    componentDidMount() {
        this.downloadFieldEl = this.refs.downloadField;
    }

    render() {

        const {children, isFold} = this.props,
            {searchDrawerVisible, addPatientDialogVisible} = this.state,

            className = classNames('nav-bar-top', {
                fold: isFold,
                'search-drawer-visible': searchDrawerVisible
            });

        return (
            <div className={className}>

                <IconButton className="nav-bar-item nav-bar-logo-button"
                            onTouchTap={this.goToLanding}>
                    <div className="logo"/>
                    <div className="logo-animated"/>
                </IconButton>

                <IconButton className="nav-bar-item nav-bar-search-button"
                            iconCls={searchDrawerVisible ? 'icon-reply' : 'icon-magnifying-glass'}
                            tip={searchDrawerVisible ? 'Back' : 'Search'}
                            tipPosition={IconButton.TipPosition.RIGHT}
                            onTouchTap={this.toggleSearch}/>

                <IconButton className="nav-bar-item"
                            iconCls="icon-plus"
                            tip="Add Patient"
                            tipPosition={IconButton.TipPosition.RIGHT}
                            onTouchTap={this.showAddPatient}/>

                <IconButton className="nav-bar-item nav-bar-export-button"
                            iconCls="icon-download"
                            tip="Export"
                            tipPosition={IconButton.TipPosition.RIGHT}
                            onTouchTap={this.export}/>

                <NavSearch visible={searchDrawerVisible}
                           onRequestClose={this.hideSearch}/>

                <AddPatientDialog visible={addPatientDialogVisible}
                                  onRequestClose={this.hideAddPatient}/>

                <DownloadField ref="downloadField"
                               url={`${config.appBaseUrl}/patient/exportPatients`}
                               onLoad={this.exportLoadedHandler}/>

                {children}

            </div>
        );

    }
}

NavBarTop.propTypes = {

    isFold: PropTypes.bool,

    routerPush: PropTypes.func,
    resetPatientBaseInfo: PropTypes.func

};

export default connect(state => ({}), dispatch => bindActionCreators(actions, dispatch))(NavBarTop);
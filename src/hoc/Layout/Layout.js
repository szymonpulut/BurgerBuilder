import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';

import classes from './Layout.module.scss';

const Layout = ({ isAuthenticated, children }) => {
    const [sideDrawerState, sideDrawerSetState] = useState({
        showSideDrawer: false,
    });

    const sideDrawerClosedHandler = () => {
        sideDrawerSetState({ showSideDrawer: false });
    };

    const sideDrawerToggleHandler = () => {
        sideDrawerSetState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };

    return (
        <>
            <Toolbar
                isAuthenticated={isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler}
            />
            <SideDrawer
                isAuthenticated={isAuthenticated}
                open={sideDrawerState.showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>{children}</main>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

Layout.propTypes = {
    isAuthenticated: PropTypes.bool,
    children: PropTypes.node,
};

Layout.defaultProps = {
    isAuthenticated: false,
    children: null,
};

export default connect(mapStateToProps)(Layout);

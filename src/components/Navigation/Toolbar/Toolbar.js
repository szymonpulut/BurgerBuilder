import React from 'react';
import PropTypes from 'prop-types';

import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import DrawerToggle from 'components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import Logo from 'components/Logo/Logo';

import classes from './Toolbar.module.scss';

const toolbar = ({ drawerToggleClicked, isAuthenticated }) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={drawerToggleClicked} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={isAuthenticated} />
            </nav>
        </header>
    );
};

toolbar.propTypes = {
    drawerToggleClicked: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

toolbar.defaultProps = {
    isAuthenticated: false,
};

export default toolbar;

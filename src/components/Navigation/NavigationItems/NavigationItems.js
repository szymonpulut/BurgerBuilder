import React from 'react';
import PropTypes from 'prop-types';

import NavigationItem from 'components/Navigation/NavigationItems/NavigationItem/NavigationItem';

import classes from './NavigationItems.module.scss';

const navigationItems = ({ isAuthenticated }) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>
            {isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            {isAuthenticated ? (
                <NavigationItem link="/logout">Log out</NavigationItem>
            ) : (
                <NavigationItem link="/auth">Authenticate</NavigationItem>
            )}
        </ul>
    );
};

navigationItems.propTypes = {
    isAuthenticated: PropTypes.bool,
};

navigationItems.defaultProps = {
    isAuthenticated: false,
};

export default navigationItems;

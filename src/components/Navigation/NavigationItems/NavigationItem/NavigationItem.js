import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import classes from './NavigationItem.module.scss';

const navigationItem = ({ link, exact, children }) => {
    return (
        <li className={classes.NavigationItem}>
            <NavLink to={link} activeClassName={classes.active} exact={exact}>
                {children}
            </NavLink>
        </li>
    );
};

navigationItem.propTypes = {
    link: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.node,
};

navigationItem.defaultProps = {
    exact: false,
    children: null,
};

export default navigationItem;

import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.module.scss';

const drawerToggle = ({ clicked }) => {
    const keyDownHandler = (event) => {
        if (event.keyCode === 13) {
            clicked();
        }
    };
    return (
        <div
            className={classes.DrawerToggle}
            onClick={clicked}
            onKeyDown={keyDownHandler}
            role="button"
            tabIndex={0}
        >
            <div />
            <div />
            <div />
        </div>
    );
};

drawerToggle.propTypes = {
    clicked: PropTypes.func.isRequired,
};

export default drawerToggle;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import Backdrop from 'components/UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.scss';

const SideDrawer = ({ open, closed, isAuthenticated }) => {
    const keyDownHandler = (event) => {
        if (event.keyCode === 27) {
            closed();
        }
    };

    if (open) {
        document.addEventListener('keydown', keyDownHandler);
    }

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    return (
        <>
            <Backdrop clicked={closed} show={open} />
            {/* Workaround had to be implemented because of the "hacky" solution - clicking anywhere on SideDrawer closes it */}
            {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
            {/* eslint-disable jsx-a11y/click-events-have-key-events */}
            <div
                className={attachedClasses.join(' ')}
                onClick={closed}
                role="dialog"
                aria-modal="true"
            >
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={isAuthenticated} />
                </nav>
            </div>
            {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions */}
            {/* eslint-enable jsx-a11y/click-events-have-key-events */}
        </>
    );
};

SideDrawer.propTypes = {
    open: PropTypes.bool,
    closed: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

SideDrawer.defaultProps = {
    open: false,
    isAuthenticated: false,
};

export default SideDrawer;

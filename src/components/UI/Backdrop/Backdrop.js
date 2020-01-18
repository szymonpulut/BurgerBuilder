import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.module.scss';

const Backdrop = ({ show, clicked }) => {
    const keyDownHandler = (event) => {
        if (event.keyCode === 27) {
            clicked();
        }
    };

    useEffect(() => {
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    if (show) {
        document.addEventListener('keydown', keyDownHandler);
    }

    return show ? (
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
        <div
            className={classes.Backdrop}
            onClick={clicked}
            onKeyDown={keyDownHandler}
            role="dialog"
            aria-modal="true"
        />
    ) : /* eslint-enable jsx-a11y/no-noninteractive-element-interactions */
    null;
};

Backdrop.propTypes = {
    show: PropTypes.bool,
    clicked: PropTypes.func.isRequired,
};

Backdrop.defaultProps = {
    show: false,
};

export default Backdrop;

import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.module.scss';

const button = ({ btnType, disabled, clicked, children }) => {
    return (
        <button
            type="submit"
            className={[classes.Button, classes[btnType]].join(' ')}
            disabled={disabled}
            onClick={clicked}
        >
            {children}
        </button>
    );
};

button.propTypes = {
    btnType: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    clicked: PropTypes.func,
    children: PropTypes.node,
};

button.defaultProps = {
    disabled: false,
    clicked: () => {},
    children: null,
};

export default button;

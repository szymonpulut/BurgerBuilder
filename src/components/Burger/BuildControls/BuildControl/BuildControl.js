import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.module.scss';

const buildControl = ({ label, removed, disabled, added }) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{label}</div>
            <button className={classes.Less} onClick={removed} disabled={disabled} type="button">
                Less
            </button>
            <button className={classes.More} onClick={added} type="button">
                More
            </button>
        </div>
    );
};

buildControl.propTypes = {
    label: PropTypes.string.isRequired,
    removed: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    added: PropTypes.func.isRequired,
};

buildControl.defaultProps = {
    disabled: true,
};

export default buildControl;

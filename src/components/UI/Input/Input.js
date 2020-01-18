import React from 'react';
import PropTypes from 'prop-types';

import classes from './Input.module.scss';

const input = ({
    invalid,
    shouldValidate,
    touched,
    elementConfig,
    elementType,
    value,
    label,
    changed,
}) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (invalid && shouldValidate && touched) {
        inputClasses.push(classes.Invalid);
    }

    const inputClassesString = inputClasses.join(' ');

    switch (elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClassesString}
                    onChange={changed}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...elementConfig}
                    value={value}
                />
            );
            break;
        case 'textarea':
            inputElement = (
                <textarea
                    className={inputClassesString}
                    onChange={changed}
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    {...elementConfig}
                    value={value}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select className={inputClassesString} onChange={changed} value={value}>
                    {elementConfig.options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                /* eslint-disable-next-line react/jsx-props-no-spreading */
                <input className={inputClassesString} {...elementConfig} value={value} />
            );
    }

    return (
        <div className={classes.Input}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label className={classes.Label}>{label}</label>
            {inputElement}
        </div>
    );
};

input.propTypes = {
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.objectOf(PropTypes.any),
    touched: PropTypes.bool,
    elementType: PropTypes.string.isRequired,
    changed: PropTypes.func.isRequired,
    elementConfig: PropTypes.objectOf(PropTypes.any).isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
};

input.defaultProps = {
    invalid: false,
    shouldValidate: true,
    touched: false,
    value: '',
    label: '',
};

export default input;

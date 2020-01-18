import React from 'react';
import PropTypes from 'prop-types';

import BuildControl from 'components/Burger/BuildControls/BuildControl/BuildControl';

import classes from './BuildControls.module.scss';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];

const buildControls = ({
    price,
    ingredientAdded,
    ingredientRemoved,
    disabled,
    purchasable,
    order,
    isAuthenticated,
}) => {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price: <span style={{ fontWeight: 'bold' }}>{price.toFixed(2)}$</span>
            </p>
            {controls.map((ctrl) => {
                return (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => ingredientAdded(ctrl.type)}
                        removed={() => ingredientRemoved(ctrl.type)}
                        disabled={disabled[ctrl.type]}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!purchasable}
                onClick={order}
                type="submit"
            >
                {isAuthenticated ? 'Order Now' : 'Sign up to order'}
            </button>
        </div>
    );
};

buildControls.propTypes = {
    price: PropTypes.number.isRequired,
    ingredientAdded: PropTypes.func.isRequired,
    ingredientRemoved: PropTypes.func.isRequired,
    disabled: PropTypes.objectOf(PropTypes.any),
    purchasable: PropTypes.bool,
    order: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

buildControls.defaultProps = {
    disabled: {},
    purchasable: false,
    isAuthenticated: false,
};

export default buildControls;

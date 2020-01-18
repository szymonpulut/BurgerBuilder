import React from 'react';
import PropTypes from 'prop-types';

import classes from './Order.module.scss';

const order = ({ ingredients, price }) => {
    const ingredientsDisplay = [];

    /* eslint-disable-next-line no-restricted-syntax */
    for (const [ingredientName] of Object.entries(ingredients)) {
        ingredientsDisplay.push({
            name: ingredientName,
            amount: ingredients[ingredientName],
        });
    }

    const ingredientsOutput = ingredientsDisplay.map((ig) => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px',
                }}
            >
                {ig.name} ({ig.amount})
            </span>
        );
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>
                Price:{' '}
                <span style={{ fontWeight: 'bold' }}>${Number.parseFloat(price).toFixed(2)}</span>
            </p>
        </div>
    );
};

order.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.any).isRequired,
    price: PropTypes.number.isRequired,
};

export default order;

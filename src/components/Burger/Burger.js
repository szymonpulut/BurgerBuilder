import React from 'react';
import PropTypes from 'prop-types';

import BurgerIngredient from 'components/Burger/BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.scss';

const burger = ({ ingredients }) => {
    let transformedIngredients = Object.keys(ingredients)
        .map((ingKey) => {
            return Array.from({ length: ingredients[ingKey] }, (_, i) => (
                <BurgerIngredient key={ingKey + i} type={ingKey} />
            ));
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

burger.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default burger;

import React from 'react';
import PropTypes from 'prop-types';

import Burger from 'components/Burger/Burger';
import Button from 'components/UI/Button/Button';

import classes from './CheckoutSummary.module.scss';

const checkoutSummary = ({ ingredients, checkoutCancelled, checkoutContinued }) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{ width: '100%', height: '300px', margin: 'auto' }}>
                <Burger ingredients={ingredients} />
            </div>
            <Button btnType="Danger" clicked={checkoutCancelled}>
                Cancel
            </Button>
            <Button btnType="Success" clicked={checkoutContinued}>
                Continue
            </Button>
        </div>
    );
};

checkoutSummary.propTypes = {
    ingredients: PropTypes.objectOf(PropTypes.any).isRequired,
    checkoutCancelled: PropTypes.func.isRequired,
    checkoutContinued: PropTypes.func.isRequired,
};

export default checkoutSummary;

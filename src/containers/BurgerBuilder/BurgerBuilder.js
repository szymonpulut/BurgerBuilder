import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from 'store/actions/index';
import PropTypes from 'prop-types';

import axios from 'axios-orders';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

import Burger from 'components/Burger/Burger';
import BuildControls from 'components/Burger/BuildControls/BuildControls';
import Modal from 'components/UI/Modal/Modal';
import OrderSummary from 'components/Burger/OrderSummary/OrderSummary';
import Spinner from 'components/UI/Spinner/Spinner';

export const BurgerBuilder = ({
    onInitIngredients,
    isAuthenticated,
    onSetAuthRedirectPath,
    history,
    onInitPurchase,
    ings,
    price,
    onIngredientAdded,
    onIngredientRemoved,
    error,
}) => {
    const [purchasingState, setPurchasingState] = useState(false);

    useEffect(() => {
        onInitIngredients();
    }, []);

    const updatePurchasableState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((ingKey) => {
                return ingredients[ingKey];
            })
            .reduce((s, el) => {
                return s + el;
            }, 0);
        return sum > 0;
    };

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasingState(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth');
        }
    };
    const purchaseCancelHandler = () => {
        setPurchasingState(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    };

    const disabledInfo = {
        ...ings,
    };

    /* eslint-disable-next-line no-restricted-syntax */
    for (const [key] of Object.entries(disabledInfo)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = error ? (
        <p style={{ textAlign: 'center' }}>Ingredients can&apos;t be loaded</p>
    ) : (
        <Spinner />
    );
    let orderSummary = null;

    if (ings) {
        burger = (
            <>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={updatePurchasableState(ings)}
                    order={purchaseHandler}
                    isAuthenticated={isAuthenticated}
                />
            </>
        );
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}
            />
        );
    }

    return (
        <>
            <Modal show={purchasingState} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => {
            dispatch(actions.addIngredient(ingredientName));
        },
        onIngredientRemoved: (ingredientName) => {
            dispatch(actions.removeIngredient(ingredientName));
        },
        onInitIngredients: () => {
            dispatch(actions.initIngredients());
        },
        onInitPurchase: () => {
            dispatch(actions.purchaseInit());
        },
        onSetAuthRedirectPath: (path) => {
            dispatch(actions.setAuthRedirectPath(path));
        },
    };
};

BurgerBuilder.propTypes = {
    onInitIngredients: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    onSetAuthRedirectPath: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
    onInitPurchase: PropTypes.func.isRequired,
    ings: PropTypes.objectOf(PropTypes.any),
    price: PropTypes.number.isRequired,
    onIngredientAdded: PropTypes.func.isRequired,
    onIngredientRemoved: PropTypes.func.isRequired,
    error: PropTypes.bool,
};

BurgerBuilder.defaultProps = {
    error: false,
    isAuthenticated: false,
    ings: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

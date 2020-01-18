import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios-orders';
import PropTypes from 'prop-types';

import { updateObject, checkValidity } from 'shared/utility';

import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';
import Input from 'components/UI/Input/Input';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';
import * as actions from 'store/actions/index';

import classes from './ContactData.module.scss';

const ContactData = ({ ings, price, userId, onOrderBurger, loading }) => {
    const [contactDataState, setContactDataState] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your Email',
            },
            value: '',
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' },
                ],
            },
            value: 'fastest',
            validation: {},
            valid: true,
        },
    });

    const [formIsValidState, setFormIsValidState] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        /* eslint-disable-next-line no-restricted-syntax */
        for (const [formElementIdentifier] of Object.entries(contactDataState)) {
            formData[formElementIdentifier] = contactDataState[formElementIdentifier].value;
        }

        const order = {
            ingredients: ings,
            price,
            orderData: formData,
            userId,
        };

        onOrderBurger(order);
    };

    const inputChangedHandler = (event, inputId) => {
        const updatedFormElement = updateObject(contactDataState[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, contactDataState[inputId].validation),
            touched: true,
        });

        const updatedOrderForm = updateObject(contactDataState, {
            [inputId]: updatedFormElement,
        });

        let formIsValid = true;

        /* eslint-disable-next-line no-restricted-syntax */
        for (const [inputIdentifier] of Object.entries(updatedOrderForm)) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        setFormIsValidState(formIsValid);
        setContactDataState(updatedOrderForm);
    };

    const formElementsArray = [];
    /* eslint-disable-next-line no-restricted-syntax */
    for (const [key] of Object.entries(contactDataState)) {
        formElementsArray.push({
            id: key,
            config: contactDataState[key],
        });
    }
    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map((formElement) => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => {
                        inputChangedHandler(event, formElement.id);
                    }}
                />
            ))}
            <Button btnType="Success" clicked={orderHandler} disabled={!formIsValidState}>
                Order
            </Button>
        </form>
    );

    if (loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => {
            dispatch(actions.purchaseBurger(orderData));
        },
    };
};

ContactData.propTypes = {
    ings: PropTypes.objectOf(PropTypes.any),
    price: PropTypes.number.isRequired,
    onOrderBurger: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired,
    loading: PropTypes.bool,
};

ContactData.defaultProps = {
    loading: false,
    ings: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));

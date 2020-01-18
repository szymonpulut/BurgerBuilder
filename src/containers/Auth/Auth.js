import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from 'store/actions/index';
import PropTypes from 'prop-types';

import { updateObject, checkValidity } from 'shared/utility';

import Input from 'components/UI/Input/Input';
import Button from 'components/UI/Button/Button';
import Spinner from 'components/UI/Spinner/Spinner';

import classes from './Auth.module.scss';

const Auth = ({
    building,
    authRedirectPath,
    onSetRedirectPath,
    isAuthenticated,
    onAuth,
    loading,
    error,
}) => {
    useEffect(() => {
        if (!building && authRedirectPath !== '/') {
            onSetRedirectPath();
        }
    }, []);

    const [isSignUpState, setIsSignUpState] = useState(true);
    const [controlsState, setControlsState] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address',
            },
            value: '',
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password',
            },
            value: '',
            validation: {
                required: true,
                minLength: 6,
            },
            valid: false,
            touched: false,
        },
    });

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controlsState, {
            [controlName]: updateObject(controlsState[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controlsState[controlName].validation),
                touched: true,
            }),
        });

        setControlsState(updatedControls);
    };

    const formElementsArray = [];

    /* eslint-disable-next-line no-restricted-syntax */
    for (const [key] of Object.entries(controlsState)) {
        formElementsArray.push({
            id: key,
            config: controlsState[key],
        });
    }

    let form = formElementsArray.map((formElement) => {
        return (
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
        );
    });

    if (loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
        errorMessage = <p>{error.message}</p>;
    }

    const submitHandler = (event) => {
        event.preventDefault();
        onAuth(controlsState.email.value, controlsState.password.value, isSignUpState);
    };

    const switchAuthModeHandler = () => {
        setIsSignUpState((prevState) => {
            return !prevState;
        });
    };

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />;
    }

    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Submit</Button>
            </form>
            <Button clicked={switchAuthModeHandler} btnType="Danger">
                Switch to {isSignUpState ? 'sign in' : 'sign up'}
            </Button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => {
            return dispatch(actions.auth(email, password, isSignUp));
        },
        onSetRedirectPath: () => {
            dispatch(actions.setAuthRedirectPath('/'));
        },
    };
};

Auth.propTypes = {
    building: PropTypes.bool,
    authRedirectPath: PropTypes.string,
    onSetRedirectPath: PropTypes.func,
    onAuth: PropTypes.func,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.string,
    loading: PropTypes.bool,
};

Auth.defaultProps = {
    building: false,
    authRedirectPath: '/',
    onSetRedirectPath: () => {},
    onAuth: () => {},
    isAuthenticated: false,
    error: '',
    loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'store/actions';
import PropTypes from 'prop-types';

import Layout from 'hoc/Layout/Layout';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Logout from 'containers/Auth/Logout/Logout';

/* eslint-disable */

const Checkout = React.lazy(() => {
    return import('./Checkout/Checkout');
});
const Orders = React.lazy(() => {
    return import('./Orders/Orders');
});
const Auth = React.lazy(() => {
    return import('./Auth/Auth');
});

/* eslint-enable */

const App = ({ isAuthenticated, onTryAutoSignup }) => {
    useEffect(() => {
        onTryAutoSignup();
    }, []);

    /* eslint-disable react/jsx-props-no-spreading */

    let routes = (
        <Switch>
            <Route
                path="/auth"
                render={(childrenProps) => {
                    return <Auth {...childrenProps} />;
                }}
            />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if (isAuthenticated) {
        routes = (
            <Switch>
                <Route
                    path="/auth"
                    render={(props) => {
                        return <Auth {...props} />;
                    }}
                />
                <Route
                    path="/checkout"
                    render={(props) => {
                        return <Checkout {...props} />;
                    }}
                />
                <Route
                    path="/orders"
                    render={(props) => {
                        return <Orders {...props} />;
                    }}
                />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }

    /* eslint-enable react/jsx-props-no-spreading */

    return (
        <div>
            <Layout>
                <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
            </Layout>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => {
            dispatch(actions.authCheckState());
        },
    };
};

App.propTypes = {
    isAuthenticated: PropTypes.bool,
    onTryAutoSignup: PropTypes.func,
};

App.defaultProps = {
    isAuthenticated: false,
    onTryAutoSignup: () => {},
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

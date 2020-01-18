import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from 'store/actions/index';
import PropTypes from 'prop-types';

import axios from 'axios-orders';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

import Spinner from 'components/UI/Spinner/Spinner';
import Order from 'components/Order/Order';

const Orders = ({ onFetchOrders, loading, orders, token, userId }) => {
    useEffect(() => {
        onFetchOrders(token, userId);
    }, []);

    let ordersDisplay = <Spinner />;

    if (!loading) {
        ordersDisplay = orders.map((order) => (
            <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ));
    }

    return <div>{ordersDisplay}</div>;
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => {
            dispatch(actions.fetchOrders(token, userId));
        },
    };
};

Orders.propTypes = {
    onFetchOrders: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    token: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    orders: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Orders.defaultProps = {
    loading: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));

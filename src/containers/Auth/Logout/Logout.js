import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from 'store/actions/index';

const Logout = ({ onLogout }) => {
    useEffect(() => {
        onLogout();
    }, []);

    return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

Logout.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Logout);

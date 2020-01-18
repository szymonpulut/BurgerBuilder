import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from 'components/UI/Backdrop/Backdrop';

import classes from './Modal.module.scss';

const modal = ({ show, modalClosed, children }) => {
    return (
        <>
            <Backdrop show={show} clicked={modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0',
                }}
            >
                {children}
            </div>
        </>
    );
};

modal.propTypes = {
    show: PropTypes.bool,
    modalClosed: PropTypes.func.isRequired,
    children: PropTypes.node,
};

modal.defaultProps = {
    show: false,
    children: null,
};

export default React.memo(modal, (prevProps, nextProps) => {
    return nextProps.show === prevProps.show && nextProps.children === prevProps.children;
});

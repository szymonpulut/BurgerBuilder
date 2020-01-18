import React from 'react';

import useHttpErrorHandler from 'hooks/http-error-handler';
import Modal from 'components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <>
                <Modal show={error} modalClosed={clearError}>
                    <p>Something went wrong :(</p>
                    <p>{error ? error.message : null}</p>
                </Modal>
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withErrorHandler;

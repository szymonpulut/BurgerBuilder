import { useEffect, useState } from 'react';

export default (httpClient) => {
    const [errorState, setErrorState] = useState(null);

    const requestInterceptor = httpClient.interceptors.request.use((request) => {
        setErrorState(null);
        return request;
    });

    const responseInterceptor = httpClient.interceptors.response.use(
        (response) => response,
        (error) => {
            setErrorState(error);
        },
    );

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(requestInterceptor);
            httpClient.interceptors.response.eject(responseInterceptor);
        };
    }, [requestInterceptor, responseInterceptor]);

    const errorConfirmedHandler = () => {
        setErrorState(null);
    };

    return [errorState, errorConfirmedHandler];
};

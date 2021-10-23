export const registerServiceWorker = () => {
    if ('serviceWorker' in navigator && process.env.REACT_APP_NODE_ENV === 'production') {
        navigator.serviceWorker
            .register('./firebase-messaging-sw.js')
            .then(function(registration) {
                return registration.scope;
            })
            .catch(function(err) {
                return err;
            });
    }
};
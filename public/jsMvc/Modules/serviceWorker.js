function enableSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then((registration) => {
                console.log('sw registration on scope: ', registration.scope);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

export {enableSW};

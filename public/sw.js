/**
 * The cache storage name.
 * @type {string}
 */
const CACHE_NAME = 'blendocuSw-v1';

/**
 * The links to the files to cache.
 * @type {string[]}
 */
const cacheUrls = [
    '/',
    '/dist/out/style.css',
    '/dist/out/application.js',
    '/dist/out/fonts/',
    '/dist/out/fonts/Orbitron-Bold.ttf',
    '/dist/out/fonts/Orbitron-Medium.ttf',
    '/dist/out/fonts/Orbitron-Regular.ttf',
    '/dist/out/fonts/u1f000.ttf',
    '/dist/out/fonts/u1f400.ttf',
    '/dist/out/fonts/u1f800.ttf',
    '/dist/out/fonts/u2000.ttf',
    '/dist/out/fonts/u2400.ttf',
    '/dist/out/fonts/u2800.ttf'
];


self.addEventListener('install', (event) => {
    /**
     * Wait until all files will be downloaded.
     * In case of error service worker will not be installed.
     */
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

self.addEventListener('fetch', (event) => {

    /** cache first */
    event.respondWith(
        /**
         * Search for the resource in cache storage.
         */
        caches
            .match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            }).catch((err) => {
                console.log('smth went wrong with caches.match: ', err);
            })
    );
});

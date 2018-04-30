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

    /*'/css/paginator-block.css',
    '/css/register-login-change.css',
    '/css/menu-list-block.css',
    '/css/wrapper-block.css',
    '/css/login-register-form-block.css',
    '/css/description-text.css',
    '/css/input-form.css',
    '/css/button.css',
    '/css/table.css',
    '/css/file-upload-button.css',
    '/css/avatar-and-change-button.css',
    '/css/profile-settings.css',
    '/css/error-form.css',
    '/css/profile-footer.css',
    '/css/normalize.css',
    '/css/profile-row.css',
    '/css/level.css',
    '/css/colors.css',
    '/css/popup.css',
    '/css/game-blendocu.css',
    '/css/about.css',
    '/css/background.css',
    '/css/fonts.css',*/
    '/dist/out/style.css',

    '/dist/out/application.js'
    /*'/sw.js',
    '/jsMvc/Modules/serviceWorker.js',
    '/jsMvc/Modules/basic.js',
    '/jsMvc/Modules/validation.js',
    //'/jsMvc/Modules/ws.js',
    '/jsMvc/Modules/game/serverEvents.js',
    '/jsMvc/Modules/sharedData.js',
    '/jsMvc/Modules/HttpModule.js',
    '/jsMvc/Models/userModel.js',
    '/jsMvc/Models/game/offlineGameModel.js',
    //'/jsMvc/Models/game/onlineGameModel.js',
    '/jsMvc/Modules/paginator.js',
    '/jsMvc/Views/MenuView/menuView.tmpl.js',
    '/jsMvc/Views/MenuView/menuView.js',
    '/jsMvc/Components/Popup/popup.tmpl.js',
    '/jsMvc/Components/Popup/popup.js',
    '/jsMvc/Components/Colour/colour.tmpl.js',
    '/jsMvc/Components/Colour/colour.js',
    'jsMvc/Components/GamePopup/gamePopup.tmpl.js',
    '/jsMvc/Components/GamePopup/gamePopup.js',
    '/jsMvc/Views/ViewInterface.js',
    '/jsMvc/Components/Error/error.js',
    '/jsMvc/Modules/bus.js',
    '/jsMvc/Components/Cell/cell.js',
    '/jsMvc/Models/scoreboardModel.js',
    '/images/paint.png',
    // UNUSED = '//'
    //'/fonts/Orbitron-Medium.ttf',
    '/fonts/u1f000.woff',
    '/fonts/u1f400.woff',
    '/fonts/u1f800.woff',
    '/fonts/u2000.woff',
    '/fonts/Orbitron-Black.ttf',
    '/fonts/Orbitron-Bold.ttf',
    '/fonts/Orbitron-Regular.ttf',
    '/jsMvc/Views/LoginView/loginView.tmpl.js',
    '/jsMvc/Views/LoginView/LoginView.js',
    '/jsMvc/Views/ProfileView/profileView.tmpl.js',
    '/jsMvc/Views/AboutView/aboutView.js',
    '/jsMvc/Views/AboutView/aboutView.tmpl.js',
    '/jsMvc/Views/ProfileView/profileView.js',
    '/jsMvc/Views/ScoreboardView/scoreboardView.tmpl.js',
    '/jsMvc/Views/ScoreboardView/scoreboardView.js',
    '/jsMvc/Views/LevelView/levelView.tmpl.js',
    '/jsMvc/Views/LevelView/levelView.js',
    '/jsMvc/Views/GameView/gameView.tmpl.js',
    '/jsMvc/Views/GameView/gameView.js',
    '/jsMvc/Views/RegisterView/registerView.tmpl.js',
    '/jsMvc/Views/RegisterView/registerView.js',
    '/jsMvc/Views/ScoreboardView/scoreboardView.tmpl.js',
    '/jsMvc/Views/ScoreboardView/scoreboardView.js',
    '/jsMvc/Controller/userController.js',
    '/jsMvc/Controller/scoreboardController.js',
    '/jsMvc/Controller/gameController.js',
    '/jsMvc/Controller/gameOnlineController.js',
    '/jsMvc/Modules/router.js',
    '/jsMvc/application.js'*/
];

/**
 * Regular expressions for caching additional responses.
 * @type {RegExp[]}
 */
const cacheRegexps = [
    /^.+\.css$/i,
    /^.+\.ttf$/i,
    /^.+\.woff$/i,
    /^.+\.png$/i,
    /^level\/.+$/i
];

/**
 * Whether the response should be cached in addition to already cached.
 * @param {object} request - The request on which the response will be received.
 * @return {boolean} - To cache or not to cache.
 */
function shouldICache(request) {
    return cacheRegexps.some(regExp => request.url.search(regExp));
}

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
                return fetch(event.request)
                    .then(response => {
                        if (shouldICache(event.request) && response.clone().ok) {
                            caches.open(CACHE_NAME).then(cache => {
                                cache.put(event.request, response.clone());
                            });
                        }
                        return response;
                    });
            })
            .catch((err) => {
                console.log('smth went wrong with caches.match: ', err);
            })
    );
});

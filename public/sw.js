// наименование для нашего хранилища кэша
const CACHE_NAME = 'blendocuSw-v1';
// ссылки на кэшируемые файлы
const cacheUrls = [
    '/',

    '/css/paginator-block.css',
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

    '/sw.js',
    '/jsMvc/Modules/serviceWorker.js',
    '/jsMvc/Modules/basic.js',
    '/jsMvc/Modules/validation.js',
    //'/jsMvc/Modules/ws.js',
    '/jsMvc/Modules/game/serverEvents.js',
    '/jsMvc/Modules/sharedData.js',
    '/jsMvc/Modules/HttpModule.js',
    '/jsMvc/Models/userModel.js',
    '/jsMvc/Models/game/gameModel.js',
    '/jsMvc/Models/game/offlineGameModel.js',
    //'/jsMvc/Models/game/onlineGameModel.js',
    '/jsMvc/Modules/paginator.js',
    '/jsMvc/Views/MenuView/menuView.tmpl.js',
    '/jsMvc/Views/MenuView/menuView.js',
    '/jsMvc/Components/Popup/popup.tmpl.js',
    '/jsMvc/Components/Popup/popup.js',
    //
    '/jsMvc/Views/ViewInterface.js',
    '/jsMvc/Components/Error/error.js',
    '/jsMvc/Modules/bus.js',
    '/jsMvc/Components/Cell/cell.js',
    '/jsMvc/Models/scoreboardModel.js',
    '/images/paint.png',
    '/fonts/Orbitron-Medium.ttf',
    '/fonts/Orbitron-Regular.ttf',
    //
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
    '/jsMvc/application.js'
];

const cacheRegexps = [
    /^.+\.css$/i,
    /^.+\.ttf$/i,
    /^.+\.png$/i
];

function shouldICache(request) {
    return cacheRegexps.some(regExp => request.url.search(regExp));
}

this.addEventListener('install', (event) => {
    // задержим обработку события
    // если произойдёт ошибка, serviceWorker не установится
    event.waitUntil(
        // находим в глобальном хранилище Cache-объект с нашим именем
        // если такого не существует, то он будет создан
        caches.open(CACHE_NAME)
            .then((cache) => {
                // загружаем в наш cache необходимые файлы
                return cache.addAll(cacheUrls);
            })
            .catch((err) => {
                console.error('smth went wrong with caches.open: ', err);
            })
    );
});

this.addEventListener('fetch', (event) => {
    /** cache first */
    event.respondWith(
        // ищем запрашиваемый ресурс в хранилище кэша
        caches
            .match(event.request)
            .then((cachedResponse) => {
                // выдаём кэш, если он есть
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then(response => {
                    if (shouldICache(event.request) && response.ok) {
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

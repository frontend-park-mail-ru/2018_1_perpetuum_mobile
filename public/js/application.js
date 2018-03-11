'use strict';

const httpModule = new window.HttpModule();

switch(window.location.hostname) {
    case 'localhost':
        httpModule.baseUrl = 'http://localhost:3050';
        break;
    case '127.0.0.1':
        httpModule.baseUrl = 'http://127.0.0.1:3050';
        break;
    case 'blend-front.herokuapp.com':
        httpModule.baseUrl = '//blend-back.herokuapp.com';
        break;
    default:
        httpModule.baseUrl = '';
}

const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
const userFooterComponent = new window.UserFooterComponent( '.profile',
    {
        event: 'submit',
        callback: onSubmitLogoutForm
    }
);
const scoreboardPaginatorComponent = new window.PaginatorComponent('.scoreboardPaginatorLeftForm>.paginatorButton', '.scoreboardPaginatorRightForm>.paginatorButton');

const menuSection = document.getElementsByClassName('menu')[0];
const singlePlayerSection = document.getElementsByClassName('singlePlayer')[0];
const multiPlayerSection  = document.getElementsByClassName('multiPlayer')[0];
const scoreboardSection   = document.getElementsByClassName('scoreboard')[0];
const profileSettingsSection = document.getElementsByClassName('profileSettings')[0];
const registerSection = document.getElementsByClassName('registration')[0];
const loginSection = document.getElementsByClassName('login')[0];

const loginForm = document.getElementsByClassName('loginForm')[0];
const registrationForm = document.getElementsByClassName('registrationForm')[0];
const changeImageForm = document.getElementsByClassName('changeImageForm')[0];
const changeProfileNickForm = document.getElementsByClassName('changeProfileNickForm')[0];
const changePasswordForm = document.getElementsByClassName('changePasswordForm')[0];
const scoreboardPaginatorLeftForm = document.getElementsByClassName('scoreboardPaginatorLeftForm')[0];
const scoreboardPaginatorRightForm = document.getElementsByClassName('scoreboardPaginatorRightForm')[0];


const application = document.getElementById('application');
const changeImageButton = document.getElementById('changeImageButtonId');
const imageInProfile = document.getElementById('imageInProfile');
const imageInDownMenu = document.getElementById('imageInDownMenu');

const sections = {
    login: loginSection,
    register: registerSection,
    singlePlayer: singlePlayerSection,
    multiPlayer: multiPlayerSection,
    scoreboard: scoreboardSection,
    profileSettings: profileSettingsSection,
    menu: menuSection
};


/**
 * openSection "name"
 *
 * @param {string} section what you want to open.
 *
 */

function openSection(name) {
    Object.keys(sections).forEach(function (key) {
        sections[key].hidden = key !== name;
    });

    if (typeof openFunctions[name] === 'function') {
        openFunctions[name]();
    }
}

const openFunctions = {
    scoreboard: openScoreboard,
    register: function () {
        registrationForm.removeEventListener('submit', onSubmitRegisterForm);
        registrationForm.reset();
        registrationForm.addEventListener('submit', onSubmitRegisterForm);
    },
    login: function () {
        loginForm.removeEventListener('submit', onSubmitLoginForm);
        loginForm.reset();
        loginForm.addEventListener('submit', onSubmitLoginForm);
    },
    profileSettings: function () {
        changePasswordForm.removeEventListener('submit', onSubmitChangePasswordForm);
        changePasswordForm.reset();
        changePasswordForm.addEventListener('submit', onSubmitChangePasswordForm);
        changeProfileNickForm.removeEventListener('submit', onSubmitChangeProfileNickForm);
        changeProfileNickForm.reset();
        changeProfileNickForm.addEventListener('submit', onSubmitChangeProfileNickForm);
        changeImageForm.removeEventListener('submit', onSubmitChangeImageForm);
        changeImageForm.reset();
        changeImageForm.addEventListener('submit', onSubmitChangeImageForm);
    }
};

function onSubmitChangePasswordForm(evt) {
    evt.preventDefault();
    const fields = ['oldPassword', 'newPassword'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = fields.reduce(function (allFields, fieldName) {
        allFields[fieldName] = formElements[fieldName].value;
        return allFields;
    }, {});

    changePassword(formData,
        function (response) {
            console.log(response);
        },
        function (err) {
            console.log(err);
            changePasswordForm.reset();
            alert('Неверно!');
        }
    );
}

function changePassword(data, callback, catchFunc) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/settings', data: data}).then(callback).catch(catchFunc);
}

function onSubmitChangeProfileNickForm(evt) {
    evt.preventDefault();
    const fields = ['login', 'email'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = fields.reduce(function (allFields, fieldName) {
        allFields[fieldName] = formElements[fieldName].value;
        return allFields;
    }, {});

    changeProfileNick(formData,
        function (response) {
            console.log(response);
            checkAuth();
        },
        function (err) {
            console.log(err);
            changeProfileNickForm.reset();
            alert('Неверно!');
        }
    );
}

function changeProfileNick(data, callback, catchFunc) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/settings', data: data}).then(callback).catch(catchFunc);
}

function onSubmitChangeImageForm(evt) {
    evt.preventDefault();
     // TODO add input/handler/anything_else for downloading image

    let selectedImage = changeImageButton.files[0];
    console.log(selectedImage);

    const formData = new FormData();
    formData.append("file", selectedImage);

    changeImage(formData,
        function (response) {
            console.log(response);
            changeImageForm.reset();

            imageInProfile.setAttribute("src", HttpModule.baseUrl + '/files/' + response.fileName);
            imageInDownMenu.setAttribute("src", HttpModule.baseUrl + '/files/' + response.fileName);

            alert("OK!");
        },
        function (err) {
            console.log(err);
            changeImageForm.reset();
            alert('Неверно!');
        }
    );
}

function changeImage(data, callback, catchFunc) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/change_avatar', data: data}).then(callback).catch(catchFunc);
}

function onSubmitLoginForm(evt) {
    evt.preventDefault();
    //const fields = ['email', 'password'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = {};

    const emailPattern = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;

    let emailOrLogin = formElements['email'].value;

    if (emailOrLogin.search(emailPattern) === -1) {
        formData['login'] = emailOrLogin;
    } else {
        formData['email'] = emailOrLogin;
    }

    formData['password'] = formElements['password'].value;

    console.info('Authorization: ', formData);

    loginUser(formData,
        function (response) {
            console.log(response);
            checkAuth();
            openSection('menu');
        },
        function (err){
            console.log(err);
            loginForm.reset();
            alert('Неверно!');
            return;
        }
    );
}

function onSubmitRegisterForm(evt) {
    evt.preventDefault();
    const fields = ['email', 'login', 'password'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = fields.reduce(function (allFields, fieldName) {
        allFields[fieldName] = formElements[fieldName].value;
        return allFields;
    }, {});

    registerUser(formData,
        function (response) {
            console.log(response);
            checkAuth();
            openSection('menu');
        },
        function (err){
            console.log(err);
            registrationForm.reset();
            alert('Неверно!');
        }
    );
}

function onSubmitLogoutForm(evt){
    evt.preventDefault();

    logoutUser(
        function (response){
            console.log(response);
            checkAuth();
            openSection('menu');
        },
        function (err) {
            console.log(err);
            alert('Не удалось выйти из аккаунта. Проверьте соединение.');
        }
    );
}

function onSubmitScoreboardPaginatorLeftForm(evt) {
    evt.preventDefault();

    const page = {
        page: scoreboardPaginatorComponent.decrement()
    };

    loadAllUsers(page, function (data) {
        data['currentPage'] = scoreboardPaginatorComponent.pageNum;
        scoreboardComponent.data = data;
        scoreboardComponent.render();
        scoreboardPaginatorComponent.maxPageNum = data['maxPageNum'];
    });
}

function onSubmitScoreboardPaginatorRightForm(evt) {
    evt.preventDefault();

    const page = {
        page: scoreboardPaginatorComponent.increment()
    };

    loadAllUsers(page, function (data) {
        data['currentPage'] = scoreboardPaginatorComponent.pageNum;
        scoreboardComponent.data = data;
        scoreboardComponent.render();
        scoreboardPaginatorComponent.maxPageNum = data['maxPageNum'];
    })
}

function openScoreboard() {
    scoreboardComponent.clear();

    const page = {
        page: 1
    };

    scoreboardPaginatorComponent.clear();
    scoreboardPaginatorLeftForm.removeEventListener('submit', onSubmitScoreboardPaginatorLeftForm);
    scoreboardPaginatorLeftForm.addEventListener('submit', onSubmitScoreboardPaginatorLeftForm);
    scoreboardPaginatorRightForm.removeEventListener('submit', onSubmitScoreboardPaginatorRightForm);
    scoreboardPaginatorRightForm.addEventListener('submit', onSubmitScoreboardPaginatorRightForm);

    loadAllUsers(page, function (data) {
        data['currentPage'] = scoreboardPaginatorComponent.pageNum;
        scoreboardComponent.data = data;
        scoreboardComponent.render();
        scoreboardPaginatorComponent.maxPageNum = data['maxPageNum'];
    })
}

application.addEventListener('click', function (evt) {
    const target = evt.target;
    if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        evt.preventDefault();

        const section = target.getAttribute('data-section');

        console.log('Open section: ', section);
        openSection(section);
    }
});

function logoutUser(callback, catchFunc) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/logout'}).then(callback).catch(catchFunc);
}

function loginUser(user, callback, catchFunc) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/login', data: user}).then(callback).catch(catchFunc);
}

function registerUser(user, callback, catchFunc) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/register', data: user}).then(callback).catch(catchFunc);
}

function loadAllUsers(data, callback) {
    httpModule.doPostFetch({url: httpModule.baseUrl + '/users', data: data}).then(callback);
}

function loadMe(callback, catchFunc) {
    httpModule.doGetFetch({url: httpModule.baseUrl + '/me'}).then(callback).catch(catchFunc);
}


function checkAuth() {
    loadMe(
        function (me) {
            console.log('me is ', me);
            let imageSource = window.HttpModule.baseUrl + "/files/" + me.image;

            imageInProfile.setAttribute("src", imageSource); // avatar in profile

            me.image = imageSource;
            userFooterComponent.data = me; // avatar in drop-down menu
            userFooterComponent.render();
        },
        function (err) {
            console.log(err);
            userFooterComponent.clear();
        }
    );
}


checkAuth();
openSection('menu');

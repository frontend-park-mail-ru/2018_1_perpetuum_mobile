'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
const userFooterComponent = new window.UserFooterComponent( '.profile',
    {
        event: 'submit',
        callback: onSubmitLogoutForm
    }
);

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


const application = document.getElementById('application');


const sections = {
    login: loginSection,
    register: registerSection,
    singlePlayer: singlePlayerSection,
    multiPlayer: multiPlayerSection,
    scoreboard: scoreboardSection,
    profileSettings: profileSettingsSection,
    menu: menuSection
};

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

        },
        function (err) {
            changePasswordForm.reset();
            alert('Неверно!');
        }
    );
}

function changePassword(data, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/settings', data: data}).then(callback).catch(catchFunc);
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
            checkAuth();
        },
        function (err) {
            changeProfileNickForm.reset();
            alert('Неверно!');
        }
    );
}

function changeProfileNick(data, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/settings', data: data}).then(callback).catch(catchFunc);
}

function onSubmitChangeImageForm(evt) {
    evt.preventDefault();
    //const fields = ['image']; // TODO add input/handler/anything_else for downloading image
    const fields = []; //now Java returning "not enough data". it`s normal. return to previous commit to hide it.

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = fields.reduce(function (allFields, fieldName) {
        allFields[fieldName] = formElements[fieldName].value;
        return allFields;
    }, {});

    changeImage(formData,
        function (response) {
            changeImageForm.reset();
        },
        function (err) {
            changeImageForm.reset();
            alert('Неверно!');
        }
    );
}

function changeImage(data, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/settings', data: data}).then(callback).catch(catchFunc);
}

function onSubmitLoginForm(evt) {
    evt.preventDefault();
    const fields = ['email', 'password'];

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
            checkAuth();
            openSection('menu');
        },
        function (err){
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
            checkAuth();
            openSection('menu');
        },
        function (err){
            registrationForm.reset();
            alert('Неверно!');
        }
    );
}

function onSubmitLogoutForm(evt){
    evt.preventDefault();

    logoutUser(
        function (response){
            checkAuth();
            openSection('menu');
        },
        function (err) {
            alert('Не удалось выйти из аккаунта. Проверьте соединение.');
        }
    );
}

function openScoreboard() {
    scoreboardComponent.clear();

    const page = {
        page: 1
    };

    loadAllUsers(page, function (data) {
        console.log('data: ', data);
        scoreboardComponent.data = data;
        scoreboardComponent.render();
    })
}

application.addEventListener('click', function (evt) {
    const target = evt.target;
    if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button') {
        evt.preventDefault();

        const section = target.getAttribute('data-section');

        console.log(`Open section: `, section);
        openSection(section);
    }
});

function logoutUser(callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/logout'}).then(callback).catch(catchFunc);
}

function loginUser(user, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/login', data: user}).then(callback).catch(catchFunc);
}

function registerUser(user, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/register', data: user}).then(callback).catch(catchFunc);
}

function loadAllUsers(data, callback) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/users', data: data}).then(callback);
}

function loadMe(callback, catchFunc) {
    httpModule.doGetFetch({url: 'http://127.0.0.1:3050/me'}).then(callback).catch(catchFunc);
}



function checkAuth() {
    loadMe(
        function (me) {
            console.log('me is ', me);

            userFooterComponent.data = me;
            userFooterComponent.render();
        },
        function (err) {
            userFooterComponent.clear();
        }
    );
}


checkAuth();
openSection('menu');


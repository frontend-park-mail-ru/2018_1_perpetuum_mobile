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
    case 'blendocu.herokuapp.com':
        httpModule.baseUrl = '//blendocu-back.herokuapp.com';
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
const colorComponent = new window.ColorComponent('html');
const loginFormValidation = new window.LoginForm('.loginForm');
const registrationFormValidation = new window.RegistrationForm('.registrationForm');


const loginForm = document.getElementsByClassName('loginForm')[0];
const registrationForm = document.getElementsByClassName('registrationForm')[0];
const changeImageForm = document.getElementsByClassName('changeImageForm')[0];
const changeProfileNickForm = document.getElementsByClassName('changeProfileNickForm')[0];
const changePasswordForm = document.getElementsByClassName('changePasswordForm')[0];
const scoreboardPaginatorLeftForm = document.getElementsByClassName('scoreboardPaginatorLeftForm')[0];
const scoreboardPaginatorRightForm = document.getElementsByClassName('scoreboardPaginatorRightForm')[0];
const paintForm = document.getElementsByClassName('changeColor')[0];


const application = document.getElementById('application');
const changeImageButton = document.getElementById('changeImageButtonId');
const imageInProfile = document.getElementById('imageInProfile');


const sectionsForManager = {
    login: '.login',
    register: '.registration',
    singlePlayer: '.singlePlayer',
    multiPlayer: '.multiPlayer',
    scoreboard: '.scoreboard',
    profileSettings: '.profileSettings',
    menu: '.menu'
};

//телефон, тестовое

    let orientation = window.matchMedia('(orientation: portrait)');

    if(orientation.matches) {
        alert('переверните телефон');
    }

//


const openFunctionsForManager = {
    scoreboard: openScoreboard,
    register: () => {
        registrationForm.removeEventListener('submit', onSubmitRegisterForm);
        registrationForm.reset();
        registrationForm.addEventListener('submit', onSubmitRegisterForm);
    },
    login: () => {
        loginForm.removeEventListener('submit', onSubmitLoginForm);
        loginForm.reset();
        loginForm.addEventListener('submit', onSubmitLoginForm);
    },
    profileSettings: () => {
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

const sectionManager = new window.SectionManager({sections: sectionsForManager, openFunctions: openFunctionsForManager});

document.addEventListener('DOMContentLoaded', function (evt) {
    colorComponent.setRandomScheme();
});

paintForm.addEventListener('mousedown', function (evt) {
    colorComponent.setRandomScheme();
});

function onSubmitChangePasswordForm(evt) {
    evt.preventDefault();
    const fields = ['oldPassword', 'newPassword'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = reduceWithValues(formElements, fields);

    changePassword(formData).then(
        (response) => {
            console.log(response);
        }
    ).catch(
        (err) => {
            console.log(err);
            changePasswordForm.reset();
            alert('Неверно!');
        }
    );
}


function onSubmitChangeProfileNickForm(evt) {
    evt.preventDefault();
    const fields = ['login', 'email'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = reduceWithValues(formElements, fields);

    changeProfileNick(formData).then(
        (response) => {
            console.log(response);
            checkAuth();
        }
    ).catch(
        (err) => {
            console.log(err);
            changeProfileNickForm.reset();
            alert('Неверно!');
        }
    );
}


function onSubmitChangeImageForm(evt) {
    evt.preventDefault();

    let selectedImage = changeImageButton.files[0];
    console.log(selectedImage);

    const formData = new FormData();
    formData.append('file', selectedImage);

    changeImage(formData).then(
        (response) => {
            console.log(response);
            changeImageForm.reset();

            const imageInDownMenu = document.getElementById('imageInDownMenu');
            imageInProfile.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);
            imageInDownMenu.setAttribute('src', httpModule.baseUrl + '/files/' + response.fileName);

            alert('OK!');
        }
    ).catch(
        (err) => {
            console.log(err);
            changeImageForm.reset();
            alert('Неверно!!!');
        }
    );
}


function onSubmitLoginForm(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = {};

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let emailOrLogin = formElements['email'].value;

    if (emailOrLogin.search(emailPattern) === -1) {
        formData['login'] = emailOrLogin;
    } else {
        formData['email'] = emailOrLogin;
    }

    formData['password'] = formElements['password'].value;

    console.info('Authorization: ', formData);

    loginUser(formData).then(
        (response) => {
            console.log(response);
            checkAuth();
            sectionManager.openSection('menu');
        }
    ).catch(
        (err) => {
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

    const formData = reduceWithValues(formElements, fields);

    registerUser(formData).then(
        (response) => {
            console.log(response);
            checkAuth();
            sectionManager.openSection('menu');
        }
    ).catch(
        (err) => {
            console.log(err);
            registrationForm.reset();
            alert('Неверно!');
        }
    );
}

function onSubmitLogoutForm(evt){
    evt.preventDefault();

    logoutUser().then(
        (response) => {
            console.log(response);
            checkAuth();
            sectionManager.openSection('menu');
        }
    ).catch(
        (err) => {
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

    loadAllUsers(page).then(
        (data) => {
            data['currentPage'] = scoreboardPaginatorComponent.pageNum;
            scoreboardComponent.data = data;
            scoreboardComponent.render();
            scoreboardPaginatorComponent.maxPageNum = data['maxPageNum'];
        }
    );
}

function onSubmitScoreboardPaginatorRightForm(evt) {
    evt.preventDefault();

    const page = {
        page: scoreboardPaginatorComponent.increment()
    };

    loadAllUsers(page).then(
        (data) => {
            data['currentPage'] = scoreboardPaginatorComponent.pageNum;
            scoreboardComponent.data = data;
            scoreboardComponent.render();
            scoreboardPaginatorComponent.maxPageNum = data['maxPageNum'];
        }
    );
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

    loadAllUsers(page).then(
        (data) => {
            data['currentPage'] = scoreboardPaginatorComponent.pageNum;
            scoreboardComponent.data = data;
            scoreboardComponent.render();
            scoreboardPaginatorComponent.maxPageNum = data['maxPageNum'];
        }
    );
}

application.addEventListener('click', function (evt) {
    const target = evt.target;
    if (target.tagName.toLowerCase() === 'a') {
        evt.preventDefault();

        const section = target.getAttribute('data-section');

        console.log('Open section: ', section);
        sectionManager.openSection(section);
    }
});


function changePassword(data) {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/settings', data: data});
}

function changeProfileNick(data) {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/settings', data: data});
}

function changeImage(data) {
    return httpModule.doPostDataFetch({url: httpModule.baseUrl + '/change_avatar', data: data});
}

function logoutUser() {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/logout'});
}

function loginUser(user) {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/login', data: user});
}

function registerUser(user) {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/register', data: user});
}

function loadAllUsers(data) {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/users', data: data});
}

function loadMe() {
    return httpModule.doGetFetch({url: httpModule.baseUrl + '/me'});
}


function checkAuth() {
    loadMe().then(
        (me) => {
            console.log('me is ', me);
            let imageSource = httpModule.baseUrl + '/files/' + me.image;

            imageInProfile.setAttribute('src', imageSource); // avatar in profile

            me.image = imageSource;
            userFooterComponent.data = me; // avatar in drop-down menu
            userFooterComponent.render();
        }
    ).catch(
        (err) => {
            console.log(err);
            userFooterComponent.clear();
        }
    );
}


checkAuth();
sectionManager.openSection('menu');

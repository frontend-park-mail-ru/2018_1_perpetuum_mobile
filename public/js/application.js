'use strict';

const httpModule = new window.HttpModule();

const menuSection = document.getElementsByClassName('menu')[0];
const singlePlayerSection = document.getElementsByClassName('singlePlayer')[0];
const multiPlayerSection  = document.getElementsByClassName('multiPlayer')[0];
const scoreboardSection   = document.getElementsByClassName('scoreboard')[0];
const profileSettingsSection = document.getElementsByClassName('profileSettings')[0];
const registerSection = document.getElementsByClassName('registration')[0];
const loginSection = document.getElementsByClassName('login')[0];

const loginForm = document.getElementsByClassName('loginForm')[0];
const registrationForm = document.getElementsByClassName('registrationForm')[0];


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
    //scoreboard: openScoreboard,
    /*register: function () {
        registrationForm.removeEventListener('submit', onSubmitRegisterForm);
        registrationForm.reset();
        registrationForm.addEventListener('submit', onSubmitRegisterForm);
    },*/
    login: function () {
        loginForm.removeEventListener('submit', onSubmitLoginForm);
        loginForm.reset();
        loginForm.addEventListener('submit', onSubmitLoginForm);
    }
};

function onSubmitLoginForm(evt) {
    evt.preventDefault();
    const fields = ['email', 'password'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = fields.reduce(function (allFields, fieldName) {
        allFields[fieldName] = formElements[fieldName].value;
        return allFields;
    }, {});

    console.info('Authorization: ', formData);

    loginUser(formData, function (err, response) {
        if (err) {
            loginForm.reset();
            alert('Неверно!');
            return;
        }

        //checkAuth();
        openSection('menu');
    });
}

application.addEventListener('click', function (evt) {
    const target = evt.target;
    if (target.tagName.toLowerCase() !== 'a') {
        return;
    }

    evt.preventDefault();

    const section = target.getAttribute('data-section');

    console.log(`Open section: `, section);
    openSection(section);
});

function loginUser(user, callback) {
    httpModule.doPost({
        url: '/login',
        callback,
        data: user
    });
}



openSection('menu');


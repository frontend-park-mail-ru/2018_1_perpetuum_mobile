'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');

const menuSection = document.getElementsByClassName('menu')[0];
const singlePlayerSection = document.getElementsByClassName('singlePlayer')[0];
const multiPlayerSection  = document.getElementsByClassName('multiPlayer')[0];
const scoreboardSection   = document.getElementsByClassName('scoreboard')[0];
const profileSettingsSection = document.getElementsByClassName('profileSettings')[0];
const registerSection = document.getElementsByClassName('registration')[0];
const loginSection = document.getElementsByClassName('login')[0];

const loginForm = document.getElementsByClassName('loginForm')[0];
const registrationForm = document.getElementsByClassName('registrationForm')[0];
//const logoutForm = document.getElementsByClassName('logoutForm')[0]; suppose not working because choose when no form initialized
const profileFooter = document.getElementsByClassName('profile')[0];


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

    loginUser(formData,
        function (response) {
        checkAuth();
        openSection('menu');
    },
        function (err){
            loginForm.reset();
            alert('Неверно!');
            return;
        });
}

function onSubmitRegisterForm(evt) {
    evt.preventDefault();
    const fields = ['email', 'login', 'password', 'password_repeat'];

    const form = evt.currentTarget;
    const formElements = form.elements;

    const formData = fields.reduce(function (allFields, fieldName) {
        allFields[fieldName] = formElements[fieldName].value;
        return allFields;
    }, {});

    /*
    if(formData["password"] !== formData["password_repeat"]) {
        registrationForm.reset();
        alert('Пароли не совпадают');
        return;
    }

    console.log(typeof(formData));
    */
    //formdata.delete["password_repeat"]; //password repeat delete
    console.info('User registration: ', formData);


    registerUser(formData, function (response) {
        checkAuth();
        openSection('menu');
    },
        function (err){
            registrationForm.reset();
            alert('Неверно!');
        });
}

function openScoreboard() {
    scoreboardComponent.clear();

    loadAllUsers(function (data) {
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

function loginUser(user, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/login', data: user}).then(callback).catch(catchFunc);
}

function registerUser(user, callback, catchFunc) {
    httpModule.doPostFetch({url: 'http://127.0.0.1:3050/register', data: user}).then(callback).catch(catchFunc);
}

function loadAllUsers(callback) {
    httpModule.doGetFetch({url: 'http://127.0.0.1:3050/users'}).then(callback);
}

function loadMe(callback, catchFunc) {
    httpModule.doGetFetch({url: '/me'}).then(callback).catch(catchFunc);
}

function checkAuth() {
    loadMe(function (me) {
        console.log('me is ', me);
        profileFooter.innerHTML = `${me.login}
            <img src="img.jpg" class="imgInProfile">
            <div class="submenu">
                <ul>
                    <li><form class="logoutForm" method="post"><input type="submit" value="Logout"></form></li>
                    <li><a data-section="profileSettings">Settings</a></li>
                </ul>
            </div>`;
    },
        function (err) {
            console.log("check auth error ", err);
            profileFooter.innerHTML = '<a data-section="login" href="#">Log in&nbsp;</a>|&nbsp;<a data-section="register" href="#">Register</a>';
            return;

        });
}


checkAuth();
openSection('menu');


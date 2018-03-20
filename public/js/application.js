'use strict';

const httpModule = new window.HttpModule();

const design = new window.Design('.colors');
const user = new User();
const scoreboard = new Scoreboard();

const application = document.getElementsByClassName('js-application')[0];


const sectionsForManager = {
    login: '.js-wrapper-login',
    register: '.js-wrapper-registration',
    singlePlayer: '.js-wrapper-singleplayer',
    multiPlayer: '.js-wrapper-multiplayer',
    scoreboard: '.js-wrapper-scoreboard',
    profileSettings: '.js-wrapper-profile-settings',
    menu: '.js-wrapper-menu'
};


const openFunctionsForManager = {
    scoreboard: () => {
        scoreboard.scoreboardTable = '.js-scoreboard-table';
        scoreboard.setPaginator('.js-scoreboardPaginatorButtonLeft', '.js-scoreboardPaginatorButtonRight');
    },
    register: () => {
        user.registerForm = '.js-register-form';
    },
    login: () => {
        user.loginForm = '.js-login-form';
    },
    profileSettings: () => {
        user.changeProfileForm = '.js-changeProfileForm';
        user.changeImageForm = '.js-changeImageForm';
    }
};

const sectionManager = new window.SectionManager({sections: sectionsForManager, openFunctions: openFunctionsForManager});


application.addEventListener('click', function (evt) {
    const target = evt.target;
    if (target.tagName.toLowerCase() === 'a') {
        evt.preventDefault();

        const section = target.getAttribute('data-section');

        console.log('Open section: ', section);
        sectionManager.openSection(section);
    }
});

user.checkAuth();
sectionManager.openSection('menu');
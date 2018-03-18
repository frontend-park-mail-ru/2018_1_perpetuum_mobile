'use strict';

const httpModule = new window.HttpModule();

const colorComponent = new window.ColorComponent('html');

const paintForm = document.getElementsByClassName('changeColor')[0];


const application = document.getElementById('application');
const changeImageButton = document.getElementById('changeImageButtonId');
const imageInProfile = document.getElementById('imageInProfile');


const user = new User();
//user.userFooter = '.profile';
const scoreboard = new Scoreboard();

const sectionsForManager = {
    login: '.login',
    register: '.registration',
    singlePlayer: '.singlePlayer',
    multiPlayer: '.multiPlayer',
    scoreboard: '.scoreboard',
    profileSettings: '.profileSettings',
    menu: '.menu'
};


const openFunctionsForManager = {
    scoreboard: () => {
        scoreboard.scoreboardTable = '.js-scoreboard-table';
        scoreboard.setPaginator('.scoreboardPaginatorLeftForm>.paginatorButton', '.scoreboardPaginatorRightForm>.paginatorButton');
    },
    register: () => {
        user.registerForm = '.registrationForm';
    },
    login: () => {
        user.loginForm = '.loginForm';
    },
    profileSettings: () => {
        user.changePasswordForm = '.changePasswordForm';
        user.changeProfileNickForm = '.changeProfileNickForm';
        user.changeImageForm = '.changeImageForm';
    }
};

const sectionManager = new window.SectionManager({sections: sectionsForManager, openFunctions: openFunctionsForManager});

document.addEventListener('DOMContentLoaded', function (evt) {
    colorComponent.setRandomScheme();
});

paintForm.addEventListener('mousedown', function (evt) {
    colorComponent.setRandomScheme();
});

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





//телефон, тестовое

/*let orientation = window.matchMedia('(orientation: portrait)');

if (orientation.matches) {
    alert('переверните телефон');
}*/

//
'use strict';

const httpModule = new window.HttpModule();

const design = new window.Design('html');
const user = new User();
const scoreboard = new Scoreboard();

const application = document.getElementById('application');
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





//телефон, тестовое

/*let orientation = window.matchMedia('(orientation: portrait)');

if (orientation.matches) {
    alert('переверните телефон');
}*/

//
'use strict';

const httpModule = new window.HttpModule();

const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');
const userFooterComponent = new window.UserFooterComponent( '.profile',
    {
        event: 'submit',
        callback: onSubmitLogoutForm
    }
);
const scoreboardPaginatorComponent = new window.PaginatorComponent('.scoreboardPaginatorLeftForm>.paginatorButton', '.scoreboardPaginatorRightForm>.paginatorButton');
const colorComponent = new window.ColorComponent('html');


const scoreboardPaginatorLeftForm = document.getElementsByClassName('scoreboardPaginatorLeftForm')[0];
const scoreboardPaginatorRightForm = document.getElementsByClassName('scoreboardPaginatorRightForm')[0];
const paintForm = document.getElementsByClassName('changeColor')[0];


const application = document.getElementById('application');
const changeImageButton = document.getElementById('changeImageButtonId');
const imageInProfile = document.getElementById('imageInProfile');


const user = new User();

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
    scoreboard: openScoreboard,
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



function onSubmitLogoutForm(evt) {
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


function logoutUser() {
    return httpModule.doPostFetch({url: httpModule.baseUrl + '/logout'});
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





//телефон, тестовое

/*let orientation = window.matchMedia('(orientation: portrait)');

if (orientation.matches) {
    alert('переверните телефон');
}*/

//
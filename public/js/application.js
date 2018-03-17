'use strict';

const httpModule = new window.HttpModule();


const userFooterComponent = new window.UserFooterComponent( '.profile',
    {
        event: 'submit',
        callback: onSubmitLogoutForm
    }
);

const design = new window.Design('html');

const application = document.getElementById('application');
const changeImageButton = document.getElementById('changeImageButtonId');
const imageInProfile = document.getElementById('imageInProfile');


const user = new User();
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
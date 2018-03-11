'use strict';

function CustomValidation(input) {

    this.invalidities = [];
    this.validityChecks = [];
    this.inputNode = input;
    this.registerListener();
}

CustomValidation.prototype = {
    addInvalidity: function(message) {
        this.invalidities.push(message);
    },
    getInvalidities: function() {
        return this.invalidities.join('. \n');
    },
    checkValidity: function(input) {
        for ( let i = 0; i < this.validityChecks.length; i++ ) {

            let isInvalid = this.validityChecks[i].isInvalid(input);
            if (isInvalid) {
                this.addInvalidity(this.validityChecks[i].invalidityMessage);
            }
        }
    },
    checkInput: function() {
        this.inputNode.CustomValidation.invalidities = [];
        this.checkValidity(this.inputNode);

        if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
            this.inputNode.setCustomValidity('');
        } else {
            let message = this.inputNode.CustomValidation.getInvalidities();
            this.inputNode.setCustomValidity(message);
        }
    },
    registerListener: function() {
        let CustomValidation = this;
        this.inputNode.addEventListener('keyup', function() {
            CustomValidation.checkInput();
        });
    }
};

let usernameValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 3;
        },
        invalidityMessage: 'This input needs to be at least 3 characters',
    },
];

let passwordValidityChecks = [
    {
        isInvalid: function(input) {
            return input.value.length < 3;
        },
        invalidityMessage: 'This input needs to be at least 3 characters',
    }
];

let emailValidityChecks = [
    {
        isInvalid: function(input) {
            const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
            return !re.test(input.value);
        },
        invalidityMessage: 'wrong email',
    }
];

let usernameInput = document.getElementsByClassName('loginInput');
let passwordInput = document.getElementsByClassName('password');
let emailInput = document.getElementsByClassName('email');

for( let i = 0; i < usernameInput.length; i++) {
    usernameInput[i].CustomValidation = new CustomValidation(usernameInput[i]);
    usernameInput[i].CustomValidation.validityChecks = usernameValidityChecks;
}
for( let i = 0; i < passwordInput.length; i++) {
    passwordInput[i].CustomValidation = new CustomValidation(passwordInput[i]);
    passwordInput[i].CustomValidation.validityChecks = passwordValidityChecks;
}
for( let i = 0; i < emailInput.length; i++) {
    emailInput[i].CustomValidation = new CustomValidation(emailInput[i]);
    emailInput[i].CustomValidation.validityChecks = emailValidityChecks;
}

let inputs = document.querySelectorAll('input:not([type="submit"])');
let submit = document.querySelectorAll('input[type="submit"]');

function validate() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].CustomValidation.checkInput();
    }
}

for(let i = 0; i < submit.length; i++) {
    submit[i].addEventListener('click', validate);
}

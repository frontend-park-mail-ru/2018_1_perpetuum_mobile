import {ViewInterface} from '../ViewInterface.js';
import template from './resetView.tmpl.xml';
import {bus} from '../../Modules/bus.js';
import {Validation} from '../../Modules/validation.js';
import {Error} from '../../Components/Error/error';
import {Colour} from '../../Components/Colour/colour';
import {sharedData} from '../../Modules/sharedData';
import {CubicPreloader} from '../../Components/Preloader/cubicPreloader';

class ResetView extends ViewInterface {

    constructor() {
        super(template);
        this.content = null;
        this.sendingPreloader = null;
    }

    render(params = {}) {
        bus.emit('createLines');
        this.params = {
            form: 'js-reset-form',
            fields: [
                {
                    value: 'Email address',
                    classString: 'js-profile-email-input',
                    type: 'text',
                    name: 'email',
                    validation: Validation.validateEmail,
                    errorClassString: 'js-error-reset'
                }
                ],
            submit:
                {
                classString: 'js-reset-button',
                value: 'Reset'
            }
        };
        Object.assign(params, this.params);
        bus.on('reset-resp', this.onReply.bind(this));
        super.render(params);
        this.init();
        return this;
    }

    init() {
        this.content = this.el.getElementsByClassName('js-wrapper-block')[0];

        const button = document.getElementsByClassName(this.params.submit.classString)[0];
        this.resetForm = this.el.getElementsByClassName(this.params.form)[0];
        button.disabled = true;

        this.formValid = [];

        this.params.fields.forEach((value, i) => {

            this.formValid[i] = this.resetForm.getElementsByClassName(value.classString)[0];

            this.formValid[i].addEventListener('keyup', (evt) => {
                const isValid = value.validation(evt);

                this.formValid[i].valid = (isValid === true) ? Error.hideError(this.formValid[i], value.errorClassString) : Error.showError(this.formValid[i], isValid, value.errorClassString);

                if (this.formValid[i].value.length === 0) {
                    this.formValid.valid = Error.delError(this.formValid[i], value.errorClassString);
                }

                const allValid = this.formValid.reduce((res, current) => {
                    return !!current.valid && res;
                }, true);

                if (!allValid) {
                    button.disabled = true;
                    return;
                }
                button.disabled = false;
            });
        });

        this.resetForm.addEventListener('submit', evt => {
            evt.preventDefault();

            const allValid = this.formValid.reduce((res, current) => {
                return !!current.valid && res;
            }, true);

            if (allValid === true) {
                button.disabled = false;
                this.onReset(evt);
                this.showLoader();
            }
        });

        const firstForm = document.querySelector('input');
        firstForm.focus();

        this.colour = new Colour('colors');
    }

    isAllowed() {
        return !sharedData.data['currentUser'];
    }

    showLoader() {
        /*this.content.hidden = true;*/
        this.content.childNodes.forEach(node => {
            node.hidden = true;
        });
        this.sendingPreloader = new CubicPreloader();
    }

    removeLoader() {
        this.sendingPreloader.removePreloader();
        this.sendingPreloader = null;
        /*this.content.hidden = false;*/
        this.content.childNodes.forEach(node => {
            node.hidden = false;
        });
    }

    onReply(status, message) {
        this.removeLoader();
        if (status === 'OK') {
            this.onOkAnswer(message);
            return;
        }
        this.onErrAnswer(message);
    }

    onErrAnswer(message) {
        Error.serverError.bind(this)(message);
    }

    onOkAnswer(message) {
        Error.serverOk.bind(this)(message);
    }
}

export {ResetView}
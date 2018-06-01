/**
 * @module views/resetView
 */

import {ViewInterface} from '../ViewInterface.js';
import template from './resetView.tmpl.xml';
import {bus} from '../../Modules/bus.js';
import {Validation} from '../../Modules/validation.js';
import {Error} from '../../Components/Error/error';
import {Colour} from '../../Components/Colour/colour';
import {sharedData} from '../../Modules/sharedData';
import {CubicPreloader} from '../../Components/Preloader/cubicPreloader';


/**
 * Class representing a view of resetting forgotten password.
 */
class ResetView extends ViewInterface {

    /**
     * Create a ResetView instance.
     */
    constructor() {
        super(template);
        this.content = null;
    }

    /**
     * Render the view.
     * @param {object} params - The object with info provided to fest.
     * @return {ResetView} The current object instance.
     */
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
                }],
            submit: {
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

    /**
     * Add handlers.
     */
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

    /**
     * Is the view allowed to show.
     * @return {boolean}
     */
    isAllowed() {
        return !sharedData.data['currentUser'];
    }

    /**
     * Show loader, hide content when user is waiting for server reply.
     */
    showLoader() {
        this.content.childNodes.forEach(node => {
            node.hidden = true;
        });
        this.sendingPreloader = new CubicPreloader();
    }

    /**
     * Remove loader, display content when server answered.
     */
    removeLoader() {
        this.sendingPreloader.removePreloader();
        this.sendingPreloader = null;
        this.content.childNodes.forEach(node => {
            node.hidden = false;
        });
    }

    /**
     * The method defines the behaviour of view due to status.
     * @param {'OK'|'ERR'} status - The converted status of server response.
     * @param {string} message - The message from server.
     */
    onReply(status, message) {
        this.removeLoader();
        if (status === 'OK') {
            this.onOkAnswer(message);
            return;
        }
        this.onErrAnswer(message);
    }

    /**
     * Show error answer from server.
     * @param {string} message - The message from server.
     */
    onErrAnswer(message) {
        Error.serverError.bind(this)(message);
    }

    /**
     * Show ok answer from server.
     * @param {string} message - The message from server.
     */
    onOkAnswer(message) {
        Error.serverOk.bind(this)(message);
    }
}

export {ResetView}
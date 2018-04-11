/**
 * @module views/viewInterface
 */

/**
 * Class implements an interface to interact with views.
 */
class ViewInterface {

    /**
     * Create view.
     * @param {string} name - The name of fest template (the same as path to it).
     */
    constructor(name) {
        this.el = document.createElement('div');
        this.params = {};
        this.fest = window.fest[name];
    }

    /**
     * Show view.
     * Set the hidden attribute to false.
     * @return {ViewInterface} The current object instance.
     */
    show() {
        this.el.hidden = false;
        return this;
    }

    /**
     * Hide view.
     * Set the hidden attribute to true.
     * @return {ViewInterface} The current object instance.
     */
    hide() {
        this.el.hidden = true;
        return this;
    }

    /**
     * Render the view.
     * @param {object} params - The attributes with which fest template will be rendered.
     * @return {ViewInterface} The current object instance.
     */
    render(params) {
        this.params = params || this.params;
        this.el.innerHTML = this.fest(this.params);
        return this;
    }

    /**
     * Set the root element to this view.
     * @param root - The element to which view will be appended to.
     * @return {ViewInterface} The current object instance.
     */
    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

    /**
     * Check whether view is allowed to show.
     * @return {boolean} - True means allowed, false means not.
     */
    isAllowed() {
        return true;
    }

    /**
     * Destroy the current view.
     * Delete all rendered html from view element.
     * @return {ViewInterface} The current object instance.
     */
    destroy() {
        this.el.innerHTML = '';
        return this;
    }

    /**
     * Create the view.
     * Another words render and show this.
     * @param attrs - The attributes with which fest template will be rendered.
     * @return {ViewInterface} The current object instance.
     */
    create(attrs) {
        return this
            .render(attrs)
            .show();
    }
}

export {ViewInterface};
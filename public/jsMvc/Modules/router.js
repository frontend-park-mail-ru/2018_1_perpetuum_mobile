/** @module modules/router */

import {bus} from './bus.js';


/** Class implementing navigation inside SPA. */
class Router {

    /**
     * Create a router.
     * @param root - The root element of all Views. This place all views will be append to.
     */
    constructor(root) {
        this.pages = {};
        this.root = root;
        this.active = null;

        bus.on('reload', this.reload.bind(this));
    }

    /** Add new path to the path map.
     * @param {string} path - The path View will be available to open.
     * @param view - The View instance will be associated to the path.
     * @param {string} toOpen - The alias this view can be showed from other js code invoking
     * bus event.
     * Example: bus.emit(path);
     * or: bus.emit(path, [listOfParams]);
     * @return {Router} The current object instance. */
    add(path, view, toOpen) {
        this.pages[path] = view.renderTo(this.root);
        if (toOpen) {
            bus.on(toOpen, this.open.bind(this, path));
        }
        return this;
    }

    /** Redraw current view. Useful for updating view with new parameters.
     * @param {Object} attrs - The object contains parameters to proxy to view for redraw.
     * @return {Router} The current object instance. */
    reload(attrs) {
        if (this.active) {
            this.active.destroy();
            this.active.create(attrs);
        }
        return this;
    }

    /** Open one of views of SPA.
     * @param {string} path - The path will be opened, but firstly parsed by {@link choosePath}
     * to find in-url parameters.
     * @param {Object} attrs - The object contains parameters for view to render.
     * @param {string} pathAdding - The adding to path from controllers,
     * which will be parsed and send as second argument to view to render if user reloads page.
     * @return {Router} The current object instance. */
    open(path, attrs = {}, pathAdding = '') {
        const pathParamsDivided = this.choosePath(path, attrs);
        const fullPath = path + pathAdding;
        path = pathParamsDivided.url;
        attrs = pathParamsDivided.params;
        const view = this.pages[path];
        if (!view.isAllowed()) {
            return this.open('/');
        }

        if (this.active) {
            this.active.destroy();
            this.active = null;
        }

        this.active = view.create(attrs);
        if (window.location.pathname !== fullPath) {
            window.history.pushState(null, '', fullPath);
        }

        return this;
    }

    /** Initial function.
     * Setups all event listeners, invokes {@link open} with current url. */
    start() {
        window.addEventListener('popstate', function () {
            this.open(window.location.pathname);
        }.bind(this));

        this.root.addEventListener('click', function (evt) {
            if (evt.target.tagName.toLowerCase() === 'a') {
                evt.preventDefault();
                this.open(evt.target.pathname);
            }
        }.bind(this));

        this.open(window.location.pathname);
    }

    /** Routes path to the nearest path in path map.
     * @param {string} path - The path to parse.
     * @param {Object} params - The object contains parameters for view to render.
     * @return {Object<url string, params Object>} The url is the nearest path in the path map,
     * can be associated with original.
     * The params is modified original params Object, contains attribute urlParams with
     * reversed array of unused parts of url.*/
    choosePath(path, params = {}) {
        if (path in this.pages)
            return {url: path, params: params};
        let urlArr = path.split('/');
        urlArr.splice(0, 1);
        let urlParams = [];
        let urlString = '';
        while (urlArr.length > 0) {
            urlParams = urlArr.splice(urlArr.length - 1, 1).concat(urlParams);
            urlString = '/' + urlArr.join('/');
            if (urlString in this.pages){
                params.urlParams = urlParams;
                return {url: urlString, params: params};
            }
        }
        params.urlParams = urlParams;
        return {url: '/', params: params};
    }
}


export {Router};
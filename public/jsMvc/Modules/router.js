import {bus} from './bus.js';

class Router {
    constructor(root) {
        this.pages = {};
        this.root = root;
        this.active = null;

        bus.on('reload', this.reload.bind(this));
    }

    add(path, view, toOpen) {
        this.pages[path] = view.renderTo(this.root);
        if (toOpen) {
            bus.on(toOpen, this.open.bind(this, path));
        }
        return this;
    }

    reload(attrs) {
        if (this.active) {
            this.active.destroy();
            this.active.create(attrs);
        }
        return this;
    }

    open(path, attrs, pathAdding = '') {
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
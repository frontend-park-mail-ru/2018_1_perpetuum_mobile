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

    open(path, attrs) {
        const view = this.pages[path];
        if (!view || !view.isAllowed()) {
            return this;
        }

        if (this.active) {
            this.active.destroy();
            this.active = null;
        }

        this.active = view.create(attrs);
        if (window.location.pathname !== path) {
            window.history.pushState(null, '', path);
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
}


export {Router};
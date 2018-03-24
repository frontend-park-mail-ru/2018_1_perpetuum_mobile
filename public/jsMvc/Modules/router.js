class Router {
    constructor(root) {
        this.pages = {};
        this.root = root;
        this.active = null;
    }

    add(path, View) {
        this.pages[path] = new View().renderTo(this.root);
        return this;
    }

    open(path) {
        const view = this.pages[path];
        if (!view || view === this.active || !view.isAllowed()) {
            return this;
        }

        if (this.active){
            this.active.destroy();
            this.active = null;
        }

        this.active = view.create();
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
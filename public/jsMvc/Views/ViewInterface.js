class ViewInterface {

    constructor(name) {
        this.el = document.createElement('div');
        this.params = {};
        this.fest = window.fest[name];
    }

    show() {
        this.el.hidden = false;
        return this;
    }

    hide() {
        this.el.hidden = true;
        return this;
    }

    render(params) {
        this.params = params || this.params;
        this.el.innerHTML = this.fest(this.params);
        return this;
    }

    renderTo(root) {
        root.appendChild(this.el);
        return this;
    }

    isAllowed() {
        return true;
    }

    destroy() {
        this.el.remove();
        this.el = document.createElement('div');
        return this;
    }

    create(attrs) {
        return this
            .render(attrs)
            .show();
    }
}

export {ViewInterface};
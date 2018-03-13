(function () {
    const noop = () => null;

    class SectionManager {

        constructor({sections = {}, openFunctions = {}} = {}) {

            sections = Object.keys(sections).reduce((initial, key) => {
                let elem = document.querySelector(sections[key]);
                if (elem === undefined) {
                    console.warn('couldn`t find element in document by path: ', sections[key]);
                    return;
                }
                initial[key] = elem;
                return initial;
            }, {});

            openFunctions = Object.keys(openFunctions).reduce((initial, key) => {
                if (typeof openFunctions[key] !== 'function') {
                    console.warn('not a function: ', sections[key]);
                    return;
                }
                initial[key] = openFunctions[key];
                return initial;
            }, {});

            console.log(sections);
            console.log(openFunctions);

            this._sections = sections;
            this._openFunctions = openFunctions;
        }

        addSection(sectionName, pageElementSelector) {
            if (typeof pageElementSelector !== 'string') {
                console.warn('not a query selector: ', pageElementSelector);
                return;
            }

            if (typeof sectionName !== 'string') {
                console.warn('not a string: ', sectionName);
                return;
            }

            let el = document.querySelector(pageElementSelector);

            if (el === undefined) {
                console.warn('couldn`t find the element in document by path: ', pageElementSelector);
                return;
            }

            this._sections[sectionName] = el;
        }

        addSectionOpenFunction(sectionName, sectionOpenFunction) {
            if (typeof sectionOpenFunction !== 'function') {
                console.warn('not a function: ', sectionOpenFunction);
                return;
            }

            if (typeof sectionName !== 'string') {
                console.warn('not a string: ', sectionName);
                return;
            }

            this._openFunctions[sectionName] = sectionOpenFunction;
        }

        reinit(){
            this._openFunctions = {};
            this._sections = {};
        }

        openSection(name) {
            let self = this;

            Object.keys(this._sections).forEach(function (key) {
                self._sections[key].hidden = key !== name;
            });

            if (typeof this._openFunctions[name] === 'function') {
                this._openFunctions[name]();
            }
        }

    }

    window.SectionManager = SectionManager;

})();
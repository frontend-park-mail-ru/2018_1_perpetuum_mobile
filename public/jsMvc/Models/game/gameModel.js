class GameModel {
    constructor() {
        this.map = null;
        this.currentProgress = 0;
        this.vacantCubs = 0;
    }

    getMap(mapNum) {
        throw new Error('This method must be overridden');
    }

    setCubic(cubic) {
        throw new Error('This method must be overridden');
    }
}

export {GameModel}
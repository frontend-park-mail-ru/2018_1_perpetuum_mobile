/** @module modules/filling */
class Filling {
    constructor() {
        this.prevTips = 0;
    }

    /**
     * return random number
     * @param min {number} - number to start
     * @param max {number} - random limit
     * @returns {number} - random number
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * return random name for popup in start of multiplayer
     * @returns {string} - name
     */
    getRandomName() {
        const name = ['Opponent', 'Loser', 'Bot', 'Witcher'];
        const adjective = ['Magic', 'Beauty', '', 'Master', 'Worthy'];

        return `${adjective[this.random(0,adjective.length)]}${name[this.random(0,name.length)]}${this.random(1, 99)}`;
    }

    /**
     * return random rgb color
     * @returns {string} - rgb color
     */
    getRandomColor() {
        const MAX_COLOR = 255;

        const r = this.random(0, MAX_COLOR);
        const g = this.random(0, MAX_COLOR);
        const b = this.random(0, MAX_COLOR);

        return `rgb(${r}, ${g}, ${b})`;
    }

    /**
     * get random tips in popup in start of miltiplayer
     * @returns {string} - tips
     */
    getRandomTips() {
        const tips = [
            'Put all the cubes in the gradient',
            'Study, eat, JS',
            'Learn JS',
            'Walk the dog, wife and child',
            'Start searching the game in one time with your friend and play together'
        ];
        let currTips = this.random(0, tips.length);

        while (currTips === this.prevTips) {
            currTips = this.random(0, tips.length);
        }
        this.prevTips = currTips;
        return tips[currTips];
    }
}

const fill = new Filling();

export {fill};

class Filling {

    /**
     * return random number
     * @param min {number} - number to start
     * @param max {number} - random limit
     * @returns {number} - random number
     */
    random(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    getRandomName() {
        const name = ['Opponent', 'Loser', 'Bot', 'Witcher'];
        const adjective = ['Magic', 'Beauty', '', 'Master', 'Worthy'];

        return `${adjective[this.random(0,adjective.length)]}${name[this.random(0,name.length)]}${this.random(1, 99)}`;
    }

    getRandomColor() {
        const MAX_COLOR = 255;

        const r = this.random(0, MAX_COLOR);
        const g = this.random(0, MAX_COLOR);
        const b = this.random(0, MAX_COLOR);

        return `rgb(${r}, ${g}, ${b})`;
    }

    getRandomTips() {
        const tips = [
            'Put all the cubes in the gradient',
            'Study, eat, JS',
            'Learn JS',
            'Walk the dog, wife and child',
            'Start searching the game in one time with your friend and play together'
        ];
        return tips[this.random(0, tips.length)];
    }
}

const fill = new Filling();

export {fill};

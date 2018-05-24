/** @module modules/debounce */
/**
 * Creates and returns a new debounced version of the passed function that will
 * postpone its execution until after wait milliseconds have elapsed since
 * the last time it was invoked.
 * @param f - function
 * @param ms - time to wait
 * @returns {Function} - new debounced version of the passed function
 */
export default function debounce(f, ms) {

    let timer = null;

    return (...args) => {
        const onComplete = () => {
            f.apply(this, args);
            timer = null;
        };

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(onComplete, ms);
    };
}
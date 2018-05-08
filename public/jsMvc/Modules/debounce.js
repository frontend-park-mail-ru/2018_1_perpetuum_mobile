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
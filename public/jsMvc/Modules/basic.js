'use strict';

export function reduceWithValues(fromArray, keyArray) {
    return keyArray.reduce((allFields, fieldName) => {
        allFields[fieldName] = fromArray[fieldName].value;
        return allFields;
    }, {});
}

export function isQuerySelector(querySelector) {
    const elem = document.querySelector(querySelector);
    if (!elem) {
        throw Error("no element found by query selector" + querySelector);
    }
    return elem;
}

export function isEmail(email) {
    const  EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_PATTERN.test(email);
}

export function validateLength(value) {
    const ALLOW_INPUT_LENGTH = 4;
    return ((ALLOW_INPUT_LENGTH > value.length) && (value.length > 0));
}


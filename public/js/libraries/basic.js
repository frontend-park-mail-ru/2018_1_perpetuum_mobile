'use strict';

function reduceWithValues(fromArray, keyArray) {
    keyArray.reduce((allFields, fieldName) => {
        allFields[fieldName] = allFields[fieldName].value;
        return allFields;
    }, {});
}

function isQuerySelector(querySelector) {
    const elem = document.querySelector(querySelector);
    if (elem === undefined) {
        throw Error("no element found by query selector" + querySelector);
    }
    return elem;
}
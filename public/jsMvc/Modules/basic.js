'use strict';


/**
 * @function reduceWithValues
 * @param {Array<>} fromArray -
 * @param {Array<>} keyArray -
 * @return {Array<>} -
 * @todo add describe;
 * */

function reduceWithValues(fromArray, keyArray) {
    return keyArray.reduce((allFields, fieldName) => {
        allFields[fieldName] = fromArray[fieldName].value;
        return allFields;
    }, {});
}

export {reduceWithValues};

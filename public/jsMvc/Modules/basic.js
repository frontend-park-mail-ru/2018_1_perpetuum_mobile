'use strict';

/**
 * @function reduceWithValues
 * @param {Object|Array} fromArray - The item contains keyArray parameters and .value of them.
 * @param {Array<String>} keyArray - Array of keys of item.
 * @return {Object} - New object with properties like oldProperty: oldValue.value.
 */

function reduceWithValues(fromArray, keyArray) {
    return keyArray.reduce((allFields, fieldName) => {
        allFields[fieldName] = fromArray[fieldName].value;
        return allFields;
    }, {});
}

export {reduceWithValues};

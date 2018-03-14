'use strict';

function reduceWithValues(fromArray, keyArray) {
    keyArray.reduce((allFields, fieldName) => {
        allFields[fieldName] = allFields[fieldName].value;
        return allFields;
    }, {});
}
/* deepCopy */

let arrayTags = "[object Array]",
    argsTag = "[object Arguments]";

function deepCopy(obj) {
    let result = {}
    for (let key in obj) {
        if (obj[key] instanceof Object || obj[key] instanceof Array) {
            result[key] = deepCopy(obj)
        } 
        else {
            result[key] = obj[key]
        }
    }
}
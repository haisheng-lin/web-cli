"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = exports.isNull = exports.isUndefined = exports.isSymbol = exports.isFunction = exports.isArray = exports.isBoolean = exports.isString = exports.isNumber = void 0;
const toString = Object.prototype.toString;
function isNumber(value) {
    return toString.call(value) === '[object Number]';
}
exports.isNumber = isNumber;
function isString(value) {
    return toString.call(value) == '[object String]';
}
exports.isString = isString;
function isBoolean(value) {
    return toString.call(value) == '[object Boolean]';
}
exports.isBoolean = isBoolean;
function isArray(value) {
    return toString.call(value) == '[object Array]';
}
exports.isArray = isArray;
function isFunction(value) {
    return toString.call(value) == '[object Function]';
}
exports.isFunction = isFunction;
function isSymbol(value) {
    return toString.call(value) == '[object Symbol]';
}
exports.isSymbol = isSymbol;
function isUndefined(value) {
    return value === undefined;
}
exports.isUndefined = isUndefined;
function isNull(value) {
    return value === null;
}
exports.isNull = isNull;
function isPlainObject(value) {
    return (toString.call(value) == '[object Object]' ||
        // if it isn't a primitive value, then it is a common object
        (!isNumber(value) &&
            !isString(value) &&
            !isBoolean(value) &&
            !isArray(value) &&
            !isNull(value) &&
            !isFunction(value) &&
            !isUndefined(value) &&
            !isSymbol(value)));
}
exports.isPlainObject = isPlainObject;

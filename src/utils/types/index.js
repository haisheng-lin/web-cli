const toString = Object.prototype.toString;

const isNumber = value => toString.call(value) === '[object Number]';

const isString = value => toString.call(value) == '[object String]';

const isBoolean = value => toString.call(value) == '[object Boolean]';

const isArray = value => toString.call(value) == '[object Array]';

const isFunction = value => toString.call(value) == '[object Function]';

const isSymbol = value => toString.call(value) == '[object Symbol]';

const isUndefined = value => value === undefined;

const isNull = value => value === null;

const isPlainObject = value => {
  return (
    toString.call(value) == '[object Object]' ||
    // if it isn't a primitive value, then it is a common object
    (!isNumber(value) &&
      !isString(value) &&
      !isBoolean(value) &&
      !isArray(value) &&
      !isNull(value) &&
      !isFunction(value) &&
      !isUndefined(value) &&
      !isSymbol(value))
  );
};

const isPrimitive = value => {
  return isString(value) || isBoolean(value) || isNumber(value);
};

module.exports = {
  isNumber,
  isString,
  isBoolean,
  isArray,
  isFunction,
  isSymbol,
  isNull,
  isUndefined,
  isPlainObject,
  isPrimitive,
};

const { isPlainObject, isUndefined } = require('../utils/types');

const merge = (...objs) => {
  const result = Object.create(null);

  objs.forEach(obj => {
    if (isPlainObject(obj)) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = merge(result[key], val);
          } else {
            result[key] = merge(val);
          }
        } else {
          result[key] = val;
        }
      });
    }
  });

  return result;
};

const deepMergeStrategy = (val1, val2) => {
  if (isPlainObject(val2)) {
    return merge(val1, val2);
  } else if (!isUndefined(val2)) {
    return val2;
  } else if (isPlainObject(val1)) {
    return merge(val1);
  } else if (!isUndefined(val1)) {
    return val1;
  }
};

module.exports = deepMergeStrategy;

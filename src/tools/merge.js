const { isPlainObject, isUndefined } = require('../utils/types');

const merge = (...objs) => {
  return objs.reduce((prev, obj) => {
    if (isPlainObject(obj)) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];
        if (isPlainObject(val)) {
          if (isPlainObject(prev[key])) {
            prev[key] = merge(prev[key], val);
          } else {
            prev[key] = merge(val);
          }
        } else {
          prev[key] = val;
        }
      });
    }

    return prev;
  }, Object.create(null));
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

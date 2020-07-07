import utils from '@utils';

const { isPlainObject, isUndefined } = utils.types;

const merge = (...objs: { [p: string]: any }[]): { [p: string]: any } => {
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

const deepMergeStrategy = (val1: any, val2: any) => {
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

export default deepMergeStrategy;

const defaultZoroJSON = require('../defaults/zoro.json');
const merge = require('./merge');
const { isString, isPlainObject } = require('../utils/types');

const deepResolveDefine = target => {
  if (isPlainObject(target)) {
    const result = Object.create(null);
    Object.keys(target).forEach(key => {
      result[key] = deepResolveDefine(target[key]);
    });

    return result;
  } else if (isString(target)) {
    return JSON.stringify(target);
  } else {
    return target;
  }
};

const resolveZoroJSON = zoroJSON => {
  const resolvedJSON = merge(defaultZoroJSON, zoroJSON);

  /**
   * 根据官方文档 https://www.webpackjs.com/plugins/define-plugin
   * 修正 define 输出给 webpack.DefinePlugin
   *
   * { "dev": { "process.env": { "REACT_APP_ENV": "\"dev\"" } } }
   */

  const defineNamespace = resolvedJSON.defineNamespace;
  const existDefineNamespace = defineNamespace && isString(defineNamespace);
  const originalDefine = resolvedJSON.define;

  if (isPlainObject(originalDefine)) {
    const webpackDefine = {};
    Object.keys(originalDefine).forEach(env => {
      const envDefine = deepResolveDefine(originalDefine[env]);
      webpackDefine[env] = existDefineNamespace
        ? { [defineNamespace]: envDefine }
        : envDefine;
    });

    resolvedJSON.define = webpackDefine;
  }

  return resolvedJSON;
};

module.exports = resolveZoroJSON;

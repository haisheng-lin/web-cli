"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = __importDefault(require("@utils"));
const zoroJSON_1 = __importDefault(require("@defaults/zoroJSON"));
const merge_1 = __importDefault(require("./merge"));
const { isString, isPlainObject } = _utils_1.default.types;
const deepResolveDefine = (target) => {
    if (isPlainObject(target)) {
        return Object.keys(target).reduce((prev, key) => {
            prev[key] = deepResolveDefine(target[key]);
            return prev;
        }, Object.create(null));
    }
    else if (isString(target)) {
        return JSON.stringify(target);
    }
    else {
        return target;
    }
};
const resolveZoroJSON = (zoroJSON) => {
    const resolvedJSON = merge_1.default(zoroJSON_1.default, zoroJSON);
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
        resolvedJSON.define = Object.keys(originalDefine).reduce((prev, env) => {
            const envDefine = deepResolveDefine(originalDefine[env]);
            prev[env] = existDefineNamespace
                ? { [defineNamespace]: envDefine }
                : envDefine;
            return prev;
        }, Object.create(null));
    }
    return resolvedJSON;
};
exports.default = resolveZoroJSON;

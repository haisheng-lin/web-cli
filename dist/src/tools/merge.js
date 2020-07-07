"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = __importDefault(require("@utils"));
const { isPlainObject, isUndefined } = _utils_1.default.types;
const merge = (...objs) => {
    return objs.reduce((prev, obj) => {
        if (isPlainObject(obj)) {
            Object.keys(obj).forEach(key => {
                const val = obj[key];
                if (isPlainObject(val)) {
                    if (isPlainObject(prev[key])) {
                        prev[key] = merge(prev[key], val);
                    }
                    else {
                        prev[key] = merge(val);
                    }
                }
                else {
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
    }
    else if (!isUndefined(val2)) {
        return val2;
    }
    else if (isPlainObject(val1)) {
        return merge(val1);
    }
    else if (!isUndefined(val1)) {
        return val1;
    }
};
exports.default = deepMergeStrategy;

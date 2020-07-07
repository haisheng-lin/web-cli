"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = __importDefault(require("@utils"));
const _constants_1 = require("@constants");
const { isPlainObject } = _utils_1.default.types;
const checkZoroJSONFormat = (zoroJSON) => {
    if (!isPlainObject(zoroJSON)) {
        throw new Error(`cannt find ${_constants_1.ZORO_JSON_FILENAME}, or its format isn't JSON format`);
    }
    if (!(zoroJSON === null || zoroJSON === void 0 ? void 0 : zoroJSON.plugin)) {
        throw new Error(`the ${'plugin'.bold} field is necessary`);
    }
};
exports.default = checkZoroJSONFormat;

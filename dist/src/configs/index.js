"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const package_json_1 = __importDefault(require("../../package.json"));
const _constants_1 = require("@constants");
const _paths_1 = require("@paths");
const resolveZoroJSON_1 = __importDefault(require("@tools/resolveZoroJSON"));
// 业务项目的 zoro.json 配置路径
const zoroJSONPath = path_1.default.resolve(_paths_1.currentPath, _constants_1.ZORO_JSON_FILENAME);
// 业务项目的 package.json 路径
const packageJSONPath = path_1.default.resolve(_paths_1.currentPath, 'package.json');
const zoroJSON = require(zoroJSONPath) || {};
const packageJSON = require(packageJSONPath) || {};
exports.default = {
    project: {
        zoroJSON,
        resolvedZoroJSON: resolveZoroJSON_1.default(zoroJSON),
        packageJSON,
    },
    zoro: {
        packageJSON: package_json_1.default,
    },
};

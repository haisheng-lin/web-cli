"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const _paths_1 = require("@paths");
const getPluginPath = (pluginName) => {
    return path_1.default.resolve(_paths_1.pluginsPath, pluginName);
};
exports.default = getPluginPath;

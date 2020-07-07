"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const getPluginPath_1 = __importDefault(require("./getPluginPath"));
const resolveEntryFromPlugin = (pluginPath, pluginName, entryFileName) => {
    const entryFilePath = path_1.default.resolve(pluginPath, entryFileName);
    if (!fs_1.default.existsSync(entryFilePath)) {
        throw new Error(`${pluginName} not exist ${entryFileName} for aop invoking`);
    }
    return entryFilePath;
};
const getTargetEntry = (pluginName, entryFileName) => {
    const pluginPath = getPluginPath_1.default(pluginName);
    const isPluginExist = fs_1.default.existsSync(pluginPath);
    if (isPluginExist) {
        const entryFilePath = resolveEntryFromPlugin(pluginPath, pluginName, entryFileName);
        return require(entryFilePath);
    }
    else {
        throw new Error(`cannot find ${pluginName}. Try to install ${pluginName}.`);
    }
};
exports.default = getTargetEntry;

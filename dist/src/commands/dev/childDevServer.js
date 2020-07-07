"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// 这个文件是 fork 进程执行的，要另外引入一次 module alias
require("module-alias/register");
const getTargetEntry_1 = __importDefault(require("@tools/getTargetEntry"));
const _context_1 = __importDefault(require("@context"));
const _constants_1 = require("@constants");
const log = _context_1.default.utils.log;
const { isFunction } = _context_1.default.utils.types;
try {
    const pluginName = (_a = _context_1.default.configs.project.zoroJSON) === null || _a === void 0 ? void 0 : _a.plugin;
    const devServer = getTargetEntry_1.default(pluginName, _constants_1.PLUGIN_DEV_FILENAME);
    if (isFunction(devServer)) {
        devServer(_context_1.default);
    }
    else {
        throw new Error(`${pluginName} not implement '${_constants_1.PLUGIN_DEV_FILENAME}' for dev command`);
    }
}
catch (e) {
    log.error(e.message);
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginsPath = exports.currentPath = void 0;
const path_1 = __importDefault(require("path"));
const _constants_1 = require("@constants");
// zoro 项目根路径，由于编译后存放到 /dist 下，所以路径需再往上一层
const zoroRootPath = path_1.default.resolve(__dirname, '../../../');
// 当前执行命令的 cwd 路径
exports.currentPath = process.cwd();
// plugins 目录路径
exports.pluginsPath = path_1.default.resolve(zoroRootPath, _constants_1.PLUGINS_FOLDER_NAME);

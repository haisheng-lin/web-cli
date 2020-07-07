"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const child_process_1 = require("child_process");
const _constants_1 = require("@constants");
const _paths_1 = require("@paths");
const _utils_1 = __importDefault(require("@utils"));
const _configs_1 = __importDefault(require("@configs"));
const getPluginPath_1 = __importDefault(require("@tools/getPluginPath"));
const checkZoroJSONFormat_1 = __importDefault(require("@tools/checkZoroJSONFormat"));
const installPackage_1 = require("@tools/installPackage");
const dev = () => __awaiter(void 0, void 0, void 0, function* () {
    const log = _utils_1.default.log;
    const { isPlainObject } = _utils_1.default.types;
    const { project: { zoroJSON }, } = _configs_1.default;
    try {
        checkZoroJSONFormat_1.default(zoroJSON);
        const pluginName = isPlainObject(zoroJSON) && zoroJSON.plugin ? zoroJSON.plugin : '';
        const pluginPath = getPluginPath_1.default(pluginName);
        if (!fs_1.default.existsSync(pluginPath)) {
            throw new Error(`cannot find ${pluginName}, maybe try to install`);
        }
        const existNodeModules = fs_1.default.existsSync(path_1.default.resolve(pluginPath, 'node_modules'));
        const packageType = zoroJSON.package || 'npm';
        if (!existNodeModules) {
            log.info(`[PKG] ${packageType} is installing packages`);
            installPackage_1.installPackageSync(packageType, { cwd: pluginPath, stdio: 'inherit' });
            log.info(`[PKG] ${packageType} completed installation`);
        }
        const childDevServerPath = path_1.default.resolve(__dirname, 'childDevServer');
        // fork 子进程
        let childDevProcess = child_process_1.fork(childDevServerPath);
        fs_1.default.watchFile(path_1.default.resolve(_paths_1.currentPath, _constants_1.ZORO_JSON_FILENAME), () => {
            log.info(`${_constants_1.ZORO_JSON_FILENAME} has been changed, reexecute dev command ...`);
            childDevProcess.kill('SIGINT');
            childDevProcess = child_process_1.fork(childDevServerPath);
        });
    }
    catch (e) {
        log.error(e.message);
    }
});
exports.default = dev;

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
const enquirer_1 = require("enquirer");
const getTargetEntry_1 = __importDefault(require("@tools/getTargetEntry"));
const getPluginPath_1 = __importDefault(require("@tools/getPluginPath"));
const checkZoroJSONFormat_1 = __importDefault(require("@tools/checkZoroJSONFormat"));
const installPackage_1 = require("@tools/installPackage");
const _constants_1 = require("@constants");
const _utils_1 = __importDefault(require("@utils"));
const _context_1 = __importDefault(require("@context"));
const build = () => __awaiter(void 0, void 0, void 0, function* () {
    const { types: { isPlainObject, isFunction }, log, } = _utils_1.default;
    try {
        const { zoroJSON, resolvedZoroJSON } = _context_1.default.configs.project;
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
        const builder = getTargetEntry_1.default(pluginName, _constants_1.PLUGIN_BUILD_FILENAME);
        const buildOptions = Object.keys((resolvedZoroJSON === null || resolvedZoroJSON === void 0 ? void 0 : resolvedZoroJSON.define) || {});
        let env = null;
        if (buildOptions.length) {
            const { entry } = yield enquirer_1.prompt({
                type: 'select',
                name: 'entry',
                message: 'Choose a build environment',
                choices: buildOptions,
            });
            env = entry;
        }
        if (isFunction(builder)) {
            builder(Object.assign(Object.assign({}, _context_1.default), { env }));
        }
        else {
            throw new Error(`${pluginName} not implement '${_constants_1.PLUGIN_BUILD_FILENAME}' for build command`);
        }
    }
    catch (e) {
        log.error(e.message);
    }
});
exports.default = build;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installPackageSync = void 0;
const child_process_1 = require("child_process");
function installPackageSync(packageType = 'npm', options) {
    const extra = packageType === 'yarn' ? ' --production=false' : '';
    child_process_1.execSync(packageType + ' install' + extra, options);
}
exports.installPackageSync = installPackageSync;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = __importDefault(require("./color"));
const styleLabel = (bg, fg, msg) => {
    return bg + fg + ` ${msg} ` + color_1.default.Reset;
};
const styleMessage = (fg, msg) => {
    return fg + msg + color_1.default.Reset;
};
const warn = (msg) => {
    return console.log(styleLabel(color_1.default.bg.Yellow, color_1.default.fg.White, 'WARNING'), styleMessage(color_1.default.fg.Yellow, msg));
};
const info = (msg) => {
    const label = styleLabel(color_1.default.bg.Blue, color_1.default.fg.White, 'INFO');
    return console.log(label, msg);
};
const error = (msg) => {
    return console.log(styleLabel(color_1.default.bg.Red, color_1.default.fg.White, 'ERROR'), styleMessage(color_1.default.fg.Red, msg));
};
const success = (msg) => {
    return console.log(styleLabel(color_1.default.bg.Green, color_1.default.fg.White, 'SUCCESS'), styleMessage(color_1.default.fg.Green, msg));
};
exports.default = {
    info,
    success,
    warn,
    error,
};

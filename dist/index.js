#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const commander_1 = require("commander");
const dev_1 = __importDefault(require("@commands/dev"));
const build_1 = __importDefault(require("@commands/build"));
const publish_1 = __importDefault(require("@commands/publish"));
const program = new commander_1.Command();
program.command('dev').action(dev_1.default);
program.command('build').action(build_1.default);
program.command('publish').action(publish_1.default);
program.parse(process.argv);

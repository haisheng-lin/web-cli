#!/usr/bin/env node

const { Command } = require('commander');

const dev = require('./commands/dev');
const build = require('./commands/build');
const publish = require('./commands/publish');

const program = new Command();

program.command('dev').action(dev);
program.command('build').action(build);
program.command('publish').action(publish);

program.parse(process.argv);

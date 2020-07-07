#!/usr/bin/env node

import 'module-alias/register';

import { Command } from 'commander';

import dev from '@commands/dev';
import build from '@commands/build';
import publish from '@commands/publish';

const program = new Command();

program.command('dev').action(dev);
program.command('build').action(build);
program.command('publish').action(publish);

program.parse(process.argv);

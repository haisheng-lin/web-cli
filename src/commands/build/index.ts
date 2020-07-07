import path from 'path';
import fs from 'fs';
import { prompt } from 'enquirer';

import getTargetEntry from '@tools/getTargetEntry';
import getPluginPath from '@tools/getPluginPath';
import checkZoroJSONFormat from '@tools/checkZoroJSONFormat';
import { installPackageSync } from '@tools/installPackage';
import { PLUGIN_BUILD_FILENAME } from '@constants';
import utils from '@utils';
import context from '@context';

const build = async () => {
  const {
    types: { isPlainObject, isFunction },
    log,
  } = utils;

  try {
    const { zoroJSON, resolvedZoroJSON } = context.configs.project;

    checkZoroJSONFormat(zoroJSON);
    const pluginName =
      isPlainObject(zoroJSON) && zoroJSON.plugin ? zoroJSON.plugin : '';
    const pluginPath = getPluginPath(pluginName);

    if (!fs.existsSync(pluginPath)) {
      throw new Error(`cannot find ${pluginName}, maybe try to install`);
    }

    const existNodeModules = fs.existsSync(
      path.resolve(pluginPath, 'node_modules')
    );

    const packageType = zoroJSON.package || 'npm';
    if (!existNodeModules) {
      log.info(`[PKG] ${packageType} is installing packages`);
      installPackageSync(packageType, { cwd: pluginPath, stdio: 'inherit' });
      log.info(`[PKG] ${packageType} completed installation`);
    }

    const builder = getTargetEntry(pluginName, PLUGIN_BUILD_FILENAME);
    const buildOptions = Object.keys(resolvedZoroJSON?.define || {});

    let env = null;

    if (buildOptions.length) {
      const { entry } = await prompt({
        type: 'select',
        name: 'entry',
        message: 'Choose a build environment',
        choices: buildOptions,
      });

      env = entry;
    }

    if (isFunction(builder)) {
      builder({ ...context, env });
    } else {
      throw new Error(
        `${pluginName} not implement '${PLUGIN_BUILD_FILENAME}' for build command`
      );
    }
  } catch (e) {
    log.error(e.message);
  }
};

export default build;

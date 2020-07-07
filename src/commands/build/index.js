const path = require('path');
const fs = require('fs');
const { prompt } = require('enquirer');

const context = require('../../context');
const getTargetEntry = require('../../tools/getTargetEntry');
const getPluginPath = require('../../tools/getPluginPath');
const checkZoroJSONFormat = require('../../tools/checkZoroJSONFormat');
const { installPackageSync } = require('../../tools/installPackage');
const { PLUGIN_BUILD_FILENAME } = require('../../constants');

const zoroJSON = context.configs.project.zoroJSON;
const resolvedZoroJSON = context.configs.project.resolvedZoroJSON;
const isFunction = context.utils.types.isFunction;
const isPlainObject = context.utils.types.isPlainObject;
const log = context.utils.log;

const build = async () => {
  try {
    checkZoroJSONFormat(zoroJSON);
    const pluginName = isPlainObject(zoroJSON) ? zoroJSON.plugin : '';
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
    const buildOptions = Object.keys(resolvedZoroJSON.define);

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

module.exports = build;

const path = require('path');
const fs = require('fs');
const { prompt } = require('enquirer');

const context = require('../../context');
const getTargetEntry = require('../../tools/getTargetEntry');
const getPluginPath = require('../../tools/getPluginPath');
const checkAndResolveZoroJSON = require('../../tools/checkAndResolveZoroJSON');
const { installPackageSync } = require('../../tools/installPackage');
const { PLUGIN_PUBLISH_FILENAME } = require('../../constants');

const isFunction = context.utils.types.isFunction;
const log = context.utils.log;

const publish = async () => {
  try {
    const resolvedZoroJSON = checkAndResolveZoroJSON();
    const pluginName = resolvedZoroJSON.plugin;
    const pluginPath = getPluginPath(pluginName);

    if (!fs.existsSync(pluginPath)) {
      throw new Error(`cannot find ${pluginName}, maybe try to install`);
    }

    const existNodeModules = fs.existsSync(
      path.resolve(pluginPath, 'node_modules')
    );
    const packageType = resolvedZoroJSON.package;
    if (!existNodeModules) {
      log.info(`[PKG] ${packageType} is installing packages`);
      installPackageSync(packageType, { cwd: pluginPath, stdio: 'inherit' });
      log.info(`[PKG] ${packageType} completed installation`);
    }

    const publisher = getTargetEntry(pluginName, PLUGIN_PUBLISH_FILENAME);
    const publishOptions = Object.keys(resolvedZoroJSON.publish);

    let env = null;
    let publishOption = null;

    if (publishOptions.length) {
      const { entry } = await prompt({
        type: 'select',
        name: 'entry',
        message: 'Choose a publish environment',
        choices: publishOptions,
      });

      env = entry;
      publishOption = resolvedZoroJSON.publish[env];
    }

    if (isFunction(publisher)) {
      publisher({ ...context, env, publishOption });
    } else {
      throw new Error(
        `${pluginName} not implement '${PLUGIN_PUBLISH_FILENAME}' for publish command`
      );
    }
  } catch (e) {
    log.error(e.message);
  }
};

module.exports = publish;

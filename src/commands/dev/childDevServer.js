const getTargetEntry = require('../../tools/getTargetEntry');
const context = require('../../context');
const { PLUGIN_DEV_FILENAME } = require('../../constants');

const isFunction = context.utils.types.isFunction;
const log = context.utils.log;

try {
  const pluginName = context.configs.project.zoroJSON.plugin;
  const devServer = getTargetEntry(pluginName, PLUGIN_DEV_FILENAME);

  if (isFunction(devServer)) {
    devServer(context);
  } else {
    throw new Error(
      `${pluginName} not implement '${PLUGIN_DEV_FILENAME}' for dev command`
    );
  }
} catch (e) {
  log.error(e.message);
}

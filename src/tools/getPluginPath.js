const path = require('path');

const { pluginsPath } = require('../paths');

/**
 * @param {string} pluginName
 * @returns {string}
 */
const getPluginPath = pluginName => path.resolve(pluginsPath, pluginName);

module.exports = getPluginPath;

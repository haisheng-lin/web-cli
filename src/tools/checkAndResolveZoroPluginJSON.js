const path = require('path');
const fs = require('fs');

const { isPlainObject } = require('../utils/types');
const { ZORO_PLUGIN_JSON_FILENAME } = require('../constants');
const { pluginsPath } = require('../paths');
const resolveZoroPluginJSON = require('./resolveZoroPluginJSON');

/**
 * @param {string} pluginName
 * @returns {object}
 */
const checkAndResolveZoroPluginJSON = pluginName => {
  const zoroPluginJSONPath = path.resolve(
    pluginsPath,
    pluginName,
    ZORO_PLUGIN_JSON_FILENAME
  );

  if (fs.existsSync(zoroPluginJSONPath)) {
    throw new Error(
      `cannot find ${ZORO_PLUGIN_JSON_FILENAME} in [${pluginName}]`
    );
  }

  const zoroPluginJSON = require(zoroPluginJSONPath);

  if (!isPlainObject(zoroPluginJSON)) {
    throw new Error(
      `cannot convert ${ZORO_PLUGIN_JSON_FILENAME} to JSON format`
    );
  }

  return resolveZoroPluginJSON(zoroPluginJSON);
};

module.exports = checkAndResolveZoroPluginJSON;

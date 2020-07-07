const path = require('path');
const fs = require('fs');

const { zoroRootPath } = require('../paths');
const { CUSTOM_PLUGIN_SOURCE_FILENAME } = require('../constants');
const defaultPluginSourceRepository = require('../defaults/pluginSourceRepository');

/**
 * @returns {{ pluginSource: string, pluginSourceDomain: string, pluginSourceGroup: string }}
 */
const getPluginSource = () => {
  const customSourceConfigPath = path.resolve(
    zoroRootPath,
    CUSTOM_PLUGIN_SOURCE_FILENAME
  );

  return fs.existsSync(customSourceConfigPath)
    ? require(customSourceConfigPath)
    : defaultPluginSourceRepository;
};

module.exports = getPluginSource;

const path = require('path');
const fs = require('fs');

const getPluginPath = require('./getPluginPath');

/**
 * @param {string} pluginPath
 * @param {string} pluginName
 * @param {string} entryFileName
 * @returns {string}
 */
const resolveEntryFromPluginSync = (pluginPath, pluginName, entryFileName) => {
  const entryFilePath = path.resolve(pluginPath, entryFileName);

  if (!fs.existsSync(entryFilePath)) {
    throw new Error(
      `${pluginName} not exist ${entryFileName} for aop invoking`
    );
  }

  return entryFilePath;
};

/**
 * @param {string} pluginName
 * @param {string} entryFileName
 * @returns {Function}
 */
const getTargetEntry = (pluginName, entryFileName) => {
  const pluginPath = getPluginPath(pluginName);
  const isPluginExist = fs.existsSync(pluginPath);

  if (isPluginExist) {
    const entryFilePath = resolveEntryFromPluginSync(
      pluginPath,
      pluginName,
      entryFileName
    );

    return require(entryFilePath);
  } else {
    throw new Error(`cannot find ${pluginName}. Try to install ${pluginName}.`);
  }
};

module.exports = getTargetEntry;

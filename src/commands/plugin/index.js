const install = require('./install');

const commandMap = {
  install,
};

/**
 * @param {string} commandType
 * @param {string} pluginName
 * @returns {Promise<void>}
 */
const pluginCommandDispatcher = async (commandType, pluginName) => {
  if (commandMap[commandType]) {
    const command = commandMap[commandType];
    await command(pluginName);
  }

  process.exit();
};

module.exports = pluginCommandDispatcher;

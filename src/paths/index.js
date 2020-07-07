const path = require('path');
const { PLUGINS_FOLDER_NAME } = require('../constants');

// 当前执行命令的 cwd 路径
const currentPath = process.cwd();

// zoro 项目根路径
const zoroRootPath = path.resolve(__dirname, '../../');

// plugins 目录路径
const pluginsPath = path.resolve(zoroRootPath, PLUGINS_FOLDER_NAME);

module.exports = {
  currentPath,
  pluginsPath,
};

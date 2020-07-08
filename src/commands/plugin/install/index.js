const path = require('path');
const fs = require('fs');

const download = require('./download');
const { pluginsPath } = require('../../../paths');
const log = require('../../../utils/log');
const { installPackageSync } = require('../../../tools/installPackage');
const checkAndResolveZoroPluginJSON = require('../../../tools/checkAndResolveZoroPluginJSON');
const { ZORO_PLUGIN_JSON_FILENAME } = require('../../../constants');

let tempId = 0; // 下载插件时暂存的位置 id

/**
 * @param {string} pluginName
 */
const install = async pluginName => {
  const tempPath = path.resolve(pluginsPath, `__temp${tempId++}`);
  try {
    // 安装之前先不能移除之前的插件
    // 因为如果安装不成功，则无法回退
    // 因此先需要将 plugin下载到 temp 文件夹中
    // 确认下载成功, 且校验插件无误之后。才可以替换先前的文件夹

    log.info(`trying to download [${pluginName}] ...`);

    const finalPath = path.resolve(pluginsPath, pluginName);

    if (fs.existsSync(tempPath)) {
      fs.rmdirSync(tempPath, { recursive: true });
    }
    fs.mkdirSync(tempPath);

    await download(pluginName, tempPath);

    log.success(`[${pluginName}] has been downloaded`);

    // 尝试检查配置规范
    const zoroPluginJSONPath = path.resolve(
      tempPath,
      ZORO_PLUGIN_JSON_FILENAME
    );
    if (!fs.existsSync(zoroPluginJSONPath)) {
      throw new Error(
        `the ${ZORO_PLUGIN_JSON_FILENAME} not exist in [${pluginName}]`
      );
    }

    const resolvedZoroPluginJSON = checkAndResolveZoroPluginJSON(pluginName);

    fs.rmdirSync(finalPath, { recursive: true });
    fs.renameSync(tempPath, finalPath);

    log.info(`[${pluginName}] installing dependencies ...`);
    installPackageSync(resolvedZoroPluginJSON.package, {
      cwd: finalPath,
      stdio: 'inherit',
    });
    log.success(`[${pluginName}] dependencies installation completed`);
  } catch (e) {
    fs.rmdirSync(tempPath, { recursive: true });
    log.error(e.message);
  }
};

module.exports = install;

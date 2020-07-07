import path from 'path';
import fs from 'fs';
import { fork } from 'child_process';

import { ZORO_JSON_FILENAME } from '@constants';
import { currentPath } from '@paths';
import utils from '@utils';
import configs from '@configs';
import getPluginPath from '@tools/getPluginPath';
import checkZoroJSONFormat from '@tools/checkZoroJSONFormat';
import { installPackageSync } from '@tools/installPackage';

const dev = async () => {
  const log = utils.log;
  const { isPlainObject } = utils.types;
  const {
    project: { zoroJSON },
  } = configs;

  try {
    checkZoroJSONFormat(zoroJSON);

    const pluginName =
      isPlainObject(zoroJSON) && zoroJSON.plugin ? zoroJSON.plugin : '';
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

    const childDevServerPath = path.resolve(__dirname, 'childDevServer');

    // fork 子进程
    let childDevProcess = fork(childDevServerPath);

    fs.watchFile(path.resolve(currentPath, ZORO_JSON_FILENAME), () => {
      log.info(
        `${ZORO_JSON_FILENAME} has been changed, reexecute dev command ...`
      );
      childDevProcess.kill('SIGINT');
      childDevProcess = fork(childDevServerPath);
    });
  } catch (e) {
    log.error(e.message);
  }
};

export default dev;

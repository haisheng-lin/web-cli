import path from 'path';
import fs from 'fs';

import getPluginPath from './getPluginPath';

const resolveEntryFromPlugin = (
  pluginPath: string,
  pluginName: string,
  entryFileName: string
) => {
  const entryFilePath = path.resolve(pluginPath, entryFileName);

  if (!fs.existsSync(entryFilePath)) {
    throw new Error(
      `${pluginName} not exist ${entryFileName} for aop invoking`
    );
  }

  return entryFilePath;
};

const getTargetEntry = <T = any>(pluginName: string, entryFileName: string) => {
  const pluginPath = getPluginPath(pluginName);
  const isPluginExist = fs.existsSync(pluginPath);

  if (isPluginExist) {
    const entryFilePath = resolveEntryFromPlugin(
      pluginPath,
      pluginName,
      entryFileName
    );

    return require(entryFilePath) as T;
  } else {
    throw new Error(`cannot find ${pluginName}. Try to install ${pluginName}.`);
  }
};

export default getTargetEntry;

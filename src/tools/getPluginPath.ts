import path from 'path';

import { pluginsPath } from '@paths';

const getPluginPath = (pluginName: string) => {
  return path.resolve(pluginsPath, pluginName);
};

export default getPluginPath;

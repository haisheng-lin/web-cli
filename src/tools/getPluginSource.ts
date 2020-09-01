import path from 'path';
import fs from 'fs';

import { zoroRootPath } from '@paths';
import { PLUGIN_SOURCE_FILENAME } from '@constants';
import defaultPluginSourceRepository from '@defaults/pluginSourceRepository';
import { PluginSourceRepository } from '@definitions';

const getPluginSource = (): PluginSourceRepository => {
  const customSourceConfigPath = path.resolve(
    zoroRootPath,
    PLUGIN_SOURCE_FILENAME
  );

  return fs.existsSync(customSourceConfigPath)
    ? require(customSourceConfigPath)
    : defaultPluginSourceRepository;
};

export default getPluginSource;

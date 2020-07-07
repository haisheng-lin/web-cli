// 这个文件是 fork 进程执行的，要另外引入一次 module alias
import 'module-alias/register';

import getTargetEntry from '@tools/getTargetEntry';
import context from '@context';
import { PLUGIN_DEV_FILENAME } from '@constants';

const log = context.utils.log;
const { isFunction } = context.utils.types;

try {
  const pluginName = context.configs.project.zoroJSON?.plugin as string;
  const devServer = getTargetEntry(pluginName, PLUGIN_DEV_FILENAME);

  if (isFunction(devServer)) {
    devServer(context);
  } else {
    throw new Error(
      `${pluginName} not implement '${PLUGIN_DEV_FILENAME}' for dev command`
    );
  }
} catch (e) {
  log.error(e.message);
}

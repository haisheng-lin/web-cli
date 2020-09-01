import path from 'path';
import { PLUGINS_FOLDER_NAME } from '@constants';

// zoro 项目根路径，由于编译后存放到 /dist 下，所以路径需再往上一层
export const zoroRootPath = path.resolve(__dirname, '../../../');

// 当前执行命令的 cwd 路径
export const currentPath = process.cwd();

// plugins 目录路径
export const pluginsPath = path.resolve(zoroRootPath, PLUGINS_FOLDER_NAME);

import path from 'path';

import zoroPackageJSON from '../../package.json';
import { ZORO_JSON_FILENAME } from '@constants';
import { currentPath } from '@paths';
import resolveZoroJSON from '@tools/resolveZoroJSON';
import { ZoroJSONConfig } from '@definitions';

// 业务项目的 zoro.json 配置路径
const zoroJSONPath = path.resolve(currentPath, ZORO_JSON_FILENAME);
// 业务项目的 package.json 路径
const packageJSONPath = path.resolve(currentPath, 'package.json');

const zoroJSON: ZoroJSONConfig = require(zoroJSONPath) || {};
const packageJSON: object = require(packageJSONPath) || {};

export default {
  project: {
    zoroJSON,
    resolvedZoroJSON: resolveZoroJSON(zoroJSON),
    packageJSON,
  },
  zoro: {
    packageJSON: zoroPackageJSON,
  },
};

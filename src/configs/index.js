const path = require('path');
const fs = require('fs');

const { currentPath } = require('../paths');
const { ZORO_JSON_FILENAME } = require('../constants');
const resolveZoroJSON = require('../tools/resolveZoroJSON');

// 业务项目的 zoro.json 配置路径
const zoroJSONPath = path.resolve(currentPath, ZORO_JSON_FILENAME);

// 业务项目的 package.json 路径
const packageJSONPath = path.resolve(currentPath, 'package.json');

const zoroJSON = fs.existsSync(zoroJSONPath) ? require(zoroJSONPath) : {};

module.exports = {
  project: {
    zoroJSON,
    resolvedZoroJSON: resolveZoroJSON(zoroJSON),
    packageJSON: fs.existsSync(packageJSONPath) ? require(packageJSONPath) : {},
  },
  zoro: {
    packageJSON: require('../../package.json'),
  },
};

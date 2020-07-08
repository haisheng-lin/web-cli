const path = require('path');
const fs = require('fs');

const { isPlainObject } = require('../utils/types');
const { ZORO_JSON_FILENAME } = require('../constants');
const { currentPath } = require('../paths');
const resolveZoroJSON = require('./resolveZoroJSON');

/**
 * @returns {object}
 */
const checkAndResolveZoroJSON = () => {
  const zoroJSONPath = path.resolve(currentPath, ZORO_JSON_FILENAME);

  if (!fs.existsSync(zoroJSONPath)) {
    throw new Error(`cannot find ${ZORO_JSON_FILENAME} in your project`);
  }

  const zoroJSON = require(zoroJSONPath);

  if (!isPlainObject(zoroJSON)) {
    throw new Error(`cannot convert ${ZORO_JSON_FILENAME} to JSON format`);
  }

  if (!zoroJSON.plugin) {
    throw new Error(`the ${'plugin'.bold} field is necessary`);
  }

  return resolveZoroJSON(zoroJSON);
};

module.exports = checkAndResolveZoroJSON;

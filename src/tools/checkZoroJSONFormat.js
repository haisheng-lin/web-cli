const { isPlainObject } = require('../utils/types');
const { ZORO_JSON_FILENAME } = require('../constants');

/**
 * @param {any} zoroJSON
 * @returns {void}
 */
const checkZoroJSONFormat = zoroJSON => {
  if (!isPlainObject(zoroJSON)) {
    throw new Error(
      `cannt find ${ZORO_JSON_FILENAME}, or its format isn't JSON format`
    );
  }

  if (!zoroJSON.plugin) {
    throw new Error(`the ${'plugin'.bold} field is necessary`);
  }
};

module.exports = checkZoroJSONFormat;

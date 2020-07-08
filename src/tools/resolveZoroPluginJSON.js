const defaultZoroPluginJSON = require('../defaults/zoroPlugin.json');
const merge = require('./merge');

const resolveZoroPluginJSON = zoroJSON => {
  return merge(defaultZoroPluginJSON, zoroJSON);
};

module.exports = resolveZoroPluginJSON;

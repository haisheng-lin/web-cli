const downloadRepo = require('download-git-repo');

const getPluginSource = require('../../../tools/getPluginSource');

const {
  pluginSource,
  pluginSourceDomain,
  pluginSourceGroup,
} = getPluginSource();

/**
 * @param {string} pluginName
 * @returns {string | null}
 */
const getDownloadUrl = pluginName => {
  switch (pluginSource) {
    case 'github': {
      return `${pluginSourceGroup}/${pluginName}`;
    }
    case 'gitlab': {
      return `${pluginSource}:${pluginSourceDomain}:${pluginSourceGroup}/${pluginName}#master`;
    }
    default: {
      return null;
    }
  }
};

/**
 * @param {string} pluginName
 * @param {string} destPath
 * @returns {Promise<void>}
 */
const download = (pluginName, destPath) => {
  return new Promise((resolve, reject) => {
    const url = getDownloadUrl(pluginName);

    if (!url || !destPath) {
      reject(new Error('url or dest path cannot be empty'));
    }

    if (pluginSource === 'github') {
      downloadRepo(url, destPath, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    } else if (pluginSource === 'gitlab') {
      downloadRepo(url, destPath, { clone: true }, err => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    } else {
      reject(new Error('unknown git source type'));
    }
  });
};

module.exports = download;

const { execSync } = require('child_process');

/**
 * @param {string} packageType
 * @param {object} options
 * @returns {void}
 */
const installPackageSync = (packageType = 'npm', options) => {
  const extra = packageType === 'yarn' ? ' --production=false' : '';
  execSync(packageType + ' install' + extra, options);
};

module.exports = {
  installPackageSync,
};

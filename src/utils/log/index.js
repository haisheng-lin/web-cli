const c = require('./color');

/**
 * @param {string} bg
 * @param {string} fg
 * @param {string} msg
 * @returns {string}
 */
const styleLabel = (bg, fg, msg) => bg + fg + ` ${msg} ` + c.Reset;

/**
 * @param {string} fg
 * @param {string} msg
 * @returns {string}
 */
const styleMessage = (fg, msg) => fg + msg + c.Reset;

/**
 * @param {string} msg
 * @returns {void}
 */
const warn = msg => {
  return console.log(
    styleLabel(c.bg.Yellow, c.fg.White, 'WARNING'),
    styleMessage(c.fg.Yellow, msg)
  );
};

/**
 * @param {string} msg
 * @returns {void}
 */
const info = msg => {
  const label = styleLabel(c.bg.Blue, c.fg.White, 'INFO');
  return console.log(label, msg);
};

/**
 * @param {string} msg
 * @returns {void}
 */
const error = msg => {
  return console.log(
    styleLabel(c.bg.Red, c.fg.White, 'ERROR'),
    styleMessage(c.fg.Red, msg)
  );
};

/**
 * @param {string} msg
 * @returns {void}
 */
const success = msg => {
  return console.log(
    styleLabel(c.bg.Green, c.fg.White, 'SUCCESS'),
    styleMessage(c.fg.Green, msg)
  );
};

module.exports = {
  info,
  success,
  warn,
  error,
};

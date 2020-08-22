/**
 * Removes extra spaces from the end and between words
 * @param {string} str
 */
const clean = (str) => {
  const trimmedStr = str.trim().replace(/\s+/g, ' ');
  return trimmedStr;
};

/**
 * @param {string} str
 * @param {string} pattern
 */
const matchPattern = (str, pattern) => new RegExp(pattern).test(str);

module.exports = {
  clean,
  matchPattern,
};

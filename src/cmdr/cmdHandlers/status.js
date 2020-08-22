const { STATUS } = require('../constants');
const parking = require('../../parking');
const { invalidInstruction } = require('../../errors');
const { matchPattern } = require('../cmdUtils');

/**
 * @param {string} instruction
 */
const status = (instruction) => {
  const pattern = `^${STATUS}$`;

  if (matchPattern(instruction, pattern)) {
    parking.status();
    return;
  }
  invalidInstruction();
};

module.exports = status;

const { PARK } = require('../constants');
const parking = require('../../parking');
const { invalidInstruction } = require('../../errors');
const { matchPattern } = require('../cmdUtils');

/**
 * @param {string} instruction
 */
const park = (instruction) => {
  const pattern = `^${PARK} [A-Z0-9-]{1,}$`;

  if (matchPattern(instruction, pattern)) {
    const [_, regn] = instruction.split(' ');
    parking.park(regn);
    return;
  }
  invalidInstruction();
};

module.exports = park;

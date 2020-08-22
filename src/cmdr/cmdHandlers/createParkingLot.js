const { CREATE_PARKING_LOT } = require('../constants');
const parking = require('../../parking');
const { invalidInstruction } = require('../../errors');
const { matchPattern } = require('../cmdUtils');

/**
 * @param {*} instruction
 */
const createParkingLot = (instruction) => {
  const pattern = `^${CREATE_PARKING_LOT} [0-9]{1,3}$`;

  if (matchPattern(instruction, pattern)) {
    const [_, spotsPerLevel] = instruction.split(' ');
    parking.createParkingLot(parseInt(spotsPerLevel, 10), 1);
    return;
  }
  invalidInstruction();
};

module.exports = createParkingLot;

const { clean } = require('./cmdUtils');
const { unknownOperation } = require('../errors');
const {
  CREATE_PARKING_LOT, PARK, LEAVE, STATUS,
} = require('./constants');

const cpl = require('./cmdHandlers/createParkingLot');
const leave = require('./cmdHandlers/leave');
const park = require('./cmdHandlers/park');
const status = require('./cmdHandlers/status');

/**
 * map cmd to a handler
 */
const handlerLookup = {};
handlerLookup[CREATE_PARKING_LOT] = cpl;
handlerLookup[LEAVE] = leave;
handlerLookup[PARK] = park;
handlerLookup[STATUS] = status;

/**
 * hands over the instruction to the appropriate handler
 * if the lookup contains a handler for the instruction
 */
const exec = (instruction, lookup = handlerLookup) => {
  const [cmd] = clean(instruction).split(' ');

  if (cmd && lookup[cmd]) {
    const handle = lookup[cmd];
    handle(instruction);
    return;
  }
  unknownOperation();
};

module.exports = { exec };

module.exports = {
  invalidInstruction: () => {
    throw new Error('invalid instruction format');
  },
  unknownOperation: () => {
    throw new Error('cannot handle unknown operation');
  },
  abstractClassError: () => {
    throw new Error('abstract class');
  },
  parkingLotInitError: () => {
    throw new Error('cannot re-instantiate parking lot');
  },
  parkingLotNotInited: () => {
    throw new Error('parking lot does not exist');
  },
};

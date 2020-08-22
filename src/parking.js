const Lot = require('./classes/lot');
const Car = require('./classes/vehicles/car');
const Ticket = require('./classes/tickets/ticket');

const {
  parkingLotInitError,
  parkingLotNotInited,
} = require('./errors');

const {
  PARKING_LOT_FULL,
  VEHICLE_ALREADY_PARKED,
  VEHICLE_NOT_FOUND,
} = require('./classes/constants');

/**
 * this is the parkingLot instance
 * can be instantiated only once
 */
let parkingLot;

const isParkingLotPresent = () => !!parkingLot;

const createParkingLot = (spotsPerLevel, numberOfLevels) => {
  if (isParkingLotPresent()) parkingLotInitError();

  parkingLot = new Lot(numberOfLevels);
  parkingLot.addLevel(spotsPerLevel);
  console.log(`Created parking lot with ${spotsPerLevel} slots`);
};

const park = (regn) => {
  if (!isParkingLotPresent()) parkingLotNotInited();

  const spotId = parkingLot.findSpotAndPark(new Car(regn, 'black', new Ticket()));
  if (spotId === PARKING_LOT_FULL) {
    console.log(PARKING_LOT_FULL);
    return;
  }
  if (spotId === VEHICLE_ALREADY_PARKED) {
    console.log(VEHICLE_ALREADY_PARKED);
    return;
  }
  console.log(`Allocated slot number: ${spotId}`);
};

const status = () => {
  if (!isParkingLotPresent()) parkingLotNotInited();

  const bookedSpots = parkingLot.getBookedSpotsOfLevel();
  if (bookedSpots && bookedSpots.length > 0) {
    const header = 'Slot No.    Registration No.';
    const spacer = '           ';
    const tmpArr = bookedSpots
      .map((spot) => [spot.getId(), spot.getVehicle().getRegn()].join(spacer));
    console.log([header, ...tmpArr].join('\n'));
  }
};

const unpark = (regn, after) => {
  if (!isParkingLotPresent()) parkingLotNotInited();

  const result = parkingLot.findSpotAndVacate(regn);
  if (result === VEHICLE_NOT_FOUND) {
    console.log(`Registration number ${regn} not found`);
    return;
  }
  const fee = result.getVehicle().getTicket().setDuration(after).calcFee();
  console.log(`Registration number ${result.getVehicle().getRegn()} with Slot Number ${result.getId()} is free with Charge ${fee}`);
};

module.exports = {
  createParkingLot,
  park,
  status,
  unpark,
};

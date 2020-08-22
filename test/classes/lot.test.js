const test = require('ava');
const Level = require('../../src/classes/levels/level');
const Spot = require('../../src/classes/spots/spot');
const Car = require('../../src/classes/vehicles/car');
const Lot = require('../../src/classes/lot');

const {
  VEHICLE_NOT_FOUND,
  VEHICLE_ALREADY_PARKED,
  PARKING_LOT_FULL,
} = require('../../src/classes/constants');

test('parking lot with multi level capbility', (t) => {
  /**
   * create lot with 2 levels
   */
  const lot = new Lot(2);
  t.is(lot.getMaxSize(), 2);
  t.is(lot.getCurrentSize(), 0);
  t.deepEqual(lot.getLevels(), []);

  /**
   * try to add 3 level with 2 spots
   */
  lot.addLevel(2);
  lot.addLevel(2);
  lot.addLevel(2);

  t.is(lot.getMaxSize(), 2);
  t.is(lot.getCurrentSize(), 2);
  t.is(lot.getLevels().length, 2);
  t.is(lot.getLevels()[0] instanceof Level, true);

  t.is(lot.isFull(), false);

  /**
   * this will add vehicles to level 1
   * returns spot id of that level 1 only
   * level id is suppressed for now
   */
  t.is(lot.findSpotAndPark(new Car('A-1')), 1);
  t.is(lot.findSpotAndPark(new Car('A-2')), 2);
  t.is(lot.findSpotAndPark(new Car('A-2')), VEHICLE_ALREADY_PARKED);

  /**
   * lot is still empty since level 2 is empty
   */
  t.is(lot.isFull(), false);

  /**
   * this will add to level 2 since level 1 is full
   * returns spot id of that level 2 only
   * level id is suppressed for now
   */
  t.is(lot.findSpotAndPark(new Car('A-3')), 1);
  t.is(lot.findSpotAndPark(new Car('A-4')), 2);

  /**
   * lot is full since both levels are full
   */
  t.is(lot.isFull(), true);

  t.is(lot.findSpotAndPark(new Car('A-4')), VEHICLE_ALREADY_PARKED);
  t.is(lot.findSpotAndPark(new Car('A-5')), PARKING_LOT_FULL);

  /**
   * get the booked spots of level 1
   */
  t.is(lot.getBookedSpotsOfLevel(0).length, 2);

  /**
   * get the booked spots of level 2
   */
  t.is(lot.getBookedSpotsOfLevel(1).length, 2);

  /**
   * A-1 is at Level1-Spot1, unpark A-1
   */
  const spotA1 = lot.findSpotAndVacate('A-1');
  t.true(spotA1 instanceof Spot);
  t.is(spotA1.getId(), 1);

  /**
   * Lot has space again
   */
  t.is(lot.isFull(), false);
  t.is(lot.getBookedSpotsOfLevel(0).length, 1);
  t.is(lot.getBookedSpotsOfLevel(1).length, 2);

  /**
   * remove A-1, A-1 is not in lot
   */
  t.is(lot.findSpotAndVacate('A-1'), VEHICLE_NOT_FOUND);

  /**
   * A-3 is at Level2-Spot1, unpark A-3
   */
  const spotA2 = lot.findSpotAndVacate('A-3');
  t.true(spotA2 instanceof Spot);
  t.is(spotA2.getId(), 1);

  /**
   * Lot has even more space
   * both levels have space
   */
  t.is(lot.isFull(), false);
  t.is(lot.getBookedSpotsOfLevel(0).length, 1);
  t.is(lot.getBookedSpotsOfLevel(1).length, 1);

  /**
   * try parking a new car A-37
   * should go to Level1-Spot1 since
   * it is closer than Level2-Spot1
   */
  t.is(lot.findSpotAndPark(new Car('A-37')), 1);
  t.is(lot.getBookedSpotsOfLevel(0).length, 2);
  t.is(lot.getBookedSpotsOfLevel(1).length, 1);
});

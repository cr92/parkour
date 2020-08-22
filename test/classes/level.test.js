const test = require('ava');
const Level = require('../../src/classes/levels/level');
const Spot = require('../../src/classes/spots/spot');
const Car = require('../../src/classes/vehicles/car');
const Ticket = require('../../src/classes/vehicles/car');
const {
  NO_EMPTY_SPOTS,
  VEHICLE_NOT_FOUND,
  VEHICLE_ALREADY_PARKED,
} = require('../../src/classes/constants');

test('level methods 1', (t) => {
  const spots = (Array(3).fill(1)).map((_, index) => new Spot(index + 1, index + 1));
  const level = new Level(spots, 1);

  t.is(level.getId(), 1);
  t.is(level.isVehicleInLevel('KA-43'), false);
  t.is(level.isFull(), false);
  t.is(level.findEmptySpot(), 0);
  t.deepEqual(level.getBookedSpots(), []);

  t.is(level.findSpotAndPark(new Car('KA-45', 'black', new Ticket())), 1);
  t.is(level.findEmptySpot(), 1);
  t.is(level.getBookedSpots().length, 1);

  /**
   * level diagram
   * ['KA-45','KA-46','KA-47']
   */
  t.is(level.findSpotAndPark(new Car('KA-45', 'black', new Ticket())), VEHICLE_ALREADY_PARKED);
  t.is(level.findSpotAndPark(new Car('KA-46', 'black', new Ticket())), 2);
  t.is(level.findSpotAndPark(new Car('KA-47', 'black', new Ticket())), 3);
  t.is(level.findSpotAndPark(new Car('KA-48', 'black', new Ticket())), NO_EMPTY_SPOTS);
  t.is(level.isVehicleInLevel('KA-46'), true);
  t.is(level.isFull(), true);
  t.is(level.findEmptySpot(), -1);

  t.is(level.findSpotAndVacate('KA-89'), VEHICLE_NOT_FOUND);
  t.is(level.isFull(), true);
  t.is(level.findEmptySpot(), -1);

  t.is(level.findSpotAndVacate('KA-46') instanceof Spot, true);
  t.is(level.isFull(), false);
  t.is(level.findEmptySpot(), 1);

  t.is(level.findSpotAndVacate('KA-45') instanceof Spot, true);
  t.is(level.isFull(), false);
  t.is(level.findEmptySpot(), 0);
});

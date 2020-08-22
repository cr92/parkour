const test = require('ava');
const Spot = require('../../src/classes/spots/spot');

test('spot methods 1', (t) => {
  const spot = new Spot(1, 1);
  t.is(spot.isBooked(), false);
  t.is(spot.getId(), 1);
});

test('spot methods 2', (t) => {
  const spot = new Spot(2, 2);
  t.is(spot.isBooked(), false);
  t.falsy(spot.getVehicle());

  spot.setVehicle('XT');

  t.is(spot.isBooked(), true);
  t.is(spot.getVehicle(), 'XT');

  spot.unsetVehicle();

  t.is(spot.isBooked(), false);
  t.is(spot.getVehicle(), null);

  t.is(spot.getDistance(), 2);
});

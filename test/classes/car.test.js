const test = require('ava');
const Car = require('../../src/classes/vehicles/car');
const Vehicle = require('../../src/classes/vehicles/vehicle');

test('car methods', (t) => {
  const car = new Car('AB-56');
  t.is(car.getRegn(), 'AB-56');
  t.is(car.getTicket(), null);

  car.setTicket('Ticket');
  t.is(car.getTicket(), 'Ticket');
});

test('car inheritance', (t) => {
  const car = new Car('XB-89');
  t.truthy(car instanceof Car);
  t.truthy(car instanceof Vehicle);
});

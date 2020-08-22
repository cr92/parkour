const test = require('ava');
const Vehicle = require('../../src/classes/vehicles/vehicle');

test('Is Abstract', (t) => {
  t.throws(() => {
    const v = new Vehicle('regn', 'pink', 'train');
  });
});

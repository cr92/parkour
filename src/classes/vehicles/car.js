const Vehicle = require('./vehicle');
const { vehicleType } = require('../constants');

class Car extends Vehicle {
  /**
     * Represents a car.
     * @constructor
     * @param {string} regn - registration
     * @param {string} color - default is black
     */
  constructor(regn, color = 'black', ticket = null) {
    super(regn, color, vehicleType.CAR, ticket);
  }
}

module.exports = Car;

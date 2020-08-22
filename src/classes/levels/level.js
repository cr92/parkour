const Spot = require('../spots/spot');
const { NO_EMPTY_SPOTS, VEHICLE_NOT_FOUND, VEHICLE_ALREADY_PARKED } = require('../constants');

class Level {
  /**
     * Represents a parking level
     * @constructor
     * @param {number} size - size of level
     */
  constructor(spots, id = 0) {
    this._id = id;
    this._size = spots.length;
    this._spots = spots;
    this._regnSpotMap = {};
  }

  /**
     * get Id of level
     * @method
     * @returns {number}
   */
  getId() {
    return this._id;
  }

  /**
   * @param {string} regn
   */
  isVehicleInLevel(regn) {
    return this._regnSpotMap[regn] !== undefined;
  }

  /**
     * Is parking level full
     * @method
     * @returns {boolean}
   */
  isFull() {
    return this._spots.filter((spot) => spot.isBooked()).length === this._size;
  }

  /**
     * find index of an empty spot closest to level entrance
     * return -1 if no empty spot is found
     * @method
     * @param {string} searchStrategy
     * @returns {number}
   */
  findEmptySpot(searchStrategy = 'nearest') {
    switch (searchStrategy) {
      case 'nearest': {
        let index = -1;
        let distance = Infinity;

        for (let i = 0; i < this._size; i += 1) {
          const spot = this._spots[i];
          if (spot.isBooked() === false && spot.getDistance() < distance) {
            index = i;
            distance = spot.getDistance();
          }
        }
        return index;
      }
      default:
        return -1;
    }
  }

  /**
     * return list of booked spots
     * @method
     * @returns {Spot[]}
   */
  getBookedSpots() {
    return this._spots.filter((spot) => spot.isBooked());
  }

  /**
     * find a spot to park vehicle
     * @method
     * @returns {number}
   */
  findSpotAndPark(vehicle) {
    const spotIndex = this.findEmptySpot();
    if (spotIndex === -1) {
      return NO_EMPTY_SPOTS;
    }
    if (this.isVehicleInLevel(vehicle.getRegn())) {
      return VEHICLE_ALREADY_PARKED;
    }
    const spotId = this._spots[spotIndex].getId();
    this._spots[spotIndex].setVehicle(vehicle);
    this._regnSpotMap[vehicle.getRegn()] = spotIndex;
    return spotId;
  }

  /**
     * find a spot by regn and vacate
     * @method
     * @returns {Spot}
   */
  findSpotAndVacate(regn) {
    const spotIndex = this._regnSpotMap[regn];
    if (spotIndex === undefined) {
      return VEHICLE_NOT_FOUND;
    }
    const spot = this._spots[spotIndex];

    this._spots[spotIndex] = new Spot(spotIndex + 1, spotIndex + 1);
    delete this._regnSpotMap[regn];

    return spot;
  }
}

module.exports = Level;

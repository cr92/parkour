/**
 * Spot is already quite generic
 * More specific spot types can extend it
 */
class Spot {
  /**
     * Represents a parking spot.
     * @constructor
     * @param {string} id - ID of parking spot
     * @param {number} distance - distance from entrance
     * @param {boolean} booked - default is false/empty
     */
  constructor(id, distance, booked = false) {
    this._id = id;
    this._distance = distance;
    this._booked = booked;
    this._vehicle = null;
  }

  /**
     * Assign a vehicle to a parking spot
     * @method
     * @param {Vehicle} vehicle - vehicle object
     */
  setVehicle(vehicle) {
    this._vehicle = vehicle;
    this._booked = true;
  }

  /**
     * Remove vehicle from a parking spot
     * @method
     */
  unsetVehicle() {
    this._vehicle = null;
    this._booked = false;
  }

  /**
     * Get vehicle at a parking spot
     * @method
     * @returns {Vehicle} vehicle object
     */
  getVehicle() {
    return this._vehicle;
  }

  /**
     * Get status of a parking spot
     * @method
     * @returns {boolean}
     */
  isBooked() {
    return this._booked;
  }

  /**
     * Get ID of a parking spot
     * @method
     * @returns {number}
     */
  getId() {
    return this._id;
  }

  /**
     * Get distance of a parking spot
     * @method
     * @returns {number}
   */
  getDistance() {
    return this._distance;
  }
}

module.exports = Spot;

const { abstractClassError } = '../../errors';
/**
 * Vehicle is a less specific class of car
 * Can put common behaviours in it
 */
class Vehicle {
  /**
     * Represents a vehicle.
     * @constructor
     * @param {string} regn
     * @param {string} color
     * @param {string} type
     * @param {object} ticket
     */
  constructor(regn, color, type, ticket = null) {
    if (new.target === Vehicle) {
      abstractClassError();
    }
    this._regn = regn;
    this._color = color;
    this._type = type;
    this._ticket = ticket;
  }

  /**
     * Attach ticket to a vehicle
     * @method
     * @param {Ticket} ticket
     * @returns {Vehicle}
     */
  setTicket(ticket) {
    this._ticket = ticket;
    return this;
  }

  /**
     * Get ticket attached to a vehicle
     * @method
     * @returns {Ticket}
     */
  getTicket() {
    return this._ticket;
  }

  /**
     * Get registration number of a vehicle
     * @method
     * @returns {string}
     */
  getRegn() {
    return this._regn;
  }
}

module.exports = Vehicle;

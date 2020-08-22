class Ticket {
  /**
     * Represents a ticket
     * @constructor
     */
  constructor(duration = 0, billing = 'simple') {
    this._duration = duration;
    this._billing = billing;
  }

  /**
     * Upadte duration on a ticket
     * @method
     * @param {number} hours - hours parked
     */
  setDuration(after) {
    this._duration = after;
    return this;
  }

  /**
     * Get duration from ticket
     * @method
     * @returns {number} - hours parked
     */
  getDuration() {
    return this._duration;
  }

  /**
     * Calculate cost on checkout
     * @method
     * @returns {number} - money
     */
  calcFee() {
    if (this._billing === 'simple') {
      return this.simple();
    }
    return 0;
  }

  /**
     * Simple algo to calculate cost
     * @method
     * @returns {number} - money
     */
  simple() {
    const baseFee = 10;
    const recurFee = 10;
    const extraHours = this.getDuration() - 2;
    return extraHours <= 0 ? baseFee : baseFee + extraHours * recurFee;
  }
}

module.exports = Ticket;

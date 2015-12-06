(function () {
  'use strict'

  module.exports = SlotsInventory

  /**
   * Represents the goods inventory of a beverage dispenser.
   * @constructor
   */
  function SlotsInventory () {
    var inventory = {}
    var self = this

    /**
     * @see {@link addSlot}
     */
    this.addSlot = addSlot
    /**
     * @see {@link collectBeverages}
     */
    this.collectBeverages = collectBeverages
    /**
     * @see {@link getSlot}
     */
    this.getSlot = getSlot

    /**
     * Stores the given slot and makes it available via the given code
     *
     * @param {Slot} slot - Slot object
     * @param {int} code - numeric access code
     *
     * @returns {SlotsInventory} - self
     */
    function addSlot (slot, code) {
      inventory[code] = slot

      return self
    }

    /**
     * Returns the slot for the given code
     *
     * @param {int} code - numeric access code
     *
     * @returns {Slot}
     */
    function getSlot (code) {
      return inventory[code]
    }

    /**
     * Collects and returns all beverages from all stored slots in a flat array
     *
     * @returns {Beverage[]}
     */
    function collectBeverages () {
      var beverages = []

      Object.keys(inventory).forEach(function (code) {
        beverages.push.apply(beverages, inventory[code].collectBeverages())
      })

      return beverages
    }
  }
})()

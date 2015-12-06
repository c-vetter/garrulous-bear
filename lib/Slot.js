(function () {
  'use strict'

  var Beverage = require('./Beverage')

  module.exports = Slot

  /**
   * Represents a single slot for items in a beverage dispenser.
   *
   * @param {int} price - what each item costs, in Cents
   *
   * @constructor
   */
  function Slot (price) {
    var inventory = []
    var self = this

    /**
     * @type {int}
     */
    this.price = price

    /**
     * @see {@link addBeverage}
     */
    this.addBeverage = addBeverage
    /**
     * @see {@link collectBeverages}
     */
    this.collectBeverages = collectBeverages
    /**
     * @see {@link getBeverage}
     */
    this.getBeverage = getBeverage

    /**
     * Adds a beverage to inventory for later retrieval
     *
     * @param {Beverage} beverage
     *
     * @returns {Slot} - self
     */
    function addBeverage (beverage) {
      inventory.push(beverage)

      return self
    }

    /**
     * Removes and returns all beverages from inventory
     *
     * @returns {Beverage[]}
     */
    function collectBeverages() {
      var beverages = []

      while (inventory.length) {
        beverages.push(inventory.pop())
      }

      return beverages
    }

    /**
     * Removes and returns one beverage from inventory
     *
     * @throws {Error} if inventory is empty
     *
     * @returns {Beverage}
     */
    function getBeverage () {
      if (!inventory.length) {
        throw Error('Slot is empty')
      }

      return inventory.pop()
    }
  }
})()

(function () {
  'use strict'

  var CoinsInventory = require('./CoinsInventory')
  var SlotsInventory = require('./SlotsInventory')

  module.exports = BeverageDispenser

  /**
   * Represents a beverage dispenser.
   * @constructor
   */
  function BeverageDispenser () {
    var coins
    var self = this
    var slots

    coins = new CoinsInventory()
    slots = new SlotsInventory()

    /**
     * @see {@link CoinsInventory#addCoins}
     */
    this.addCoins = delegateTo(coins.addCoins)
    /**
     * @see {@link SlotsInventory#collectBeverages}
     */
    this.collectBeverages = slots.collectBeverages
    /**
     * @see {@link CoinsInventory#collectCoins}
     */
    this.collectCoins = coins.collectCoins
    /**
     * @see {@link SlotsInventory#addSlot}
     */
    this.addSlot = delegateTo(slots.addSlot)
    /**
     * @see {@link SlotsInventory#getSlot}
     */
    this.getSlot = slots.getSlot
    /**
     * @see {@link buy}
     */
    this.buy = buy

    /**
     * Returns a beverage and change for a given slot and payment.
     *
     * @param {int} slotCode - the code of the slot from which a beverage should be drawn
     * @param {int} coins.. - any number of coins to pay for the desired beverage
     *
     * @throws {Error} if payment is insufficient for desired slot
     * @throws {Error} if funds are insufficient to give exact change
     *
     * @returns {Array} output - array of these items:
     *            {Beverage} output[0] - a beverage
     *            {Coin} output[1..] - change for excess payment
     */
    function buy (slotCode) {
      var coin
      var i
      var output
      var paymentValue = 0
      var slot = slots.getSlot(slotCode)

      for (i = 1; i < arguments.length; i++) {
        coin = arguments[i]
        coins.addCoin(coin)
        paymentValue += coin.value
      }

      if (paymentValue === slot.price) {
        output = [slot.getBeverage()]
      } else if (paymentValue > slot.price) {
        output = coins.retrieve(paymentValue - slot.price)
        if (output) {
          output.unshift(slot.getBeverage())
        } else {
          throw new Error('Cannot give exact change')
        }
      } else {
        throw new Error('Insufficient payment given')
      }

      return output
    }

    /**
     * Delegates to the given method and returns self instead of the methods return value.
     *
     * @param {Function} method
     *
     * @returns {BeverageDispenser} - self
     */
    function delegateTo (method) {
      return function () {
        method.apply(null, arguments)

        return self
      }
    }
  }

})()

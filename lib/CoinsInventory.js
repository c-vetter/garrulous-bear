(function () {
  'use strict'

  var Coin = require('./Coin')

  module.exports = CoinsInventory

  /**
   * Represents the monetary inventory of a beverage dispenser.
   * @constructor
   */
  function CoinsInventory() {
    var inventory
    var self = this
    var values

    /**
     * @see {@link addCoin}
     */
    this.addCoin = addCoin
    /**
     * @see {@link addCoins}
     */
    this.addCoins = addCoins
    /**
     * @see {@link collectCoins}
     */
    this.collectCoins = collectCoins
    /**
     * @see {@link retrieve}
     */
    this.retrieve = retrieve

    inventory = {
      10: [],
      20: [],
      50: [],
      100: [],
      200: []
    }

    values = Object.keys(inventory).sort().reverse()

    /**
     * Adds a coin to inventory
     *
     * @param {Coin} coin
     *
     * @returns {CoinsInventory} - self
     */
    function addCoin(coin) {
      if (coin.constructor !== Coin) {
        throw new Error('Given item was not a coin')
      }

      if (!inventory[coin.value]) {
        throw new Error('Coins of value ' + coin.value + 'are not accepted')
      }

      inventory[coin.value].push(coin)

      return self
    }

    /**
     * Adds several coins to inventory
     *
     * @param {Coin[]} coins
     *
     * @returns {CoinsInventory} - self
     */
    function addCoins(coins) {
      coins.forEach(function (coin) {
        self.addCoin(coin)
      })

      return self
    }

    /**
     * Removes and returns all coins from inventory
     *
     * @returns {Coin[]}
     */
    function collectCoins() {
      var coins = []

      values.forEach(function (value) {
        while (inventory[value].length) {
          coins.push(inventory[value].pop())
        }
      })

      return coins
    }

    /**
     * Removes and returns coins with a combined value equal to the given amount.
     * If the coins in inventory cannot serve the desired amount exactly,
     * this returns false and removes no coins from inventory.
     *
     * @param {int} target
     *
     * @returns {Coin[]|false}
     */
    function retrieve(target) {
      var coins = []

      values.forEach(function (value) {
        while (target >= value && inventory[value].length > 0) {
          coins.push(inventory[value].pop())
          target -= value
        }
      })

      if (target > 0) {
        self.addCoins(coins)
        return false
      }

      return coins
    }
  }

})()

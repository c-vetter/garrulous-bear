describe('BeverageDispenser', function () {
  'use strict'

  var BeverageDispenser = require('../lib/BeverageDispenser')
  var Beverage = require('../lib/Beverage')
  var Slot = require('../lib/Slot')

  var dispenser

  beforeEach(function () {
    dispenser = new BeverageDispenser()
  })

  it('should allow adding coins of values 200, 100, 50, 20, 10', function () {
    expect(addingCoins).not.toThrow()

    function addingCoins() {
      dispenser.addCoins([
        coin(200),
        coin(100),
        coin(50),
        coin(20),
        coin(10)
      ])
    }
  })

  it('should allow setting up beverage slots', function () {
    expect(addingSlot).not.toThrow()
    expect(gettingSlot).not.toThrow()
    expect(addingBeverageToSlot).not.toThrow()

    function addingSlot() {
      dispenser.addSlot(new Slot(140), 23)
    }

    function gettingSlot() {
      dispenser.getSlot(23)
    }

    function addingBeverageToSlot() {
      dispenser.getSlot(23).addBeverage(new Beverage())
    }
  })

  it('should allow collecting all coins', function () {
    expect(collectingAllCoins).not.toThrow()

    dispenser
    .addCoins(coins(200, 500))
    .addCoins(coins(100, 100))
    .addCoins(coins(50, 20))
    .addCoins(coins(20, 5))
    .addCoins(coins(10, 1))

    expect(valueOf(collectingAllCoins())).toBe(111110)

    dispenser
    .addCoins(coins(200, 5))

    expect(collectingAllCoins()).toEqual(coins(200, 5))

    function collectingAllCoins () {
      return dispenser.collectCoins()
    }
  })

  it('should allow collecting all beverages', function () {
    var slot = new Slot(140)

    expect(collectingAllBeverages).not.toThrow()

    dispenser.addSlot(slot, 23)

    slot
    .addBeverage(new Beverage())
    .addBeverage(new Beverage())
    .addBeverage(new Beverage())
    .addBeverage(new Beverage())
    .addBeverage(new Beverage())

    expect(collectingAllBeverages()).toEqual([
      new Beverage(),
      new Beverage(),
      new Beverage(),
      new Beverage(),
      new Beverage()
    ])

    slot
    .addBeverage(new Beverage())

    expect(collectingAllBeverages()).toEqual([new Beverage()])

    function collectingAllBeverages () {
      return dispenser.collectBeverages()
    }
  })

  //demonstrates use of expected exceptions
  describe('when empty', function () {
    it('should throw an exception for any order', function () {
      function foo() {
        dispenser.buy(23)
      }

      expect(foo).toThrow()
    })
  })

  describe('with full inventory', function () {

    beforeEach(function () {
      var slot = new Slot(120)

      dispenser
      .addCoins(coins(100))
      .addCoins(coins(20, 4))
      .addSlot(slot, 23)

      slot
      .addBeverage(new Beverage())
      .addBeverage(new Beverage())
      .addBeverage(new Beverage())
    })

    it('should return an array of items', function () {
      var result

      result = dispenser.buy(
        23,
        coin(100),
        coin(20),
        coin(10),
        coin(10)
      )

      expect(result).toEqual(jasmine.any(Array))
    })

    it('should return a beverage for exact payment', function () {
      var result = dispenser.buy(23, coin(100), coin(20), coin(10), coin(10))

      expect(result[0]).toEqual(jasmine.any(Beverage))
    })

    it('should return proper change for excess payment', function () {
      expect(change()).toEqual(coins(20, 4))

      dispenser
      .addCoins(coins(50, 2))
      .addCoins(coins(20, 1))
      .addCoins(coins(10, 4))

      expect(change()).toEqual([
        coin(50),
        coin(20),
        coin(10)
      ])

      expect(change()).toEqual([
        coin(50),
        coin(10),
        coin(10),
        coin(10)
      ])

      function change() {
        var result

        result = dispenser.buy(23, coin(200))

        // remove beverage: we're only concerned with the money here
        result.shift()

        return result
      }
    })

    it('should throw an exception for insufficient payment', function () {
      expect(payingNothing).toThrowError(/insufficient payment/i)
      expect(payingTooLittle).toThrowError(/insufficient payment/i)

      function payingNothing() {
        dispenser.buy(23)
      }

      function payingTooLittle() {
        dispenser.buy(23, coin(50), coin(20))
      }
    })

    it('should throw an exception when unable to provide exact change', function () {
      expect(payingTooMuch).toThrowError(/exact change/i)

      function payingTooMuch() {
        dispenser.buy(23, coin(100), coin(50))
      }
    })

  })
})

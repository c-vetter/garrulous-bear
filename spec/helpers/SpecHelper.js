(function () {
  'use strict';

  var Coin = require('../../lib/Coin')

  // kind of smells, but seems to be the jasmine way
  // this *is* based on jasmine's own examples!
  global.coin = coin
  global.coins = coins
  global.valueOf = valueOf

  function coin(value) {
    return new Coin(value)
  }

  function coins(value, count) {
    var i
    var output = []

    if (!count) {
      return [coin(value)]
    }

    for (i = 0; i < count; i++) {
      output.push(coin(value))
    }

    return output
  }

  function valueOf(array) {
    return array.reduce(valueOfCallback, 0)
  }

  function valueOfCallback(value, item) {
    if (item.hasOwnProperty('value')) {
      return value + item.value
    }
    return value
  }
})()

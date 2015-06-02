'use strict';

var Backbone = require('backbone');

var Game = Backbone.Model.extend({
  urlRoot: '/api/game/',
});

module.exports = Game;

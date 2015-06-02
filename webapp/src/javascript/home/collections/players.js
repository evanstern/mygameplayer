'use strict';

var Backbone = require('backbone');
var Player = require('../models/player');

var Players = Backbone.Collection.extend({
  url: function() {
    return this.campaign.url() + '/players/';
  },

  model: Player,

  initialize: function(models, options) {
    Backbone.Collection.prototype.initialize.call(models, options);
    this.campaign = options.campaign;
  }
});

module.exports = Players;

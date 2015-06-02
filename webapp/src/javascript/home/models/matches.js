'use strict';

var Backbone = require('backbone');
var Match = require('../models/match');

var Matches = Backbone.Collection.extend({
  url: function() {
    return this.campaign.url() + '/matches/';
  },

  model: Match,

  initialize: function(models, options) {
    Backbone.Collection.prototype.initialize.call(this, models, options);
    this.campaign = options.campaign;
  }
});

module.exports = Matches;

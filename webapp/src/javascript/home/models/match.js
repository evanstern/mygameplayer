'use strict';

var Backbone = require('backbone');

var Match = Backbone.Model.extend({
  urlRoot: '/api/match/',
});

module.exports = Match;

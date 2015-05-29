'use strict';

var Backbone = require('backbone');
var BackboneRouteControl = require('backbone-route-control');

var Router = BackboneRouteControl.extend({
  routes: {
    '': 'home#index'
  }
});

module.exports = Router;

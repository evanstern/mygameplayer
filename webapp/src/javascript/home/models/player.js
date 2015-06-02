'use strict';

var Backbone = require('backbone');

var Player = Backbone.Model.extend({
  urlRoot: '/api/user_profile/',

  sync: function(method, model, options) {
    var m = options._method ? options._method.toLowerCase() : method;
    return Backbone.Model.prototype.sync(m, model, options);
  },

  parse: function(response, options) {
    if (response.objects) {
      return response.objects[0];
    }
    return response;
  }
});

module.exports = Player;

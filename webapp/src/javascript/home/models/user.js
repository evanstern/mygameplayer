'use strict';

var Backbone = require('backbone');

var UserModel = Backbone.Model.extend({
  urlRoot: '/api/user'
});

module.exports = UserModel;


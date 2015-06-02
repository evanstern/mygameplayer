'use strict';

var Backbone = require('backbone');

var Profile = Backbone.Model.extend({
  urlRoot: '/api/user_profile/'
});

module.exports = Profile;

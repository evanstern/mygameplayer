'use strict';

var Backbone = require('backbone');

var CampaignModel = Backbone.Model.extend({
  urlRoot: '/api/campaign'
});

module.exports = CampaignModel;

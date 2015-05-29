'use strict';

var Backbone = require('backbone');
var Campaign = require('../models/campaign');

var CampaignCollection = Backbone.Collection.extend({
  model: Campaign,

  url: '/api/campaign',

  parse: function(response) {
    return response.objects;
  }
});

module.exports = CampaignCollection;

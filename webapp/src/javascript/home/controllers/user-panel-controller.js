'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var IndexView = require('../screens/index/index');
var CreateCampaignScreen = require('../screens/create-campaign/index');
var CampaignScreen = require('../screens/campaign/index');
var Campaigns = require('../collections/campaigns');
var Campaign = require('../models/campaign');

var User = Backbone.Model.extend({
});

var UserPanelControler = function(options) {
  options || (options = {});

  var app = options.app;

  var user = window.user = new User(_.extend(app.bootstrap.user.fields, {
    id: app.bootstrap.user.pk
  }));

  var campaigns = window.campaigns = new Campaigns();

  return {
    index: function() {
      var indexView = new IndexView({
        user: user,
        campaigns: campaigns,
      });
      campaigns.fetch();
      app.mainView.pageRender(indexView);
    },

    campaign: function(id) {
      var campaign = new Campaign({id: id});
      campaign.fetch().done(function() {
        var campaignScreen = new CampaignScreen({
          campaign: campaign,
          user: user
        });
        app.mainView.pageRender(campaignScreen);
      });
    },

    createCampaign: function() {
      var createCampaignScreen = new CreateCampaignScreen({
        user: user
      });
      app.mainView.pageRender(createCampaignScreen);
    }
  };
};

module.exports = UserPanelControler;


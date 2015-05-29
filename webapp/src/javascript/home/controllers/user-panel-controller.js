'use strict';

var Backbone = require('backbone');
var _ = require('lodash');
var IndexView = require('../screens/index/index');
var Campaigns = require('../collections/campaigns');

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
    }
  };
};

module.exports = UserPanelControler;


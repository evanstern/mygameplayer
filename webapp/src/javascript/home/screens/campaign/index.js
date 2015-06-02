'use strict';

var BaseView = require('../../../lib/views/base-view');
var Component = require('./component');
var React = require('react');

var PlayerCollection = require('../../collections/players');

var CampaignScreen = BaseView.extend({
  component: function() {
    return React.createElement(Component, this.options);
  },

  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.campaign = this.options.campaign;
    this.players = options.players = new PlayerCollection(
      this.campaign.get('players'), {
        campaign: this.campaign
      }
    );

    this.listenTo(this.players, "add", this.addPlayer);
    this.listenTo(this.players, "remove", this.removePlayer);
  },

  addPlayer: function(player, collection, options) {
    console.log("add", player, collection);
    player.save(player.toJSON(), {_method: 'create', url: this.players.url()});
  },

  removePlayer: function(player, collection, options) {
    console.log("remove", player, collection);
  }
});

module.exports = CampaignScreen;

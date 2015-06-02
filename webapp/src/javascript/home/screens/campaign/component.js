/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var Players = require('./players');
var Matches = require('./matches');

var CampaignComponent = React.createBackboneClass({
  render: function() {
    var campaign = this.props.campaign;
    var players = this.props.players;
    var matches = this.props.matches;
    var name = campaign.get('name');
    return (
      React.createElement("div", {className: "campaign-screen"}, 
        React.createElement("h1", null, name), 
        React.createElement(Players, {campaign: campaign, players: players}), 
        React.createElement(Matches, {campaign: campaign, matches: matches})
      )
    );
  }
});

module.exports = CampaignComponent;

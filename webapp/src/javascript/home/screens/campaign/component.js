/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var PlayersComponent = require('./players');

var CampaignComponent = React.createBackboneClass({
  render: function() {
    var campaign = this.props.campaign;
    var players = this.props.players;
    var name = campaign.get('name');
    return (
      React.createElement("div", {className: "campaign-screen"}, 
        React.createElement("h1", null, name), 
        React.createElement(PlayersComponent, {campaign: campaign, players: players})
      )
    );
  }
});

module.exports = CampaignComponent;

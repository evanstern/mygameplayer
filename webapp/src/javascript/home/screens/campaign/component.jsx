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
      <div className="campaign-screen">
        <h1>{name}</h1>
        <PlayersComponent campaign={campaign} players={players} />
      </div>
    );
  }
});

module.exports = CampaignComponent;

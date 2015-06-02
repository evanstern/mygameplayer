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
      <div className="campaign-screen">
        <h1>{name}</h1>
        <Players campaign={campaign} players={players} />
        <Matches campaign={campaign} matches={matches} />
      </div>
    );
  }
});

module.exports = CampaignComponent;

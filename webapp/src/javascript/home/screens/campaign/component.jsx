/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var CampaignComponent = React.createBackboneClass({
  render: function() {
    var campaign = this.props.campaign;
    var name = campaign.get('name');
    return (
      <div className="campaign-screen">
        <h1>{name}</h1>
      </div>
    );
  }
});

module.exports = CampaignComponent;

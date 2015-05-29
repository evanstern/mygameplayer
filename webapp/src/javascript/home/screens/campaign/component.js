/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var CampaignComponent = React.createBackboneClass({
  render: function() {
    var campaign = this.props.campaign;
    var name = campaign.get('name');
    return (
      React.createElement("div", {className: "campaign-screen"}, 
        React.createElement("h1", null, name)
      )
    );
  }
});

module.exports = CampaignComponent;

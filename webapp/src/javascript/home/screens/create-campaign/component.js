/** @jsx React.DOM */
'use strict'

var React = require('react');
var ReactBackbone = require('react.backbone');

var CreateCampaignComponent = React.createBackboneClass({
  render: function() {
    return (
      React.createElement("div", {className: "create-campaign-screen"}, 
        React.createElement("h1", null, "Create Campaign")
      )
    );
  }
});

module.exports = CreateCampaignComponent;

/** @jsx React.DOM */
'use strict'

var React = require('react');
var ReactBackbone = require('react.backbone');

var CreateCampaignComponent = React.createBackboneClass({
  render: function() {
    return (
      <div className="create-campaign-screen">
        <h1>Create Campaign</h1>
      </div>
    );
  }
});

module.exports = CreateCampaignComponent;

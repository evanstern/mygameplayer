/** @jsx React.DOM */
'use strict'

var React = require('react');
var ReactBackbone = require('react.backbone');
var CampaignModel = require('../../models/campaign');
var _ = require('lodash');

var CampaignForm = React.createBackboneClass({
  handleSubmit: function(event) {
    event.preventDefault();
    this.props.campaign.save();
  },

  render: function() {
    var nameLink = {
      value: this.props.campaign.get('name'),
      requestChange: _.bind(function(newValue) {
        this.props.campaign.set('name', newValue);
      }, this)
    };
    return (
      React.createElement("div", {className: "campaign-form"}, 
        React.createElement("form", {onSubmit: this.handleSubmit, className: "form-horizontal"}, 
          React.createElement("div", {className: "form-group"}, 
            React.createElement("label", {htmlFor: "campaignName", className: "control-label"}, "Name"), 
            React.createElement("div", {className: "form-controls"}, 
              React.createElement("input", {type: "text", name: "name", className: "form-control", valueLink: nameLink})
            )
          ), 
          React.createElement("button", {type: "submit", className: "btn btn-lg btn-primary btn-block"}, "Create")
        )
      )
    );
  }
});

var CreateCampaignComponent = React.createBackboneClass({
  render: function() {
    var campaign = window.campaign = new CampaignModel();
    return (
      React.createElement("div", {className: "create-campaign-screen"}, 
        React.createElement("div", {className: "content-area"}, 
          React.createElement("h1", null, "Create Campaign"), 
          React.createElement(CampaignForm, {campaign: campaign})
        )
      )
    );
  }
});

module.exports = CreateCampaignComponent;

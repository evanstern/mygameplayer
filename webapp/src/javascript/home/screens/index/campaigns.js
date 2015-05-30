/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var CampaignRow = React.createClass({displayName: "CampaignRow",
  render: function() {
    var name = this.props.campaign.get('name');
    var id = this.props.campaign.get('id');
    var href = 'campaign/' + id;
    return (
      React.createElement("li", {className: "campaign-name list-group-item"}, 
        React.createElement("span", null, name), 
        React.createElement("a", {href: href}, React.createElement("span", {className: "glyphicon glyphicon-pencil"}))
      )
    );
  }
});

var CampaignsComponent = React.createBackboneClass({
  mixins: [
    React.BackboneMixin('campaigns', 'all')
  ],

  render: function() {
    var campaignList = [];
    this.props.campaigns.each(function(campaign) {
      campaignList.push(React.createElement(CampaignRow, {campaign: campaign, key: campaign.id}));
    });
    return (
      React.createElement("div", {className: "campaigns-panel"}, 
        React.createElement("h3", null, "Campaigns"), 
        React.createElement("ul", {className: "campaign-list list-group"}, 
          campaignList
        ), 
        React.createElement("div", {className: "campaign-controls"}, 
          React.createElement("a", {href: "campaign/create", className: "btn btn-lg btn-block btn-primary", id: "new-campaign"}, "Start new campaign")
        )
      )
    )
  }
});

module.exports = CampaignsComponent;

/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var CampaignRow = React.createClass({
  render: function() {
    var name = this.props.campaign.get('name');
    var id = this.props.campaign.get('id');
    var href = 'campaign/' + id;
    return (
      <li className="campaign-name list-group-item">
        <span>{name}</span>
        <a href={href}><span className="glyphicon glyphicon-pencil"></span></a>
      </li>
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
      campaignList.push(<CampaignRow campaign={campaign} key={campaign.id} />);
    });
    return (
      <div className="campaigns-panel">
        <h3>Campaigns</h3>
        <ul className="campaign-list list-group">
          {campaignList}
        </ul>
        <div className="campaign-controls">
          <a href="campaign/create" className="btn btn-lg btn-block btn-primary" id="new-campaign">Start new campaign</a>
        </div>
      </div>
    )
  }
});

module.exports = CampaignsComponent;

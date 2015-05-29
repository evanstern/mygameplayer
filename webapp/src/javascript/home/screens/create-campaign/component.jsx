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
      <div className="campaign-form">
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="form-group">
            <label htmlFor="campaignName" className="control-label">Name</label>
            <div className="form-controls">
              <input type="text" name="name" className="form-control" valueLink={nameLink} />
            </div>
          </div>
          <button type="submit" className="btn btn-lg btn-primary btn-block">Create</button>
        </form>
      </div>
    );
  }
});

var CreateCampaignComponent = React.createBackboneClass({
  render: function() {
    var campaign = window.campaign = new CampaignModel();
    return (
      <div className="create-campaign-screen">
        <div className="content-area">
          <h1>Create Campaign</h1>
          <CampaignForm campaign={campaign} />
        </div>
      </div>
    );
  }
});

module.exports = CreateCampaignComponent;

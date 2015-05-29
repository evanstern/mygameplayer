/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');
var UserPanel = require('./user-panel');
var CampaignPanel = require('./campaigns');

var IndexComponent = React.createBackboneClass({
  render: function() {
    var user = this.props.user;
    var campaigns = this.props.campaigns;
    return (
      <div className="index">
        <div className="content-left">
          <div className="content-area">
            <UserPanel user={user} />
          </div>
        </div>
        <div className="content-center">
          <div className="content-area">
            <CampaignPanel campaigns={campaigns} />
          </div>
        </div>
        <div className="content-right">
          <div className="content-area">
            <span>CONTENT</span>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = IndexComponent;

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
      React.createElement("div", {className: "index"}, 
        React.createElement("div", {className: "content-left"}, 
          React.createElement("div", {className: "content-area"}, 
            React.createElement(UserPanel, {user: user})
          )
        ), 
        React.createElement("div", {className: "content-center"}, 
          React.createElement("div", {className: "content-area"}, 
            React.createElement(CampaignPanel, {campaigns: campaigns})
          )
        ), 
        React.createElement("div", {className: "content-right"}, 
          React.createElement("div", {className: "content-area"}, 
            React.createElement("span", null, "CONTENT")
          )
        )
      )
    );
  }
});

module.exports = IndexComponent;

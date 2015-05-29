/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var UserPanelComponent = React.createBackboneClass({
  mixins: [
    React.BackboneMixin('user', 'change')
  ],

  render: function() {
    var model = this.props.user;
    var username = model.get("username");
    var gravatarHash = model.get("gravatar_hash");
    var imgSrc = "http://www.gravatar.com/avatar/" + gravatarHash;
    return (
      React.createElement("div", {className: "user-summary"}, 
        React.createElement("div", {className: "user-icon"}, 
            React.createElement("img", {src: imgSrc})
        ), 
        React.createElement("div", {className: "user-name"}, username), 
        React.createElement("div", {className: "user-details"}, 
            React.createElement("span", {className: "user-detail"}, "played"), 
            React.createElement("span", {className: "user-detail"}, "rank"), 
            React.createElement("span", {className: "user-detail"}, "achievments")
        )
      )
    );
  }
});

module.exports = UserPanelComponent;


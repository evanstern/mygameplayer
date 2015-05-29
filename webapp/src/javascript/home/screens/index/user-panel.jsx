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
      <div className="user-summary">
        <div className="user-icon">
            <img src={imgSrc} />
        </div>
        <div className="user-name">{username}</div>
        <div className="user-details">
            <span className="user-detail">played</span>
            <span className="user-detail">rank</span>
            <span className="user-detail">achievments</span>
        </div>
      </div>
    );
  }
});

module.exports = UserPanelComponent;


/** @jsx React.DOM */
'use strict';

var React = require('react');

var PlayerItem = React.createClass({displayName: "PlayerItem",
  render: function() {
    var playerName = this.props.player.get('player_name');
    return (
      React.createElement("li", {className: "list-group-item"}, 
        playerName
      )
    );
  }
});

module.exports = PlayerItem;

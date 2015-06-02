/** @jsx React.DOM */
'use strict';

var React = require('react');

var PlayerItem = React.createClass({
  render: function() {
    var playerName = this.props.player.get('player_name');
    return (
      <li className="list-group-item">
        {playerName}
      </li>
    );
  }
});

module.exports = PlayerItem;

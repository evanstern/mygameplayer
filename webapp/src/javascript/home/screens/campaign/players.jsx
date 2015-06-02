/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');
var _ = require("lodash");
var PlayerItem = require('./player-item');

var Player = require('../../models/player');

var ENTER_KEY = 13;

var PlayersList = React.createBackboneClass({
  mixins: [
    React.BackboneMixin("players", "sync"),
  ],

  render: function() {
    var playerList = this.props.players.map(function(player) {
      return <PlayerItem player={player} key={player.id} />
    });

    return (
      <ul className="list-group">
        {playerList}
      </ul>
    );
  }
});

var PlayersComponent = React.createClass({
  getInitialState: function() {
    return {
      isValid: true
    };
  },

  handleKeyDown: function(event) {
    if (event.which !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = event.target.value;

    var player = new Player();
    player.fetch({data: {player_name: val}}).done(_.bind(function() {
      if (player.id) {
        this.props.players.add(player);
        this.setState({'isValid': true});
      } else {
        this.setState({'isValid': false});
      }
    }, this));
  },

  render: function() {
    var players = this.props.players;
    return (
      <div className="content-area">
        <h3>Players</h3>
        <form className="form">
          <div className={this.state.isValid ? 'form-group' : 'form-group has-error'}>
            <input id="new-player"
                  className="form-control"
                  type="text"
                  placeholder="Add a new player"
                  onKeyDown={this.handleKeyDown}
                  autoFocus={true} />
            <span className="help-block">Player not found</span>
          </div>
          <PlayersList players={players} />
        </form>
      </div>
    );
  }
});

module.exports = PlayersComponent;

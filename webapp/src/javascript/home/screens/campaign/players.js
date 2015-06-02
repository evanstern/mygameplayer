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
      return React.createElement(PlayerItem, {player: player, key: player.id})
    });

    return (
      React.createElement("ul", {className: "list-group"}, 
        playerList
      )
    );
  }
});

var PlayersComponent = React.createClass({displayName: "PlayersComponent",
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
      React.createElement("div", {className: "content-area"}, 
        React.createElement("h3", null, "Players"), 
        React.createElement("form", {className: "form"}, 
          React.createElement("div", {className: this.state.isValid ? 'form-group' : 'form-group has-error'}, 
            React.createElement("input", {id: "new-player", 
                  className: "form-control", 
                  type: "text", 
                  placeholder: "Add a new player", 
                  onKeyDown: this.handleKeyDown, 
                  autoFocus: true}), 
            React.createElement("span", {className: "help-block"}, "Player not found")
          ), 
          React.createElement(PlayersList, {players: players})
        )
      )
    );
  }
});

module.exports = PlayersComponent;

/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var MatchItem = React.createClass({displayName: "MatchItem",
  getInitialState: function() {
    return {
      hasEnded: this.props.match.get('date_ended') ? true : false
    };
  },

  render: function() {
    var gameName = this.props.match.get("game").name;
    var players = this.props.match.get("players");
    var started = this.props.match.get("date_started");
    var manageUrl = 'match/' + this.props.match.id;
    return (
      React.createElement("li", {className: "list-group-item"}, 
        React.createElement("div", {className: "game-name"}, gameName), 
        React.createElement("div", {className: "date-started"}, started), 
        React.createElement("div", {className: "player-count"}, React.createElement("span", {className: "badge"}, players.length)), 
        React.createElement("div", {className: "t-has-ended"}, this.state.hasEnded ? 'ended' : 'ongoing'), 
        React.createElement("div", {className: "controls"}, 
          React.createElement("a", {href: manageUrl}, "manage")
        )
      )
    );
  }
});

var MatchesList = React.createBackboneClass({
  mixins: [
    React.BackboneMixin("games", "sync"),
  ],

  render: function() {
    var matchList = this.props.matches.map(function(match) {
      return React.createElement(MatchItem, {match: match, key: match.id})
    });
    return (
      React.createElement("ul", {className: "list-group"}, 
        matchList
      )
    );
  }
});

var MatchesComponent = React.createClass({displayName: "MatchesComponent",
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      React.createElement("div", {className: "content-area"}, 
        React.createElement("h3", null, "Matches"), 
        React.createElement(MatchesList, {matches: this.props.matches})
      )
    );
  }
});

module.exports = MatchesComponent;

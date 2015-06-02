/** @jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var MatchItem = React.createClass({
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
      <li className="list-group-item">
        <div className="game-name">{gameName}</div>
        <div className="date-started">{started}</div>
        <div className="player-count"><span className="badge">{players.length}</span></div>
        <div className="t-has-ended">{this.state.hasEnded ? 'ended' : 'ongoing'}</div>
        <div className="controls">
          <a href={manageUrl}>manage</a>
        </div>
      </li>
    );
  }
});

var MatchesList = React.createBackboneClass({
  mixins: [
    React.BackboneMixin("games", "sync"),
  ],

  render: function() {
    var matchList = this.props.matches.map(function(match) {
      return <MatchItem match={match} key={match.id} />
    });
    return (
      <ul className="list-group">
        {matchList}
      </ul>
    );
  }
});

var MatchesComponent = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div className="content-area">
        <h3>Matches</h3>
        <MatchesList matches={this.props.matches} />
      </div>
    );
  }
});

module.exports = MatchesComponent;

/** #jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var MainComponent = React.createBackboneClass({
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("div", {id: "mainContainer"})
      )
    );
  }
});

module.exports = MainComponent;

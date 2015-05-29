/** #jsx React.DOM */
'use strict';

var React = require('react');
var ReactBackbone = require('react.backbone');

var MainComponent = React.createBackboneClass({
  render: function() {
    return (
      <div>
        <div id="mainContainer"></div>
      </div>
    );
  }
});

module.exports = MainComponent;

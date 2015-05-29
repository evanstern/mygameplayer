'use strict';

var BaseView = require('../../../lib/views/base-view');
var Component = require('./component');
var React = require('react');

var CampaignScreen = BaseView.extend({
  component: function() {
    return React.createElement(Component, this.options);
  }
});

module.exports = CampaignScreen;

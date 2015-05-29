'use strict';

var React = require('react');
var BaseView = require('../../../lib/views/base-view');
var Component = require('./component');

var CreateCampaignScreen = BaseView.extend({
  component: function() {
    return React.createElement(Component, this.options);
  }
});

module.exports = CreateCampaignScreen;

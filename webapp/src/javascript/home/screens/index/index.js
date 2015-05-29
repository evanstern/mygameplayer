'use strict';

var BaseView = require('../../../lib/views/base-view');
var Component = require('./component');
var React = require('react');

var IndexView = BaseView.extend({
  component: function() {
    return React.createElement(Component, this.options);
  }
});

module.exports = IndexView;

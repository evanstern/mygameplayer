'use strict';

var React = require('react');
var BaseView = require('../../../lib/views/base-view');
var Component = require('./component');

var MainView = BaseView.extend({
  component: function() {
    return React.createElement(Component, this.options);
  },

  pageRender: function(view) {
    this.$('#mainContainer').html(view.render().el);
  }
});

module.exports = MainView;

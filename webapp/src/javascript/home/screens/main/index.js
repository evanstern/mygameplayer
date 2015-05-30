'use strict';

var React = require('react');
var BaseView = require('../../../lib/views/base-view');
var Component = require('./component');

var MainView = BaseView.extend({
  initialize: function(options) {
    BaseView.prototype.initialize.call(this, options);
    this.currentView = null;
  },

  component: function() {
    return React.createElement(Component, this.options);
  },

  pageRender: function(view) {
    if (this.currentView) {
      var b = React.unmountComponentAtNode(this.currentView.el);
    }
    this.currentView = view;
    this.$('#mainContainer').html(view.render().el);
  }
});

module.exports = MainView;

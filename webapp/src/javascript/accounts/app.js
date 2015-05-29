'use strict';

var Backbone = require('backbone');
var _ = require('lodash');

var Application = function() {
  this.initialize();
};

Application.prototype.initialize = function() {
};

Application.prototype.run = function() {
  var MyView = Backbone.View.extend({
    template: _.template('<h1>Hello World</h1>'),

    render: function() {
      this.$el.append(this.template());
      return this;
    }
  });

  var myView = new MyView();
  $('#content').append(myView.render().el);
};

module.exports = Application;

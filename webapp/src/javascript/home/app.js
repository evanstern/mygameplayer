'use strict';

var Backbone = require('backbone');
var $ = Backbone.$;
var MainView = require('./screens/main/index');
var HomeController = require('./controllers/user-panel-controller');
var Router = require('./router');

var Application = function() {
  this.initialize();
};

Application.prototype.initialize = function() {
  this.bootstrap = window.MGP && window.MGP.bootstrap;

  this.controllers = {
    home: new HomeController({app: this})
  };

  this.router = new Router({
    app: this,
    controllers: this.controllers
  });

  this.mainView = new MainView({
    el: $('.main-content'),
    router: this.router
  });
};

Application.prototype.run = function() {
  this.mainView.render();
  var username = this.bootstrap.user.fields.username;
  Backbone.history.start({
    pushState: true,
    root: '/accounts/' + username + '/'
  });
  $('body').removeClass('no-js');
};

module.exports = Application;

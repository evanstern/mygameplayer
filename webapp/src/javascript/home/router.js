'use strict';

var Backbone = require('backbone');
var BackboneRouteControl = require('backbone-route-control');
var $ = Backbone.$;

(function($, root) {
  var dataBypass = function(event) {
    var href = {
      prop: $(this).prop('href'),
      attr: $(this).attr('href')
    };

    var urlRoot = root.location.protocol + '//' + root.location.host + '/';

    if (href.prop.slice(0, urlRoot.length) === urlRoot) {
      event.preventDefault();
      Backbone.history.navigate(href.attr, true);
    }
  };

  $(document).on("click", "a[href!=#]:not([data-bypass])", dataBypass);
})($, window)

var Router = BackboneRouteControl.extend({
  routes: {
    '': 'home#index',
    'campaign/create': 'home#createCampaign',
  }
});

module.exports = Router;

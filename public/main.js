require.config({
  paths: {
    backbone: '../bower_components/exoskeleton/exoskeleton',
    handlebars: '../bower_components/handlebars/handlebars',
    davy: '../bower_components/davy/davy',
    subsequent: '../bower_components/subsequent/subsequent',
    'exoskeleton.localStorage': '../bower_components/exoskeleton.localStorage/backbone.localStorage'
  },
  shim: {
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  },
  map: {
    'backbone': {'underscore': 'underscore-empty'}, // Remap Exoskeleton to use an empty underscore file.
    '*': {'underscore': 'underscore-private'} // Everything else in the app that requests _ will use the Backbone.utils version.
  }
});

// Stub out jquery and underscore dependencies to return nothing.
define('jquery', function() { });
define('underscore-empty', function() { });

// Avoid the circular dependency of Exoskeleton requring underscore if we're using an empty underscore
define('underscore-private', ['backbone'], function(Backbone) {
  return Backbone.utils;
});


define(['todos'], function() {
  // start the app
})
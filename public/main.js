require.config({
  paths: {
    text: '../bower_components/requirejs-text/text',
    exoskeleton: '../bower_components/exoskeleton/exoskeleton',
    davy: '../bower_components/davy/davy',
    subsequent: '../bower_components/subsequent/subsequent',
    'exoskeleton.localStorage': '../bower_components/exoskeleton.localStorage/backbone.localStorage',
    'underscore.template': 'lib/underscore.template'
  },
  map: {
    'exoskeleton': {'underscore': 'underscore-empty'}, // Remap Exoskeleton to use an empty underscore file.
    '*': {
      'underscore': 'underscore-private',  // Everything else in the app that requests _ will use the Backbone.utils version.
      'backbone': 'exoskeleton'
    }
  }
});

// Stub out jquery and underscore dependencies to return nothing.
define('jquery');
define('underscore-empty');

// Avoid the circular dependency of Exoskeleton requring underscore if we're using an empty underscore
define('underscore-private', ['exoskeleton'], function(Backbone) {
  return Backbone.utils;
});


define(['views/app'], function(AppView) {
  // Finally, kick things off by starting the App
  var App = new AppView;
})
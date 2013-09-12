/*
 * grunt-admo-ui
 *
 *
 * Copyright (c) 2013 David Rubin
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');

  function loadConfig(folderPath) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: folderPath}).forEach(function(option) {
      key = option.replace(/\.js$/, '');
      object[key] = require(path.join(folderPath, option));
    });
    return object;
  };

  function getAppName(){
    var fs = require('fs');
    var packageJson = fs.readFileSync( "package.json" );
    var app = JSON.parse(packageJson).name;
    return app;
  };

  // load all grunt tasks
  var plugins = [
    "grunt-git-describe",
    "grunt-env",
    "grunt-contrib-clean",
    "grunt-contrib-compass",
    "grunt-contrib-copy",
    "grunt-preprocess",
    "grunt-contrib-livereload",
    "grunt-contrib-connect",
    "grunt-open",
    "grunt-regarde",
    "grunt-usemin",
    "grunt-contrib-imagemin",
    "grunt-contrib-cssmin",
    "grunt-contrib-htmlmin",
    "grunt-contrib-concat",
    "grunt-contrib-uglify",
    "grunt-contrib-compress"
  ];
  plugins.forEach(grunt.loadNpmTasks);


  var config = loadConfig(path.join(__dirname, 'options'));

  grunt.initConfig(config);

  var serverList = [
    'git-describe',
    'env',
    'clean:server',
    //Manually copy over the config and preprocess it
    'copy:admoFramework',
    'copy:index',
    'compass',
    'preprocess:admoConfigLive',
    'preprocess:admoIndexLive',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ];

  var buildList = [
    'git-describe',
    'env',
    'clean:dist',
    'useminPrepare',
    'copy:admoFramework',
    'copy:dist',
    'copy:index',
    'compass',
    'preprocess:admoConfigDist',
    'preprocess:admoIndexDist',
    'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    //Doesn't seem to create a bower script or it puts it in the wrong folder
    // 'usemin',
    'compress'
  ];


  grunt.registerTask('build', "Builds the pod files", function(app) {
    grunt.config('currentApp', getAppName());
    //Ideally should come from the C# app but for now compiled builds are production
    grunt.config('currentEnvironment', 'production');
    grunt.task.run(buildList);
  });

  grunt.registerTask('server', "Serves the content via the built in web server", function(app) {
    grunt.config('currentApp', getAppName());
    grunt.task.run(serverList);
  });

  grunt.registerTask('default', ['build']);

  grunt.renameTask('regarde', 'watch');
};

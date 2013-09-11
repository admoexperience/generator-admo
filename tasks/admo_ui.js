/*
 * grunt-admo-ui
 *
 *
 * Copyright (c) 2013 David Rubin
 */

'use strict';

module.exports = function(grunt) {

  console.log("start task");
  var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
  console.log("lrSnippet")
  var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
  };

  var path = require('path');

  console.log("Before loading plugins");
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
  console.log("Loading plugins");
  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    "git-describe": {
      "options": {
        prop: 'GIT_COMMIT'
      },
      "describe": {
        // Target-specific file lists and/or options go here.
      },
    },
    preprocess: {
      admoConfigLive : {
        src : '.tmp/scripts/libs/admo-config.js',
        dest: '.tmp/scripts/libs/admo-config.js'
      },
      admoIndexLive : {
        src : '.tmp/index.html',
        dest: '.tmp/index.html'
      },
      admoConfigDist : {
        src : '.tmp/scripts/libs/admo-config.js',
        dest: '<%= yeoman.dist %>/scripts/libs/admo-config.js'
      },
      admoIndexDist : {
        src : '<%= yeoman.dist %>/index.html',
        dest: '<%= yeoman.dist %>/index.html'
      }
    },
    env: {
       options: {
           // Shared options hash.
          BUGSNAG_API_KEY: '3f44cc38e81c599ebf780eb2bb4b4c7d',
          GIT_COMMIT: '<%= grunt.config("GIT_COMMIT") || "not set" %>',
          CURRENT_APP: '<%= grunt.config("currentApp") %>',
          ENVIRONMENT: '<%= grunt.config("currentEnvironment") || "development" %>',
          POD_COMPILE_DATE: new Date(),
       },
       setEnv:{

       }
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}','<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '{.tmp,<%= yeoman.app %>}/apps/<%= grunt.config("currentApp") %>/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          //The config file is handled differently
          '!<%= yeoman.app %>/scripts/libs/admo-config.js',
          '!<%= yeoman.app %>/index.html',
          '<%= yeoman.app %>/{,*/}*.html',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      admoIndex: {
        files: ['<%= yeoman.app %>/index.html'],
        tasks: ['copy:index','preprocess:admoIndexLive'],
        options: {
          livereload: true,
        },
      },
    },
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'cms'),
              mountFolder(connect, '.tmp'),
              mountFolder(connect, yeomanConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>/emulator'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        //This allows us to compile the main file first.
        //The main file will include all the others to compile them
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        relativeAssets: true,
        debugInfo: true
      },
      main: {
        options: {
          specify: ['<%= yeoman.app %>/styles/main.scss']
        }
      },
      app:{
        options:{
          specify: '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/main.scss',
          sassDir: '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/',
          importPath: ['<%= yeoman.app %>/styles', '<%= yeoman.app %>/components',],
          cssDir: '.tmp/<%= grunt.config("currentApp") %>/styles/',
        }
      },
    },
    concat: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '.tmp/scripts/{,*/}*.js',
            '<%= yeoman.app %>/scripts/{,*/}*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%= yeoman.app %>/styles/{,*/}*.css'
          ],
          //Manually copy the main file
          '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/main.css': [
            '.tmp/<%= grunt.config("currentApp") %>/styles/main.css',
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/scripts/scripts.js': [
            '<%= yeoman.dist %>/scripts/scripts.js'
          ]
        }
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%= yeoman.dist %>/styles/{,*/}*.css',
            '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    copy: {
      //Copy the core framework from the NPM module into the .tmp dir for serving.
      admoFramework:{
        files: [{
          expand: true,
          dot: true,
          flatten: false,
          cwd: path.join(__dirname,'../templates'),
          dest: '.tmp/',
          src: '**'
        }]
      },
      //Index file is pre-processed so it needs to be copied
      index: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '.tmp',
          src: ['_include.html']
        }]
      },
      dist: {
        files: [
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: ['_include.html']
        },
        {
          expand: true,
          dot: true,
          flatten: false,
          cwd: path.join(__dirname,'../templates'),
          dest: '<%= yeoman.dist %>',
          src: '**'
        },
        {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '**/*',
          ],
          filter: function(value){
            console.log("Copying over "+value);
            //Ignore all video files
            var lowercase = value.toLowerCase();
            var filtered = ['videos','.webm','cms'];
            for(var i in filtered){
              var value = filtered[i];
               if(lowercase.indexOf(value) !== -1){
                return false;
              }
            }
            return true;
          }
        }]
      }
    },
    compress : {
      main : {
        options : {
          archive : 'dist-<%= grunt.config("currentApp") %>.pod.zip'
        },
        files : [
         { expand: true, src : "**/*", cwd : "dist/" }
        ]
      }
    }
  });

  var serverList = [
   // 'git-describe',
    'env',
    'clean:server',
    'compass',
    //Manually copy over the config and preprocess it
    'copy:admoFramework',
    'copy:index',
    'preprocess:admoConfigLive',
    'preprocess:admoIndexLive',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ];

  grunt.registerTask('test', [
    'clean:server',
    'compass',
    'connect:test',
    'karma'
  ]);

  var buildList =    [
    'git-describe',
    'env',
    'clean:dist',
    'compass',
    'useminPrepare',
    'copy:admoFramework',
    'copy:dist',
    'copy:index',
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
    grunt.config('currentApp', app || 'flightcentre');
    //Ideally should come from the C# app but for now compiled builds are production
    grunt.config('currentEnvironment', 'production');
    grunt.task.run(buildList);
  });

  grunt.registerTask('server', "Serves the content via the built in web server", function(app) {
    grunt.config('currentApp', app || 'flightcentre');
    grunt.task.run(serverList);
  });

  grunt.registerTask('default', ['build']);

  grunt.renameTask('regarde', 'watch');
};

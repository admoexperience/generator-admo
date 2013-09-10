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
    "grunt-ngmin",
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

  try {
    yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
  } catch (e) {
    console.log(e);
  }


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
      admoconfigLive : {
        src : '.tmp/scripts/libs/admo-config.js',
        dest: '.tmp/scripts/libs/admo-config.js',
      },
      admoconfigDist : {
        src : '<%= yeoman.dist %>/scripts/libs/admo-config.js',
        dest: '<%= yeoman.dist %>/scripts/libs/admo-config.js',
      },
    },
    env: {
       options: {
         // Shared options hash.
        BUGSNAG_API_KEY: '3f44cc38e81c599ebf780eb2bb4b4c7d',
        GIT_COMMIT: '<%= grunt.config("GIT_COMMIT") || "not set" %>',
        CURRENT_APP: '<%= grunt.config("currentApp") %>',
        ENVIRONMENT: '<%= grunt.config("currentEnvironment") || "development" %>',
        POD_COMPILE_DATE: new Date(),

        //@deprecated, do not use.
        //Value should come from the CMS
        MIXPANEL_API_KEY: '94bd8630e2a2959000336806b57ad883'
       },
       setEnv:{

       }
    },
    watch: {
      compass: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}','<%= yeoman.app %>/apps/<%= grunt.config("currentApp") %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '{.tmp,<%= yeoman.app %>}/apps/<%= grunt.config("currentApp") %>/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
          //The config file is handled differently
          '!<%= yeoman.app %>/scripts/libs/admo-config.js',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      //Admo config is the only file that is needed to be preprocessed
      admoconfig: {
        files: ['<%= yeoman.app %>/scripts/libs/admo-config.js'],
        tasks: ['copy:admoconfig','preprocess'],
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
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js',
        '!<%= yeoman.app %>/scripts/vendor/**/*.js',
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        //This allows us to compile the main file first.
        //The main file will include all the others to compile them
        cssDir: '.tmp/styles',
        imagesDir: '<%= yeoman.app %>/images',
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower',
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
          specify: '<%= yeoman.app %>/apps/<%= grunt.config("currentApp") %>/styles/main.scss',
          sassDir: '<%= yeoman.app %>/apps/<%= grunt.config("currentApp") %>/styles/',
          importPath: ['<%= yeoman.app %>/bower','<%= yeoman.app %>/styles'],
          cssDir: '.tmp/apps/<%= grunt.config("currentApp") %>/styles/',
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
          '<%= yeoman.dist %>/apps/<%= grunt.config("currentApp") %>/styles/main.css': [
            '.tmp/apps/<%= grunt.config("currentApp") %>/styles/main.css',
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['*.html', 'views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    cdnify: {
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/scripts',
          src: '*.js',
          dest: '<%= yeoman.dist %>/scripts'
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
      admoconfig:{
        files: [{
          expand: true,
          dot: true,
          flatten: false,
          cwd: path.join(__dirname,'../templates'),
          dest: '.tmp/',
          src: '**'
        }]
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'emulator/**/*',
            //Needed for the emulator. (useful to have even in prod mode)
            'bower/jquery/jquery.js',
            'scripts/**',
            'apps/<%= grunt.config("currentApp") %>/**/*',
            'images/**/*',
            'styles/fonts/*'
          ],
          filter: function(value){
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

  console.log("After config");


console.log("testing");
  var serverList = [
    'git-describe',
    'env',
    'clean:server',
    'compass',
    //Manually copy over the config and preprocess it
    'copy:admoconfig',
    'preprocess:admoconfigLive',
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
   // 'jshint',
   // 'test',
    'compass',
    'useminPrepare',
    //'imagemin',
    'cssmin',
    'htmlmin',
    'concat',
    'copy:dist',
    //'cdnify',
    'ngmin',
    'uglify',
    'usemin',
    'preprocess:admoconfigDist',
    'compress'
  ];

  console.log('<%= yeoman.app %>  ' + path.join(__dirname,'../templates/admo-config.js'));
  console.log("before task");

  grunt.registerTask('build', "Builds the pod files", function(app) {
    grunt.config('currentApp', app || 'flightcentre');
    //Ideally should come from the C# app but for now compiled builds are production
    grunt.config('currentEnvironment', 'production');
    grunt.task.run(buildList);
  });
  console.log("Default task");

  grunt.registerTask('server', "Serves the content via the built in web server", function(app) {
    grunt.config('currentApp', app || 'flightcentre');
    grunt.task.run(serverList);

  });

  grunt.registerTask('default', ['build']);

  grunt.renameTask('regarde', 'watch');
};

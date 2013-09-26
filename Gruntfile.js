module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: ['Gruntfile.js', 'tasks/**/*.js','component/index.js','app/index.js'],
      options: {
        '-W097': true, //W097: Use the function form of "use strict".
        curly: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: false,
          require: false,
          console: false,
          module: false,
          __dirname: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};

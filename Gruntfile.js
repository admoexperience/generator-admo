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
          jQuery: true,
          require: true,
          console: true,
          module: true,
          __dirname: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};

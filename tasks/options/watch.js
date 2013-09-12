module.exports = {
  compass: {
    files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
    tasks: ['compass']
  },
  livereload: {
    files: [
      '{.tmp,<%= yeoman.app %>}/<%= grunt.config("currentApp") %>/styles/*.css',
      '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
      //The config file is handled differently
      '!<%= yeoman.app %>/scripts/libs/admo-config.js',
      '!<%= yeoman.app %>/_include.html',
      '<%= yeoman.app %>/**/*.html',
      '<%= yeoman.app %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    tasks: ['livereload']
  },
  admoIndex: {
    files: ['**/_include.html'],
    tasks: ['copy:admoIndexFramework','copy:index', 'preprocess:admoIndexLive'],
    options: {
      livereload: true,
    },
  }
}

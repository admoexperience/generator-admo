module.export = {
  compass: {
    files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}', '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/{,*/}*.{scss,sass}'],
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
    tasks: ['copy:index', 'preprocess:admoIndexLive'],
    options: {
      livereload: true,
    },
  }
}

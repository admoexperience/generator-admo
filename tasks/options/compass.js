module.exports = {
  options: {
    sassDir: '.tmp/styles',
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
      specify: ['.tmp/styles/main.scss']
    }
  },
  app: {
    options: {
      specify: '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/main.scss',
      sassDir: '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/',
      importPath: ['.tmp/styles', '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/components' ],
      cssDir: '.tmp/<%= grunt.config("currentApp") %>/styles/'
    }
  }
};

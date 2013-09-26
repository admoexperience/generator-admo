module.exports = {
  dist: {
    files: {
      '<%= yeoman.dist %>/scripts/scripts.js': [
        '.tmp/scripts/{,*/}*.js',
        '<%= yeoman.app %>/scripts/{,*/}*.js'
      ]
    }
  }
};

module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.app %>/images',
      src: '**/*',
      dest: '<%= yeoman.dist %>/images'
    }]
  }
}

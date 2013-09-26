module.exports = {
  dist: {
    options: {},
    files: [{
      expand: true,
      cwd: '<%= yeoman.dist %>',
      src: ['*.html', 'views/*.html'],
      dest: '<%= yeoman.dist %>'
    }]
  }
};

module.exports = {
  dist: {
    files: {
      '<%= yeoman.dist %>/styles/main.css': [
        '.tmp/styles/*.css'
      ],
      //Manually copy the main file
      '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/main.css': [
        '.tmp/<%= grunt.config("currentApp") %>/styles/main.css'
      ]
    }
  }
};

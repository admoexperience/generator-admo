module.exports = {
  dist: {
    files: {
      '<%= yeoman.dist %>/styles/main.css': [
        '<%= yeoman.dist %>/styles/main.css'
      ],
      //Manually copy the main file
      '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/main.css': [
        '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/main.css'
      ]
    }
  }
};

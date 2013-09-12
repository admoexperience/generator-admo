var path = require('path');
console.log(path.join(__dirname, '../../templates'));
module.exports = {
  //Copy the core framework from the NPM module into the .tmp dir for serving.
  admoFramework: {
    files: [{
      expand: true,
      dot: true,
      flatten: false,
      cwd: path.join(__dirname, '../../templates'),
      dest: '.tmp/',
      src: '**'
    }]
  },
  admoIndexFramework: {
    files: [{
      expand: true,
      dot: true,
      flatten: false,
      cwd: path.join(__dirname, '../../templates'),
      dest: '.tmp/',
      src: ['index.html','_framework.html']
    }]
  },
  //Index file is pre-processed so it needs to be copied
  index: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '.tmp',
      src: ['_include.html']
    }]
  },
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: ['_include.html']
    }, {
      expand: true,
      dot: true,
      flatten: false,
      cwd: path.join(__dirname, '../templates'),
      dest: '<%= yeoman.dist %>',
      src: '**'
    }, {
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: [
        '**/*',
      ],
      filter: function(value) {
        //Ignore all video files
        var lowercase = value.toLowerCase();
        var filtered = ['videos', '.webm', 'cms'];
        for (var i in filtered) {
          var value = filtered[i];
          if (lowercase.indexOf(value) !== -1) {
            return false;
          }
        }
        return true;
      }
    }]
  }
}

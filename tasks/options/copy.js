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
    },{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.app %>',
      dest: '.tmp',
      src: ['_include.html']
    }]
  },
  watchAdmoFramework: {
    files: [{
      expand: true,
      dot: true,
      flatten: false,
      cwd: path.join(__dirname, '../../templates'),
      dest: '.tmp/',
      src: ['index.html', '_framework.html']
    }, {
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
      flatten: false,
      cwd: path.join(__dirname, '../../templates'),
      dest: '<%= yeoman.dist %>',
      src: '**'
    }, {
      expand: true,
      dot: true,
      flatten: false,
      cwd: '<%= yeoman.app %>',
      dest: '<%= yeoman.dist %>',
      src: ['**']
    }]
  }
};

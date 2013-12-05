var path = require('path');
module.exports = {
  options: {
    imagesDir: '<%= yeoman.app %>/images',
    javascriptsDir: '<%= yeoman.app %>/scripts',
    relativeAssets: true,
    debugInfo: true
  },
  serverMain: {
    options: {
      specify: ['.tmp/styles/main.scss'],
      sassDir: '.tmp/styles',
      //This allows us to compile the main file first.
      //The main file will include all the others to compile them
      cssDir: '.tmp/styles',
    }
  },
  serverEmulator: {
    options: {
      specify: [path.join(__dirname, '../../templates/emulator/emulator.scss')],
      sassDir: path.join(__dirname, '../../templates/emulator/'),
      cssDir: '.tmp/emulator/',
    }
  },
  serverApp: {
    options: {
      specify: '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/main.scss',
      sassDir: '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/styles/',
      importPath: ['.tmp/styles', '<%= yeoman.app %>/<%= grunt.config("currentApp") %>/components' ],
      cssDir: '.tmp/<%= grunt.config("currentApp") %>/styles/'
    }
  },
  distFramework: {
    options: {
      specify: '<%= yeoman.dist %>/styles/main.scss',
      sassDir: '<%= yeoman.dist %>/styles/',
      importPath: ['<%= yeoman.dist %>/styles'],
      cssDir: '<%= yeoman.dist %>/styles/'
    }
  },
  distApp: {
    options: {
      specify: '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/main.scss',
      sassDir: '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/',
      importPath: ['<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/components' ],
      cssDir: '<%= yeoman.dist %>/<%= grunt.config("currentApp") %>/styles/'
    }
  },
  distEmulator: {
    options: {
      specify: [path.join(__dirname, '../../templates/emulator/emulator.scss')],
      sassDir: path.join(__dirname, '../../templates/emulator/'),
      cssDir: '<%= yeoman.dist %>/emulator/',
    }
  },
};

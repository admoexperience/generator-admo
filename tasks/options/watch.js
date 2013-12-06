var path = require('path');
module.exports = {
  compass: {
    files: ['<%= yeoman.app %>/**/*.{scss,sass}'],
    tasks: ['compass:serverMain','compass:serverApp','compass:serverEmulator']
  },
  emulator:{
    files: [path.join(__dirname, '../../templates/emulator/emulator.scss')],
    tasks: ['compass:serverEmulator','livereload']
  },
  livereload: {
    files: [
      '{.tmp,<%= yeoman.app %>}/<%= grunt.config("currentApp") %>/styles/*.css',
      '{.tmp,<%= yeoman.app %>}/scripts/**/*.js',
      //The config file is handled differently
      '!<%= yeoman.app %>/scripts/libs/admo-config.js',
      '!<%= yeoman.app %>/_include.html',
      '<%= yeoman.app %>/**/*.html',
      '<%= yeoman.app %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    tasks: ['livereload']
  },
  templates:{
    files: ['<%= yeoman.app %>/**/*.tpl'],
    tasks: ['jst:server'],
    options: {
      livereload: true
    }
  },
  admoIndex: {
    files: ['<%= yeoman.app %>/**/_include.html'],
    tasks: ['copy:watchAdmoFramework', 'preprocess:admoIndexLive'],
    options: {
      livereload: true
    }
  },
  admoFramework: {
    files: [
      path.join(__dirname, '../../templates/**'),
      '!**/*/emulator.scss'
    ],
    tasks: ['copy:admoFramework','preprocess:admoConfigLive','preprocess:admoIndexLive'],
    options: {
      livereload: true
    }
  }
};

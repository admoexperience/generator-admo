'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var AdmoGenerator = module.exports = function AdmoGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    //We cant install this yet, since it hasn't been published yet
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AdmoGenerator, yeoman.generators.Base);

AdmoGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'string',
    name: 'appName',
    message: 'What would you like to call this app?',
  }];

  this.prompt(prompts, function (props) {
    this.appName = props.appName;

    cb();
  }.bind(this));
};

AdmoGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/'+this.appName);
  this.mkdir('app/'+this.appName+'/images');
  this.mkdir('app/'+this.appName+'/styles');
  this.mkdir('app/'+this.appName+'/data/');
  this.mkdir('app/'+this.appName+'components');
  this.mkdir('app/'+this.appName+'scripts');

  //Thse folders aren't checked into git
  this.mkdir('cms');
  this.mkdir('dist');

  this.template('_package.json', 'package.json');
  this.template('_app-main.scss', 'app/'+this.appName+'/styles/main.scss');
  this.template('_bower.json', 'bower.json');
  this.template('_app-main.js', 'app/'+this.appName+'/main.js');
  this.copy('include.html', 'app/_include.html');
};

AdmoGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('Gruntfile.js', 'Gruntfile.js');
  this.copy('gitignore', '.gitignore');

};

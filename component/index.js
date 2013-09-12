'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
module.exports = Generator;

function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  if (typeof args[0] === 'string') {
    this.component = args[0];
  }
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.askFor = function askFor() {
  if (this.component) {
    return;
  }

  var cb = this.async();

  this.prompt({
    name: 'component',
    message: 'component?'
  }, function (props) {
    this.component = props.component;

    cb();
  }.bind(this));
};

Generator.prototype.createFiles = function createFiles() {

  //Work out what the app is bassed on the current folder.
  //Not ideal but until we have a .admo properties file this is good enough
  var folders = fs.readdirSync('app');
  var app = null;
  folders.forEach(function(f){
    if (fs.lstatSync('app/'+f).isDirectory()){
      app = f;
    }
  });
  //TODO: fix app pathing.
  this.mkdir('app/'+app+'/components/'+this.component);
  this.write('app/'+app+'/components/'+this.component+'/'+this.component+'.js', '//Fill this with your own file');
  this.write('app/'+app+'/components/'+this.component+'/'+this.component+'.scss', '//Fill this with your own file');
};

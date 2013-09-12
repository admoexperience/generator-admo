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
  var packageJson = fs.readFileSync( "package.json" );
  var app = JSON.parse(packageJson).name;
  this.mkdir('app/'+app+'/components/'+this.component);
  this.write('app/'+app+'/components/'+this.component+'/'+this.component+'.js', '//Fill this with your own file');
  this.write('app/'+app+'/components/'+this.component+'/'+this.component+'.scss', '//Fill this with your own file');
};

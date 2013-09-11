'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

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
  this.mkdir('app/components/'+this.component);
  this.write('app/components/'+this.component+'/'+this.component+'.js', '//Fill this with your own file');
  this.write('app/components/'+this.component+'/'+this.component+'.scss', '//Fill this with your own file');
};
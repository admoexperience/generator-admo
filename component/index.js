'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var fs = require('fs');
var _ = require('yeoman-generator/lib/actions/string')._;
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
  var slug = _.dasherize(this.component);

  var jsFile = app+'/components/'+slug+'/'+slug+'.js';
  var cssFile = slug+'/'+slug+'.scss';
  var folder = 'app/'+app+'/components/'+slug;
  this.mkdir(folder);
  this.template('_component.js', folder + '/' + slug +'.js');
  this.template('_component.scss', folder + '/' + slug +'.scss');
  this.template('_component.tpl', folder + '/' + slug +'.tpl');

  fs.appendFile('app/_include.html', '<script src="'+jsFile + '"></script>\n', function (err) {
    if (err){
      throw err;
    }
    console.log('Appending '+slug+' to _include.html');
  });

  fs.appendFile('app/'+app+'/styles/main.scss', '@import "'+cssFile+'";\n', function (err) {
    if (err){
      throw err;
    }
    console.log('Appending '+slug+' to main.scss');
  });
};

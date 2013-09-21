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
  console.log(this);
  var folder = 'app/'+app+'/components/'+slug;
  this.mkdir(folder);
  var jsFile = folder + '/' + slug +'.js';
  this.template('_component.js', jsFile);
  this.template('_component.scss', folder + '/' + slug +'.scss');

  fs.appendFile('app/_include.html', '<script src="'+jsFile+'"></script>\n', function (err) {
    if (err) throw err;
    console.log('Appending '+slug+' to _include.html');
  });
};

defaultOptions = {
  //namespace: "anotherNameThanJST",      //Default: 'JST'
  prettify: false, //Default: false|true
  amdWrapper: false, //Default: false|true
  templateSettings: {},
  processName: function(filename) {
    console.log(filename);
    //Shortens the file path for the template.
    var list = filename.split('/'); //not sure if windows uses /
    var name = list[list.length-1];
    var upperClean = name.replace('.tpl','');
    return upperClean;
  }
}

module.exports = {
  server: {
    options: defaultOptions,
    files: {
      ".tmp/scripts/component-templates.js": ["<%= yeoman.app %>/**/*.tpl"]
    }
  },
  dist: {
    options: defaultOptions,
    files: {
      "<%= yeoman.dist %>/scripts/component-templates.js": ["<%= yeoman.app %>/**/*.tpl"]
    }
  }
}

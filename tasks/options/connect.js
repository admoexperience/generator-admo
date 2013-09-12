module.exports = {
  options: {
    port: 9000,
    // Change this to '0.0.0.0' to access the server from outside.
    hostname: '0.0.0.0'
  },
  livereload: {
    options: {
      middleware: function(connect) {
        var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
        var mountFolder = function (connect, dir) {
          return connect.static(require('path').resolve(dir));
        };
        return [
          lrSnippet,
          mountFolder(connect, 'cms'),
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'app')
        ];
      }
    }
  },
  test: {
    options: {
      port: 9001,
      middleware: function(connect) {
        return [
          mountFolder(connect, '.tmp'),
          mountFolder(connect, 'test')
        ];
      }
    }
  }
}


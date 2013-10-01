module.exports = {
  admoConfigLive : {
    src : '.tmp/scripts/libs/admo-config.js',
    dest: '.tmp/scripts/libs/admo-config.js'
  },
  admoIndexLive : {
    src : '.tmp/index.html',
    dest: '.tmp/index.html'
  },
  admoConfigDist : {
    src : '<%= yeoman.dist %>/scripts/libs/admo-config.js',
    dest: '<%= yeoman.dist %>/scripts/libs/admo-config.js'
  },
  admoIndexDist : {
    src : '<%= yeoman.dist %>/index.html',
    dest: '<%= yeoman.dist %>/index.html'
  }
};

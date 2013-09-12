module.exports = {
  main: {
    options: {
      archive: 'dist-<%= grunt.config("currentApp") %>.pod.zip'
    },
    files: [{
      expand: true,
      src: "**/*",
      cwd: "dist/"
    }]
  }
}

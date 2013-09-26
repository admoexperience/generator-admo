module.exports = {
  options: {
    // Shared options hash.
    BUGSNAG_API_KEY: '3f44cc38e81c599ebf780eb2bb4b4c7d',
    GIT_COMMIT: '<%= grunt.config("GIT_COMMIT") || "not set" %>',
    CURRENT_APP: '<%= grunt.config("currentApp") %>',
    ENVIRONMENT: '<%= grunt.config("currentEnvironment") || "development" %>',
    POD_COMPILE_DATE: new Date()
  },
  setEnv: {

  }
};

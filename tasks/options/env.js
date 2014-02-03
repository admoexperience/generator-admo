module.exports = {
  options: {
    // Shared options hash.
    BUGSNAG_API_KEY: '',
    GIT_COMMIT: '<%= grunt.config("GIT_COMMIT") || "not set" %>',
    CURRENT_APP: '<%= grunt.config("currentApp") %>',
    ENVIRONMENT: '<%= grunt.config("currentEnvironment") || "development" %>',
    POD_COMPILE_DATE: new Date()
  },
  setEnv: {

  }
};

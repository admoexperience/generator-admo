AdmoConfig = BaseObject.create({
  //david
    screenWidth: 1920.0,
    screenHeight:1080.0,

    videoWidth: 1280,
    videoHeight: 720,

    kinectWidth:640.0,
    kinectHeight: 480.0,
    //These are defaults for dev env.
    //they are overriden from values from the CMS

    cmsConfig: {
      apiKey: 'api_key',
      cmsUri: 'http://localhost:3002/api/v1/unit/',
      hostName: 'unknown',
      //TODO: Fix bug on c# that doesnt' encode strings correctly
      mixpanel_api_key: 'notset' //not set by default, mixpanel needs it to be there
    },
    //DO NOT SET THESE VALUES.
    //They come from the build env and are dynamic so need to be generated.
    env: '/* @echo ENVIRONMENT */',
    gitCommit: '/* @echo GIT_COMMIT */',
    bugsnagApi: '/* @echo BUGSNAG_API_KEY */',
    currentApp: '/* @echo CURRENT_APP */',
    podCompileDate: '/* @echo POD_COMPILE_DATE */',

    //@deprecated use the value from the CMS first.
    mixpanelApi: '/* @echo MIXPANEL_API_KEY */',

    isProd: function(){
      return this.env == 'production';
    }
});

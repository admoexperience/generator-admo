// ****************************************** //
//                    App                     //
// ****************************************** //
window.AdmoApp = BaseObject.create({
  Screens: {},
  kinectOn: true,
  //Used to store the reference to the $scope
  //@deprecated! do not use
  angularScope: null,

  currentState: 1,
  currentScreen: null,
  defaultScreen: null,
  globalComponents:null,

  switchingScreens: false,

  setScreen: function(newScreen) {
    // Ignore if there is no change, or if a transition is in progress
    if (this.switchingScreens || (newScreen == this.currentScreen))
      return;
    this.switchingScreens = true;

    console.log('Switched screen: ' + newScreen);

    var delay = 0;
    if (this.currentScreen) {
      this.currentScreen._hidden();
      delay = this.currentScreen.transition
    }

    this.currentScreen = newScreen;
    this.currentScreen._init();
    window.setTimeout(this.showScreen, delay);
  },

  setGlobalComponents: function(gc){
    console.log(gc);
    this.globalComponents = gc;
    this.globalComponents._init();
    $('#global-components').html(this.globalComponents._getHtml());
    this.globalComponents._shown();
  },

  showScreen: function() {
    if(!this.currentScreen) return;
    //Can't use addclass or set class because it changes over time.
    $('#screen').attr("class",this.currentScreen.getCss());
    $('#screen').html(this.currentScreen._getHtml());
    this.currentScreen._shown();
    this.switchingScreens = false;
  },
  reload: function(data){
    //Force reload the browser even if there is some one in view.
    window.location.reload(true);
  },

  setState: function(newState) {
    if (newState != this.currentState) {
      var oldState = this.currentState;
      // More stuff could happen here...
      this.currentState = newState;
      this.stateChanged(oldState, newState);
      console.log('switched state from : '+ oldState +' to ' + newState);
    }
  },

  stateChanged: function(oldState,newState) {

  },

  handleConfig: function(config){
    AdmoConfig.cmsConfig = config;
    //Can't include the hostname at appstart up since we wont know it then
    console.log("Updating config to",AdmoConfig.cmsConfig);
    Bugsnag.metaData.unit.name = AdmoConfig.cmsConfig.name;
  },

  /*
    1 No body is in view
    2 Some thing is in view  - detect head
    3 locked on user standing in center of connect
  */
  sendData: 1,
  //handles WS message
  handleGesture: function(message) {
    if (this.sendData % 200 == 0){
      console.log("Kinect data being sent from kinect");
      console.log(message);
    }
    this.sendData = this.sendData +1;
    if (true) {
      //Set the kinect data to the raw values from the kinect
      for(var key in message){
        KinectState[key] = message[key];
      }

      if (this.currentState == 1){
        //We don't have any person data yet.
      }else if (this.currentState == 2){
        var h = KinectState.head;
        User.updateObj(User.head,h.x,h.y,h.z, h.xmm, h.ymm);
      }
      else if (this.currentState == 3)
      {
        var h = KinectState.head;
        var l = KinectState.leftHand;
        var r = KinectState.rightHand;
        var el = KinectState.leftElbow;
        var er = KinectState.rightElbow;
        User.updateObj(User.head,h.x,h.y,h.z, h.xmm, h.ymm);

        User.updateObj(User.hands.left, l.x,l.y,l.z, l.xmm, l.ymm);
        User.updateObj(User.hands.right, r.x,r.y,r.z, r.xmm, r.ymm);

        User.updateObj(User.elbows.left, el.x, el.y, el.z, el.xmm, el.ymm);
        User.updateObj(User.elbows.right, er.x, er.y, er.z, er.xmm, er.ymm);
      }
      //Tell the app the state has changed
      this.setState(KinectState.phase);
    }
  },

  handleSwipe: function(message, forced) {
    console.log(message);
    this.swipeGesture(message);
  },

  swipeGesture: function(gesture) {
    //Apps should implement this method is they would like to recieve swipeEvents
  },

  handleImageFrame: function(message) {
    this.imageFrame(message);
  },

  imageFrame: function(message){

  },

  initAnimationLoop: function() {
    if(this.currentScreen){
        this.currentScreen._update();
    }
    if (this.globalComponents){
      this.globalComponents._update();
    }
    if(window.requestAnimationFrame)
      window.requestAnimationFrame(AdmoApp.initAnimationLoop);
  },

  toggleKinect: function(state) {
    this.kinectOn = state;
  },
  initWebsockets: function() {
    //Only start it once
    console.log("Starting web socket client");
    AdmoApp.WebSocket.Start();
  },
  initBugsnag: function(){
    Bugsnag.apiKey = AdmoConfig.bugsnagApi;
    Bugsnag.releaseStage = AdmoConfig.env;
    Bugsnag.metaData = {
      unit:{
        //Can't include the hostname at appstart up since we wont know it now.
        //See handleConfig
        hostname: AdmoConfig.cmsConfig.hostname,
        gitCommit: AdmoConfig.gitCommit,
        currentApp: AdmoConfig.currentApp,
        podCompileDate: AdmoConfig.podCompileDate
      }
    };
    //For emulator debugging, Should not be needed in production mode.
    //Also errors are not posted to bugsnag in development mode.
    if(window.parent){
      window.parent.onerror = window.onerror;
    }
  },

  initDebug: function() {
    // Track mouse as proxy for hand in debug screen
    if (window.parent && window.parent.setMousePosition) {
      $('body').on('mousemove', function(e) {

        //Translate the screen values into something we get back from the kinect
        var x = Math.round((e.pageX - KinectState.offsetX) / KinectState.scaleCanvas);
        var y = Math.round((e.pageY - KinectState.offsetY) / KinectState.scaleCanvas);
        window.parent.setMousePosition(x, y);
      });
    }
  },

  initStats: function(){
    Stats.init(AdmoConfig.currentApp);
  },

  //Adds a script to the dom for use.
  //This allows applications to arbilitary include custom JS and data files
  //AdmoApp.addJavaScript('apps/$appname/data/menu4.js');
  addJavaScript: function(path){
    var script = document.createElement( 'script' );
    script.type = 'text/javascript';
    script.src = path;
    $("head").append( script );
  },

  //Adds a css to the dom for use.
  //This allows applications to arbilitary include custom css a
  addCss: function(path){
    $('head').append('<link rel="stylesheet" href="'+path+'" type="text/css" />');
  },

  initApp: function(){
    this.addCss('/'+AdmoConfig.currentApp+'/styles/main.css');
    this.addJavaScript('/'+AdmoConfig.currentApp+'/main.js');
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['admoWebuiApp']);
    });
  },

  init: function() {
    this.initBugsnag();
    this.initDebug();
    this.initWebsockets();
    this.initStats();
    this.setState(this.currentState);
    this.initAnimationLoop();
  }
});

AdmoApp.initApp();

/*
//Can be enabled to work out where we are using legacy animate. Should be added back in devy mode.
(function($){

  var _animate = $.fn.animate;


  $.fn.animate = function(){
       function getErrorObject(){
          try { throw Error('') } catch(err) { return err; }
      }

      var err = getErrorObject();
      var caller_line = err.stack.split("\n")[4];
      var index = caller_line.indexOf("at ");
      var clean = caller_line.slice(index+2, caller_line.length);
      console.error("Use of legacy Jquery.animate" + caller_line);
      return _animate.apply( this, arguments );
  };
})(jQuery);
*/

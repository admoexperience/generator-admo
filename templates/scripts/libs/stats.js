/**
* Stats module used to wrap all stats calls so if we choose to switch out mixpanel we can
*/
Stats = BaseObject.create({

  startTime:null,
  hostName:null,
  logStats: false,
  inited:false,

  init: function(appName, apiKey){
    //We can only init once :/

    //TODO: fix this.
    if(this.inited) return;
    this.logStats = AdmoConfig.isProd() && apiKey;
    window.mixpanel.init(apiKey);
    window.mixpanel.set_config({
      debug: true,
      test: true,
      verbose: 1,
      //we don't have page views in our app
      track_pageview:false,
    });
    this.setApp(appName);
    //Events get assigned to random people if not tied to a user
    window.mixpanel.identify(UUID.create());
    this.inited = true;
  },

  getUUID: function(){
    return window.mixpanel.get_distinct_id();
  },

  setApp: function(appName){
    window.mixpanel.register({appName:appName});
  },

  setHost: function(hostName){
    this.hostName=hostName;
    window.mixpanel.register({hostName:hostName});
  },
  track: function(event, properties){
    if(this.logStats){
      window.mixpanel.track(event,properties);
    }else {
      console.log("Would be logging "+event);
      console.log(properties);
    }
  },

  startSession: function(){
    this.startTime = new Date();
    //Stats.track('startSession');
  },

  endSession:function(){
    var endTime = new Date();
    console.log(this.startTime);
    console.log(endTime);
    var timeInSeconds = Math.floor((endTime - this.startTime)/1000);
    console.log(timeInSeconds);
    if(this.startTime){
      this.track('endSession',{timeInSeconds:timeInSeconds});
    }
    this.startTime= null;
    var uuid = UUID.create();
    console.log("Changing user from "+ window.mixpanel.get_distinct_id()+" to "+ uuid);
    //Reset it back to random
    window.mixpanel.identify(UUID.create());
  }
});

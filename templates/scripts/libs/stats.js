/**
* Stats module used to wrap all stats calls so if we choose to switch out mixpanel we can
*/
Stats = BaseObject.create({

  startTime:null,
  logStats: false,
  inited:false,
  _properties:{

  },

  init: function(appName){
    //We can only init once :/
    //TODO: fix this.
    if(this.inited) return;
    this.logStats = AdmoConfig.isProd() && apiKey;
    this.setApp(appName);
    //Events get assigned to random people if not tied to a user
    this.identify(UUID.create());
    this.inited = true;
  },
  identify: function(uuid){
    this._properties['distinct_id'] = uuid;
  },

  getIdentity: function(){
    return this._properties['distinct_id'];
  },

  setApp: function(appName){
    this._properties['appName'] = appName;
  },

  setHost: function(unitName){
    this.setUnitName(unitName)

  },
  setUnitName: function(unitName){
    this._properties['unitName'] = unitName;
  },

  track: function(event, properties){

    var props = AdmoApp.Utils.mergeObjects(this._properties,properties || {});
    //Time needs to be when the event was logged
    props.time = AdmoApp.Utils.unixEpochTime();

    var loggingEvent = {type: 'trackAnalytics', data: {
          name: event,
          properties: props
      }
    };
    if(this.logStats){
      AdmoApp.WebSocket.Send(loggingEvent);
      //TODO: Track events via websocks
      console.log("Stats.record.real: ",event,props);
    }else {
      console.log("Stats.record: ",event,props);
    }
  },

  startSession: function(){
    this.startTime = new Date();
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
    console.log("Changing user from "+ this.getIdentity()+" to "+ uuid);
    //Reset it back to random
    this.identify(uuid);
  }
});

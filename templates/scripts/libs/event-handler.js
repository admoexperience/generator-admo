window.AdmoApp.EventHandler = BaseObject.create({
  _events:{
    kinectState: function (eventData){
      AdmoApp.handleGesture(eventData);
    },
    swipeGesture: function (eventData){
      AdmoApp.handleSwipe(eventData);
    },
    config: function(eventData){
      AdmoApp.handleConfig(eventData);
    },
    reload: function(eventData){
      AdmoApp.reload(eventData);
    },
    userImage:function(eventData){
      AdmoApp.handleImageFrame(eventData);
    }
  },
  handleEvent: function(type,eventData){
    if(type in this._events){
      this._events[type](eventData);
    }else{
      console.log("unable to proccess event from server");
      console.log(type,eventData);
    }
  }
});

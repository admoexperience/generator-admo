var serverOverride = null;
// Set up the Alchemy client object
//var serverOverride = "10.20.0.161"; // David vm
//var serverOverride = "10.10.10.64"; // Admo-room
//Set this value to make the framework connect to another IP address


AlchemyServer = new Alchemy({
    Server: serverOverride || "localhost",
    Port:1080,
    SocketType: Alchemy.prototype.SocketTypes.WebSocket,
    Action: "doesntmatter",
    DebugMode: false
});

AlchemyServer.Connected = function(){
    console.log("connected");
    //Send a keep alive to the C# server every 4 seconds
    var alive = {type:'alive'};
    setInterval(function(){
      console.log("Sending alive ping");
      AlchemyServer.Send(alive);

    },4000);

    //The server isn't actually connected here. So we fake waiting a while.
    //This needs to be fixed some how.
    //TODO: Fix this is a hack
    setTimeout(function(){
      AlchemyServer.Send({type:'config'})
    },500);

};
AlchemyServer.Disconnected = function(){
    console.log("disconnected");
};

AlchemyServer.MessageReceived = function(event){
  //console.log(event);
   try{
        var eventData = JSON.parse(event.data);
        switch(eventData.type){
          case 'kinectState':
            AdmoApp.handleGesture(eventData.data);
            break;
          case 'swipeGesture':
            AdmoApp.handleSwipe(eventData.data);
            break;
          case 'config':
            AdmoApp.handleConfig(eventData.data);
            break;
          case 'reload':
            AdmoApp.reload(eventData.data);
            break;
          default:
            console.log("unable to proccess event from server");
            console.log(eventData);
            break;
        }

    }catch(exception){
        console.log("Unable to handle event data");
        console.log(exception);
        console.log(event);
    }
};
var serverOverride = null;
// Set up the Alchemy client object
var serverOverride = "10.20.0.148"; // David vm
//var serverOverride = "10.10.10.64"; // Admo-room
//Set this value to make the framework connect to another IP address


AdmoApp.WebSocket = new Alchemy({
    Server: serverOverride || "localhost",
    Port:1080,
    SocketType: Alchemy.prototype.SocketTypes.WebSocket,
    Action: "doesntmatter",
    DebugMode: false
});

AdmoApp.WebSocket.Connected = function(){
    console.log("connected");
    //Send a keep alive to the C# server every 4 seconds
    var alive = {type:'alive'};
    setInterval(function(){
      console.log("Sending alive ping");
      AdmoApp.WebSocket.Send(alive);
    },4000);

    //The server isn't actually connected here. So we fake waiting a while.
    //This needs to be fixed some how.
    //TODO: Fix this is a hack
    setTimeout(function(){
      AdmoApp.WebSocket.Send({type:'config'})
    },500);

};
AdmoApp.WebSocket.Disconnected = function(){
    console.log("disconnected");
};

AdmoApp.WebSocket.MessageReceived = function(event){
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

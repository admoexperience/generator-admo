//*****************************************************************
// Static html text that can be added to a screen and positioned as needed.
//*****************************************************************

VideoFeed = Component.create({
  html: function(){
    return '<video id="video"></video>';
  },
  shown:function(){
    this.video = document.getElementById("video");
    var videoObj = { "video": { "mandatory": { "minWidth": "1280", "minHeight": "720" } }};

    var errBack = function(error) {
        console.log("Video capture error: ", error.code);
    };

    // Put video listeners into place. Assume webkit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      this.video.src = window.webkitURL.createObjectURL(stream);
      this.video.play();
    }, errBack);
  }
});

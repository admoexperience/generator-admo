//*****************************************************************
// Static html text that can be added to a screen and positioned as needed.
//*****************************************************************

VideoFeed = Component.create({
  //Raw document video feed element
  videoRaw: null,
  //Jquery element of the video sub element
  video: null,
  html: function(){
    return '<video></video>';
  },
  shown:function(){
    this.videoRaw = this.subElm('video').get()[0];
    this.video = this.subElm('video');
    var videoObj = { "video": { "mandatory": { "minWidth": "1280", "minHeight": "720" } }};

    var errBack = function(error) {
        console.log("Video capture error: ", error.code);
    };
    var self = this;
    // Put video listeners into place. Assume webkit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      self.videoRaw.src = window.webkitURL.createObjectURL(stream);
      self.videoRaw.play();
    }, errBack);
  }
});

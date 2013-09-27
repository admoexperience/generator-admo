//*****************************************************************
// Static html text that can be added to a screen and positioned as needed.
//*****************************************************************

VideoFeed = Component.create({
  //Raw document video feed element
  videoRaw: null,
  //Jquery element of the video sub element
  video: null,
  minWidth: "1280",
  minHeight: "720",
  css: 'video-feed',
  html: function() {
    return '<video></video>';
  },
  shown: function() {
    this.videoRaw = this.subElm('video').get()[0];
    this.video = this.subElm('video');
    var videoObj = {
      "video": {
        "mandatory": {
          "minWidth": this.minWidth,
          "minHeight": this.minHeight
        }
      }
    };

    var errBack = function(error) {
      console.log("Video capture error: ", error.code);
    };
    var successBack = function(stream) {
      self.videoRaw.src = window.webkitURL.createObjectURL(stream);
      self.videoRaw.play();
    };
    var self = this;
    // Put video listeners into place. Assume webkit-prefixed
    navigator.webkitGetUserMedia(videoObj, successBack, errBack);
  }
});

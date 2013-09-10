KinectState = {

  SEARCHING:1,
  FOUND:2,
  LOCKED_ON:3,

  phase: this.SEARCHING,
  scaleCanvas: AdmoConfig.screenHeight / AdmoConfig.kinectHeight,

  //useable screen space starts on 240
  offsetX: 240,
  offsetY: 0,

  handState: null,

  head:{
    x:0,
    y:0,
    z:0
  },

  leftHand:{
    x:0,
    y:0,
    z:0
  },

  rightHand: {
    x:0,
    y:0,
    z:0
  },

  face: {
    x:0,
    y:0,
    z:0
  }
};

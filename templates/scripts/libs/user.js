//*****************************************************************
// An object that stores up-to-date co-ordinates of the user's hands and head.
//*****************************************************************
User = {

  head: {x: null, y: null, screen: {}},
  hands: {left: {x: null, y: null, screen: {}}, right: {x: null, y: null, screen: {}}},

  updateObj: function(obj, newX, newY, newZ) {
    obj.rawX = parseFloat(newX);
    obj.rawY = parseFloat(newY);
    obj.rawZ = parseFloat(newZ);


    //Converts the kinect values into something that maps to the screen
    var converedX =  Math.round(obj.rawX * KinectState.scaleCanvas + KinectState.offsetX);
    var converedY =  Math.round(obj.rawY * KinectState.scaleCanvas + KinectState.offsetY);

    obj.x = converedX;
    obj.y = converedY;
    obj.z = obj.rawZ;
  },
};

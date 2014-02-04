 KinectState = {
  handState: "released",
  phase:3,
  head:{
    x:300,
    y:135,
    z:1400
  },

  leftHand:{
    x:250,
    y:300,
    z:1400
  },

  rightHand: {
    x:350,
    y:300,
    z:1400
  },
/*
  since it is not really possible to set the elbow variables in the emulator, we
  just use values for where the elbow is most likely to be when the user is standing in
  the middle of the screen
*/
  leftElbow: {
    x:200,
    y:300,
    z:0
  },

  rightElbow: {
    x:440,
    y:300,
    z:0
  },

  face: {
    x:0,
    y:0,
  }
};

//optimal position of user on z-axis measured in mm
var zOptimalDistance = 1400;
//minimum and maximum distances of user on z-axis measured in mm
var zMinimumDistance = 400;
var zMaximumDistance = 3000;

var Storage = {
  set: function(key, value) {
    if (!key || !value) {return;}

    if (typeof value == "object") {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  },
  get: function(key) {
    var value = localStorage.getItem(key);

    if (!value) {return;}

    // assume it is an object that has been stringified
    if (value[0] == "{") {
      value = JSON.parse(value);
    }

    return value;
  }
}

// Change iframe's target

var Admo = null;
var mouse = "right";
var mouseX;
var mouseY;

var shortcutsActive = true;

function getAdmo() {
  if (!Admo)
    Admo = window.frames[0].AdmoApp;
}

function setKinect() {
  $('.phase.active').removeClass('active'); // Deactivate previous button
  $('#kinect').addClass('active'); // Activate new button
  KinectState.phase = 0;
  Admo.toggleKinect(true);
}

function setPhase(newPhase) {
  KinectState.phase = newPhase;
  Storage.set('phase',newPhase);
  Admo.toggleKinect(false);
  $('.phase.active, #kinect').removeClass('active'); // Deactivate previous button
  $('#phase-'+newPhase).addClass('active'); // Activate new button
  setGesture();
  sendData();
}

function swipeRight(){
  console.log('Swipe right');
  Admo.swipeGesture('SwipeToRight');
}

function swipeLeft(){
  console.log('Swipe left');
  Admo.swipeGesture('SwipeToLeft');
}

function setGesture() {
  if (mouseX && mouseY) {
    if (mouse == 'head') {
      KinectState.head.x = mouseX;
      KinectState.head.y = mouseY;
    } else if (mouse == 'left') {
      KinectState.leftHand.x = mouseX;
      KinectState.leftHand.y = mouseY;
    } else if (mouse == 'right') {
      KinectState.rightHand.x = mouseX;
      KinectState.rightHand.y = mouseY;
    }
  }
  $('#kinect-data').html('<pre>'+JSON.stringify(KinectState,null,4)+'</pre>');
}

function setMousePosition(newX, newY) {
  mouseX = newX;
  mouseY = newY;
  setGesture();
}

function sendData() {
  if (KinectState.phase  != 0){
     Admo.EventHandler.handleEvent('kinectState', KinectState);
  }
}

function setHead() {
  $('#head').addClass('active');
  $('#left-hand').removeClass('active');
  $('#right-hand').removeClass('active');
  mouse = 'head';
  Storage.set('mouse',mouse);
}

function setLeft() {
  $('#head').removeClass('active');
  $('#left-hand').addClass('active');
  $('#right-hand').removeClass('active');
  mouse = 'left';
  Storage.set('mouse',mouse);
}

function setRight() {
  $('#head').removeClass('active');
  $('#left-hand').removeClass('active');
  $('#right-hand').addClass('active');
  mouse = 'right';
  Storage.set('mouse',mouse);
}

function setMouse(mouseStuff){
  var options = {
    left: setLeft,
    right: setRight,
    head: setHead
  }
  console.log("Setting mouse to "+ mouseStuff)
  options[mouseStuff]();
  sendData();
}

function editDepth() {
  $('#show-depth').hide();
  $('#edit-depth').show();
  $('#depth-input').val(KinectState.head.z);
  $('#depth-input').focus().select();
  shortcutsActive = false;
}

function showDepth() {
  $('#show-depth').show();
  $('#edit-depth').hide();
  shortcutsActive = true;
}

function setDepth() {
  var temp = parseInt(document.getElementById("depth-input").value);

  if((temp > zMinimumDistance) && (temp < zMaximumDistance)){

    KinectState.leftHand.z = temp;
    KinectState.rightHand.z = temp;
    KinectState.head.z = temp;

    console.log("Depth set to :" + temp);

    $('#show-depth').text('Depth: ' + temp + 'mm');
    showDepth();
  }

}

function toggleSelectScreen() {
  $('#select-screen').toggle();
}

function changeScreen(key) {
  console.log(key);
  Storage.set('currentScreen',key);
  Admo.setScreen(Admo.Screens[key]);

  $('#current-screen .text').text(Admo.Utils.dashize(key));
  $('#select-screen').hide();
}

var shortcutsVisible = false;
function toggleShortcuts() {
  if (shortcutsVisible) {
    $('#shortcut-screen').fadeOut();
    shortcutsVisible = false;
  } else {
    $('#shortcut-screen').fadeIn();
    shortcutsVisible = true;
  }
}

var helpVisible = false;
function toggleHelp() {
  if (helpVisible) {
    $('#help-screen').fadeOut();
    helpVisible = false;
  } else {
    $('#help-screen').fadeIn();
    helpVisible = true;
  }
}


$(function () {
  $(document).keyup(function(evt) {
    if (evt.keyCode == 32) {
      hand_state = "released";
    }
  }).keydown(function(evt) {
    if (evt.keyCode == 32) {
      hand_state = "gripped";
    }
  });


  // Update depth display
  depth = KinectState.head.z;
  KinectState.leftHand.z = depth;
  KinectState.rightHand.z = depth;
  KinectState.head.z = depth;
  $('#show-depth').text('Depth: ' + depth + 'mm');



  // Hacked delay to let the child frame finish loading
   $('#iframe').load(function(){
    var helpDisplayed =  Storage.get('helpDisplayed');
    if(!helpDisplayed){
      Storage.set('helpDisplayed',new Date());
      toggleHelp();
    }


    console.log('laod the iframe');
    getAdmo();
    var phase = Storage.get('phase') || 1;
    setPhase(phase);
    mouse = Storage.get('mouse') || 'right';
    setMouse(mouse);

    window.setInterval(sendData, 30);
    //TODO: Post event rather.
    window.setTimeout(function(){
      var currentScreen =  Storage.get('currentScreen');

      for(var key in Admo.Screens){
         var screen = Admo.Screens[key];

         var x = $('<div>');
         x.text(Admo.Utils.dashize(key));
         x.data('key', key);
         if (key == currentScreen)
          x.addClass('active');
         x.on('click', function() {
            var key = $(this).data('key');
            changeScreen(key);
         });
         x.appendTo('#select-screen');
      }
      if(currentScreen && Admo.Screens[currentScreen]){
        changeScreen(currentScreen);
      }
    }, 400);
  });

  //Keyboard Shortcuts
  $(document).on('keydown', function(event) {
    if (shortcutsActive) {
      if (event.keyCode == 49) // '1'
        setHead();
      else if (event.keyCode == 50) // '2'
        setLeft();
      else if (event.keyCode == 51) // '3'
        setRight();
      else if (event.keyCode == 37) // Left
        swipeLeft();
      else if (event.keyCode == 39) // Right
        swipeRight();

    } else {
      if (event.keyCode == 13) // Enter – submit depth input field
        setDepth()
    }
  })
});

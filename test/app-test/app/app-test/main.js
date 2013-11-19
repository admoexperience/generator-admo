'use strict';

//AdmoApp.addJavaScript('app-test/data/data.json');

AdmoApp.MainCtrl = function($scope) {

    //Global components that are shared across screens.
    //Careful care should be made to ONLY use these as needed
    //Generally this should only be used for consistent background elements
    var videoFeed = VideoFeed.create();

    var globalComponents = GlobalComponents.create({
      components:[videoFeed]
    });

    var handLeft = HighlightSource.create({
      extraCss: 'left',
      source:User.hands.left,
      active:false,
      turnOn:true,
    });

    var handRight = HighlightSource.create({
      extraCss: 'right',
      source:User.hands.right,
      active:false,
      turnOn:true,
    });

    var head = HighlightSource.create({
      extraCss: 'head',
      source:User.head,
      active:false,
      turnOn:true,
    });

    var staticHtml = StaticHtml.createHtml('<div>Replace me</div>');

    AdmoApp.Screens.demoScreen = Screen.create({
      components:[handRight,handLeft,head],
      shown: function(){
        //Stats.track('demoScreen');
      }
    });

    /**********STATE SCREEN HANDLER***************/

    AdmoApp.stateChanged = function(oldState, newState) {
      if( oldState == 3 && (newState==2 || newState==1)){
        AdmoApp.setScreen(AdmoApp.Screens.demoScreen);
      }

      if (oldState == 3 && newState != 3){
        //User has gone out of view stop the users session
         Stats.endSession();
      }
    };

    /**********STATE SCREEN HANDLER***************/
    AdmoApp.setGlobalComponents(globalComponents);

    AdmoApp.init();

    //Init the AdmoApp
    AdmoApp.angularScope = $scope;

    //Set the default screen for the app (ie the starting screen.)
    AdmoApp.setScreen(AdmoApp.Screens.demoScreen);

};

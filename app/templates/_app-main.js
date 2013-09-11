'use strict';

//AdmoApp.addJavaScript('<%= _.slugify(appName) %>/data/data.json');

AdmoApp.MainCtrl = function($scope) {

    var staticHtml = StaticHtml.createHtml('<div style="width: 500px; height: 500px; top: 10px;left: 10px;background-color: #FF0000;z-index: 500;">Replace me</div>');

    AdmoApp.Screens.demoScreen = Screen.create({
      components:[staticHtml],
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


    AdmoApp.init();

    //Init the AdmoApp
    AdmoApp.angularScope = $scope;

    //Set the default screen for the app (ie the starting screen.)
    AdmoApp.setScreen(AdmoApp.Screens.demoScreen);

};

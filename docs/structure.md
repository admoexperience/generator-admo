#Structure

##File layout


|FileName| Info                  |
|--------|-----------------------|
|`_include.html`|Contents are injected into the head of the html page. Should place all script includes (or any other external dependancies)|
|`$app/main.js`|The main entry point into the app. And the `AdmoApp.MainCtrl` is similar to the main method in Java. This is executed on app start up|
|`cms/`|Folder is used to super impose content data in the app, pod/current + pod/override == content that is actually served|
|`componets/`|Location of all the components this app uses|
|`styles/main.scss/`|Main scss entry point for the application. Components folder is included in default include path. eg `@import "two-menu/two-menu.scss";` |


 
 
### Include.html
Contents should be simple include tags. Although any thing could be injected in.
Resources should ideally be local, but in the case of an external dependency ie google API's you can include them here.

    <!-- Put your custom js/css includes in here -->
    <script src="appname/scripts/raphael-min.js"></script>
    <script src="appname/scripts/tween-min.js"></script>

### Main.js


#### Components 
Components are self contained folders that are composed of. `CSS`, `Javascript` and `Html` (template).

|FileName| Info                  |
|-------------------|-----------------------|
|`$component.js`|Components logic and event handlers|
|`$component.scss`|Styling for a component defines how it should look, and exposes public variables such as colours and images|
|`$component.tpl`|HTML mark up|
|||

Components should never reference any other component it did not directly creat. To do this Components should expose an variable/function for explicitly linking them together.

###### Subcomponents 
Subcomponents are components embeded in side another component, Think of `MenuItems` on a `Menu`. They can be accessed via the `this.addComponent` function

#### Screen 

Screens are a collection of Components that should be displayed together. There is obviously a fine line between where one screen ends and another starts but this is up to the coder.

Once a screen is switched using `AdmoApp.setScreen($screen)` function. All components currently visible will call `.hidden()` after which they 

##### GlobalComponents 

These are an extension of a `screen` except they are maintain across screens; and are never removed from the dom. E.g. `VideoFeed` `Silhouette` 

#### Sample layout 

    <div id="app">
      <div id="global-components"></div>
      <div id="screen" class="carousel-screen"></div>
    </div>


##### Event handlers 

* AdmoApp.stateChanged
* AdmoApp.swipeGesture 
* AdmoApp.imageFrame

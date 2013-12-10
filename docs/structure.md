#Structure

##File layout


|FileName| Info                  |
|--------|-----------------------|
|`_include.html`|Contents are injected into the head of the html page. All script includes (or other external dependencies) should go here|
|`$app/main.js`|The main entry point into the app. The AdmoApp.MainCtrl is the primary function (similar to the main method in Java). This is executed on app start up|
|`cms/`|Folder is used to superimpose content data in the app. `pod/current` + `pod/override`contain the content that is actually served|
|`components/`|Location of all the components this app uses|
|`styles/main.scss/`|Main scss entry point for the application. Components folder is included in default include path. eg `@import "two-menu/two-menu.scss";` |


 
 
### Include.html
Contents should be simple include tags, although anything could injected in.
Resources should ideally be local, but in the case of an external dependency, e.g. Google's APIs, you can include them here.

    <!-- Put your custom js/css includes in here -->
    <script src="appname/scripts/raphael-min.js"></script>
    <script src="appname/scripts/tween-min.js"></script>

### Main.js


#### Components 
Components are self contained folders that are composed of sass, Javascript and Html.

|FileName| Info                  |
|-------------------|-----------------------|
|`$component.js`|Component's logic and event handlers|
|`$component.scss`|Styling for a component defines how it should look, and exposes public variables such as colours and images|
|`$component.tpl`|HTML mark up|
|||

Components should never reference any other component it did not directly create. To do this Components should expose an variable/function for explicitly linking them together.

e.g.

	var menu = Component.create({
		linkedComponent: menuItem,
		//Called when a menu item is selected
		callback: function(selection){ 
		}		
	});

###### Subcomponents 
Subcomponents are components embeded in side another component, e.g. `MenuItems` on a `Menu`. They can be accessed via the `this.addComponent` function

#### Screen 

Screens are a collection of Components that should be displayed together. There is obviously a fine line between where one screen ends and another starts but this is up to the coder.

Once a screen is switched using `AdmoApp.setScreen($screen)` function, all components currently visible will call `.hidden()` after which they are removed from the dom.

##### GlobalComponents 

These are an extension of a `screen` except theyare maintained across screens; hence they are never removed E.g. `VideoFeed` `Silhouette` 

#### Sample layout 

    <div id="app">
      <div id="global-components"></div>
      <div id="screen" class="carousel-screen"></div>
    </div>


##### Event handlers 

* AdmoApp.stateChanged
* AdmoApp.swipeGesture 
* AdmoApp.imageFrame

#Components 

There are 2 types currently `Component` and `Tracker` they both serve slightly different purposes use the correct one for the job.

It is important to know that `Tracker` is an instance of `Component` so any thing avlible in `Componet` will be avalible in `Tracker` but not the other way around.

##Component
This is the base component and contains all the basic helper functions that should be used.

##Variables
Here are a couple of useful varibles that should be presetup in each of your methods.

###this.id
Unique ID value to reference the html element in the DOM, should not be set by default unless an app would like to set this per componet to allow for custom styling on a per screen basis.


###this.element
Used to reference the component's html value this is equal to doing `$('#'+this.id)` but is cached and allows you write neater faster code. Currently available in the `update` and `shown` methods. 


##Functions
Ingeneral functions that start with an underscore should not be used unless you know **exactly** why you are using it, they are internal to the framework and you shouldn't need to call them unless you are hacking :)

###init()
This method is used to initialize the component, ie setting up subcomponets Buttons, MenuItems, CarouselItems as so forth.

Currently you need to call the init method on each subcomponet. (this will be fixed in a future release)

###update()
This method is called on **every** animation cycle and can be used to updated the componets values relative kinect positions or any other values. (ie doing your own raw animations)

You should call the update method on any subcomponent if you wish to have them react correctly.


###html()
This function is called often and can be called when ever the page needs to be refreshed and the content needs to be created from scratch. IE every time a screen is shown that contains this component. 

This method should ONLY ouput html, as well as each subcompoments html and never create/init/update any components or subcomponets.

  	html: function(){
     return '<div id="'+this.id+'" class="carousel-menu">' +
       	'<div class="carousel-item1 carousel-item">'+ this.videoPlayers[0].html() + '</div>' +       
       	'<div class="carousel-item2 carousel-item">' +this.videoPlayers[1].html() + '</div>' +
        '<div class="carousel-item3 carousel-item">' +this.videoPlayers[2].html() + '</div>' +
        '<div class="carousel-item4 carousel-item">' +this.videoPlayers[3].html() + '</div>' +
        this.buttonLeft.html().toString() +
        this.buttonRight.html().toString() +
      '</div>';
      }

###shown() / hidden()
Called when the componet is shown/hidden this can be useful for animations or resetting the default values and animations


    hidden:function(){
      this.element.slideUp();
    },

NOTE: `show` and `hide` are not the same!

###addTimeout()
Allows you to add a timeout which will **only** be active while the component is on a screen and in view. Once the component is removed from the screen this timeout will be removed via the `removeTimeout`.

If you would like the timeout to exsist after the componet has been removed from the screen you can manually use the `window.setTimeout` for now.

###subElm
This method is useful for refering to a sub html element of a componet. In the example above if you were to reference the 2nd carousel item you could do it via 

	this.subElm('.carousel-item2').$JqueryFunction

This allows us to wrap thing nicely and never generate unique id's for each sub-div

###_setId()
This method is an exception to the _ rule at present. Calling this will create a unique html-id for this component. IF you override the `init` method you will need to call this manually.

###_triggerProceed()
This method can be used by the things that need to be "selected" ie buttons. This allows you to only call the procced method once.

TODO: be able to config timeout for multiple calls values ie only pass the even once every 3seconds.



##tracker
Trackers are special `Components` they **can** follow a source ie they move around bassed on which source they are attached to.

##Variables
All variables in Component are avaliable here.

###this.fixed
Boolean indicating where this componet should infact follow the source. Can be dynamically updated based on some other function.

###this.source 
Which kinect source this Componet should track/follow. Possible values are `User.head` `User.hands.left` `User.hands.right`

###this.triggers[]
An allow specifying the kinect sources that should trigger events for this componet

###x,y,z
Scaled/converted to screen co-ordinates of the tracker. This values repersent the current position on the screen. (unless scaling is applied) 

##Functions

###updateElement()
Special function relative to the Tracker, this is similar to the `update` method of the component but because of JS being screwed up it needed a different name as it is called AFTER the `update` method. This is done so that `this.{x,y,z}` values can be calculated relative to the positions on the screen and size of the components forcing the component to be with in the screen bounds

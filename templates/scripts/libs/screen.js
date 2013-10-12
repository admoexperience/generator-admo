//*****************************************************************
// Screen object that will be used for managing components on a screen
//
// The following properties are relevant:
// - transition: The length (in ms) it takes for the screen to be shown/hidden
//
// The following functions are relevant:
// - shown: Gets called whenever the screen is shown
// - hidden: Gets called whenever the screen is hidden
//*****************************************************************

Screen = BaseObject.create({
  css: '',
  components:[],
  transition: 500,
  duration: {
    show: 0,
    hide: 0
  },
  show: function() {
  },
  _shown: function(){
    this.shown();
    for(var i = 0; i < this.components.length; i++){
      this.components[i]._shown();
    }

  },
  init:function(){
    for(var i = 0; i < this.components.length; i++){
      this.components[i]._init();
    }
  },

  shown: function() {
  },
  _hidden: function() {
    this.hidden();
    for(var i = 0; i < this.components.length; i++){
      //The components aren't on the screen remove them.
      //TODO: Handle time outs you want to carry over screen transitions
      this.components[i]._removeAllTimeouts();
      this.components[i]._hidden();
    }
  },
  hidden: function(){

  },
  _update: function(){
    for(var i = 0; i < this.components.length; i++){
      if (this.components[i]._update)
        this.components[i]._update();
    }
  },

  getCss: function(){
    //By default use the css given. IF that wasn't given then use the variables name.
    //This should be moved out of here.
    var tmpCSS = this.css;
    var self = this;
    $.each(AdmoApp.Screens, function(key,val){ if(val == self) tmpCSS = key;});
    return this.css || AdmoApp.Utils.dashize(tmpCSS);
  },

  _getHtml: function(){
    var htmlList =  _.map(this.components,function(comp){
        return comp._renderHtml();
    });
    return htmlList.join('');
  }
});

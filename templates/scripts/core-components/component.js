//*****************************************************************
// The root that all app components will inherit from
//
// The following functions are relevant:
// - init: Gets called once during startup
// - shown: Gets called whenever the component is shown
// - hidden: Gets called whenever the component is hidden
// - update: Gets called whenever the screen refreshes
// - html: Generates the required html for the component using
// - toString: Used to render the "html" ouput of the object
//*****************************************************************
Component = BaseObject.create({
  id: null,
  proceeding: false,
  logCounter:1,
  //Components can define the default cssClasses
  css:[],
  //An additional css class that instances can use
  extraCss:[],
  element: null,

  scale: 1,
  scaleOffset: {x:0,y:0},

  show: function() {
    this.isShown = true;
    this.shown.apply(this, arguments); // Pass all arguments straight through
    return this;
  },
  _shown: function(){
      this.element = $('#' + this.id);
      this.shown();
  },
  shown: function() {
  },

  hide: function() {
    this.isShown = false;
    this.hidden();
    return this;
  },

  _hidden: function() {
    this.element = $('#' + this.id);
    this.hidden();
  },

  hidden: function(){

  },

  _update: function(){
    this.element = $('#' + this.id);
    this.update();
  },

  update: function() {

  },

  subElm:function(selector){
    return $(selector, '#' + this.id);
  },

  _setId:function(){
    if (!this.id)
      this.id = BaseObject.generateId();
  },

  _reset:function(){
    this.proceeding=false;
  },

  init: function() {
    this._setId();
    this._reset();
    this.element = $('#' + this.id);
  },

  //Method calles the procced method but ONLY once.
  _triggerProceed:function(){
    if (this.proceeding)
      return;
    this.proceeding = true;
    this.proceed();
  },

  pos:function(){
    return {
      x: this.el().left,
      y: this.el().top
    }
  },


  /**
    var animations = self.chain([
            ['.message-background',{opacity:0.5}, 500],
            ['.moving-message',{left:800},500],
            ['.moving-message',{left:520}, 2500],
            ['.moving-message',{lef:-600}, 500],
            ['.message-background',{opacity:0}, 500],
          ],function(){
            //on done
          });
  */
  chain: function(list,done) {
    var promise = $.Deferred().resolve().promise();
    var self = this;
    $.each(list, function(index,value) {
        promise = promise.pipe( function(){
          //0 = css class
          //1 = hash to animate to eg {lef: 200}
          //2 = time in milli seconds
          return self.subElm(value[0]).animate(value[1], value[2]);
        });
    });
    if(done){
      $.when(promise).done(done);
    }
    return promise;
  },

  proceed: function(){

  },

  template: function(name){
    return JST[name]();
  },
  html: function(){
    //Function *must* make sure the html returned here is safe
    return template(this.css) || "";
  },
  _renderHtml: function(){
    //Make it an array
    var tmpCss =[].concat(this.css);
    var tmpExtra = [].concat(this.extraCss);
    var newCss = tmpCss.concat(tmpExtra).join(' ');

    return '<div id="'+this.id+'" class="'+ newCss + '">' +
      this.html() +
    '</div>';
  },

  log:function(message){
    this.logCounter ++;
    if(this.logCounter % 100){
      console.log(message);
    }
  }
});

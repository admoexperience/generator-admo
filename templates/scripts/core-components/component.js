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
  css:'',
  name:null,
  //An additional css class that instances can use
  extraCss:[],
  element: null,

  scale: 1,
  scaleOffset: {x:0,y:0},
  _subComponents: null,
  requiredFields: null,

  show: function() {
    this.isShown = true;
    this.shown.apply(this, arguments); // Pass all arguments straight through
    return this;
  },
  _shown: function(){
      this._setElement();
      this.shown();
      for(var i=0; i< this._subComponents.length; i++){
        this._subComponents[i]._shown();
      }
  },
  shown: function() {
  },

  hide: function() {
    this.isShown = false;
    this.hidden();
    return this;
  },
  _setElement:function(){
    this.element = $('#' + this.id);
  },

  _hidden: function() {
    this._setElement();
    this.hidden();
    for(var i=0; i< this._subComponents.length; i++){
      this._subComponents[i]._hidden();
    }
  },

  hidden: function(){

  },

  _update: function(){
   this._setElement();
   for(var i in this._subComponents){
      this._subComponents[i]._update();
    }
    this.update();
  },

  update: function() {

  },
  addComponent: function(component){
    this._subComponents.push(component);
    component._init();
  },

  subElement: function(selector){
    return $(selector, '#' + this.id);
  },

  subElm:function(selector){
    return this.subElement(selector);
  },

  domSubElement: function(selector){
    //Returns a raw document.getElementById thing but by jquery
    return this.subElm(selector)[0];
  },

  subElmRaw:function(selector){
    return this.domSubElement(selector);
  },

  _setId:function(){
    if (!this.id)
      this.id = BaseObject.generateId();
  },

  _reset:function(){
    this.proceeding=false;
  },

  _init: function() {
    this._subComponents = [];
    this._setId();
    this._reset();
    this.init();
  },

  init: function(){

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

  template: function(tplName){
    if(!tplName){
      console.error("Name is required");
      console.error(this.css);
      throw '[name] is a required field if you want to use the template function';
    }
    if(!tplName in JST){
      throw "Template not found ["+tplName+"]";
    }
    return JST[tplName](this);
  },
  html: function(){
    return this.template(this.name);
  },
  _renderHtml: function(){
    if (this.css instanceof Array){
      console.warn("Use of an array for this.css ["+this.css.join(',')+"] has been depricated please replace with this.name");
    }
    if(this.css){
      console.warn("Use of this.css["+this.css+"] has been depricated please use, [this.name]");
    }

    //Make it an array
    var tmpCss =[].concat(this.name || this.css);
    var tmpExtra = [].concat(this.extraCss);
    var newCss = tmpCss.concat(tmpExtra).join(' ');
    //Function *must* make sure the html returned here is safe
    var subhtml = _.map(this._subComponents,function(comp){
      return comp._renderHtml();
    }).join('\n');

    var htmlLocal= '<div id="'+this.id+'" class="'+ newCss + '">' +
      this.html() +
      subhtml+
    '</div>';
    return htmlLocal;
  },

  log:function(message){
    this.logCounter ++;
    if(this.logCounter % 100){
      console.log(message);
    }
  }
});

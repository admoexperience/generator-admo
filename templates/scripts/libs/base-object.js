//*****************************************************************
// A core object that all other objects inherit from.
//
// Currently only used to provide nice timeout management. You can
// add or remove named timeouts. If they are removed before
// triggering, they disappear.
//****************************************************************


//Internal function do not use.
function __createObject(obj){
  return $$(obj);
}

BaseObject = __createObject({
  timeouts: {},
  _autoId: 0,

  //Uses for extending an object. Syntax is
  //var prop = BaseObject.create({prop1,: 1, prop2: 2});
  create:function(properties){
     return $$(this,properties);
  },
  //Generates a unique (bare threading issues) id that can be used on the dom for id="";
  generateId: function(){
    BaseObject._autoId = BaseObject._autoId + 1;
    return BaseObject._autoId;
  },
  addTimeout: function(name, fn, time) {
    var self = this;
    // Due to prototypal inheritance, timeouts is shared amongs all objects. Make sure timeout names are unique
    name += '_' + this._id;
    if (!this.timeouts[name]) {
      var self = this;
      this.timeouts[name] = window.setTimeout(function(){
        fn.apply(self);
        //clear the timeout after it has run
        self.timeouts[name] = null;
      }, time);
    }
  },
  removeTimeout: function(name) {
    // Due to prototypal inheritance, timeouts is shared amongs all objects. Make sure timeout names are unique
    name += '_' + this._id;
    if (this.timeouts[name]) {
      window.clearTimeout(this.timeouts[name]);
      this.timeouts[name] = null;
    }
  },
  setInterval: function(name, fn, time) {
    var self = this;
    // Due to prototypal inheritance, timeouts is shared amongs all objects. Make sure timeout names are unique
    name += '_' + this._id;
    if (!this.timeouts[name]) {
      var self = this;
      this.timeouts[name] = window.setInterval(function(){
        fn.apply(self);
        //clear the timeout after it has run
        self.timeouts[name] = null;
      }, time);
    }
  },

  _removeAllTimeouts:function(){
    for(var i in this.timeouts){
      this.removeTimeout(i);
    }
  }
});

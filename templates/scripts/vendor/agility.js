/*

  Agility.js    
  Licensed under the MIT license
  Copyright (c) Artur B. Adib, 2011
  http://agilityjs.com

*/

/**

This is custom code linsen wrote in order to get object extension working! :)
*/

// Sandboxed, so kids don't get hurt. Inspired by jQuery's code:
//   Creates local ref to window for performance reasons (as JS looks up local vars first)
//   Redefines undefined as it could have been tampered with
(function(window, undefined){

  if ((!window.jQuery) && (!window.Zepto)) {
    throw "agility.js: Neither jQuery nor Zepto found";
  }
  
  // Local references
  var document = window.document,
      location = window.location,
  
  // In case $ is being used by another lib
  $ = (window.jQuery || window.Zepto),

  // Main agility object builder
  agility,

  // Internal utility functions
  util = {},
  
  // Default object prototype
  defaultPrototype = {},
  
  // Global object counter
  idCounter = 0;
  
  //////////////////////////////////////////////////////////////////////////
  //
  //  Modernizing old JS
  //

  // Modified from Douglas Crockford's Object.create()
  // The condition below ensures we override other manual implementations (most are not adequate)
  if (!Object.create || Object.create.toString().search(/native code/i)<0) {
    Object.create = function(obj){
      var Aux = function(){};
      $.extend(Aux.prototype, obj); // simply setting Aux.prototype = obj somehow messes with constructor, so getPrototypeOf wouldn't work in IE
      return new Aux();
    };
  }
  
  // Modified from John Resig's Object.getPrototypeOf()
  // The condition below ensures we override other manual implementations (most are not adequate)
  if (!Object.getPrototypeOf || Object.getPrototypeOf.toString().search(/native code/i)<0) {
    if ( typeof "test".__proto__ === "object" ) {
      Object.getPrototypeOf = function(object){
        return object.__proto__;
      };
    } else {
      Object.getPrototypeOf = function(object){
        // May break if the constructor has been tampered with
        return object.constructor.prototype;
      };
    }
  }  


  //////////////////////////////////////////////////////////////////////////
  //
  //  util.*
  //

  // Checks if provided obj is an agility object
  util.isAgility = function(obj){
   return obj._agility === true;
  };
  
  // Scans object for functions (depth=2) and proxies their 'this' to dest.
  // * To ensure it works with previously proxied objects, we save the original function as 
  //   a '._preProxy' method and when available always use that as the proxy source.
  // * To skip a given method, create a sub-method called '_noProxy'.
  util.proxyAll = function(obj, dest){
    if (!obj || !dest) {
      throw "agility.js: util.proxyAll needs two arguments";
    }
    for (var attr1 in obj) {
      var proxied = obj[attr1];
      // Proxy root methods
      if (typeof obj[attr1] === 'function') {
        proxied = obj[attr1]._noProxy ? obj[attr1] : $.proxy(obj[attr1]._preProxy || obj[attr1], dest);
        proxied._preProxy = obj[attr1]._noProxy ? undefined : (obj[attr1]._preProxy || obj[attr1]); // save original
        obj[attr1] = proxied;
      }
    } // for attr1
  }; // proxyAll
  
  // Determines # of attributes of given object (prototype inclusive)
  util.size = function(obj){
    var size = 0, key;
    for (key in obj) {
      size++;
    }
    return size;
  };
  
  //////////////////////////////////////////////////////////////////////////
  //
  //  Default object prototype
  //
  
  defaultPrototype = {
    
    _agility: true,
    
    //////////////////////////////////////////////////////////////////////////
    //
    //  Shortcuts
    //
        
  }; // prototype
  
  //////////////////////////////////////////////////////////////////////////
  //
  //  Main object builder
  //
  
  // Main agility object builder
  agility = function(){
    
    // Real array of arguments
    var args = Array.prototype.slice.call(arguments, 0),
    
    // Object to be returned by builder
    object = {},
    
    prototype = defaultPrototype;
            
    //////////////////////////////////////////////////////////////////////////
    //
    //  Define object prototype
    //

    // Inherit object prototype
    if (typeof args[0] === "object" && util.isAgility(args[0])) {
      prototype = args[0];    
      args.shift(); // remaining args now work as though object wasn't specified
    } // build from agility object
    
    // Build object from prototype as well as the individual prototype parts
    // This enables differential inheritance at the sub-object level, e.g. object.view.format
    object = Object.create(prototype);

    // Fresh 'own' properties (i.e. properties that are not inherited at all)
    object._id = idCounter++;

    // Cloned own properties (i.e. properties that are inherited by direct copy instead of by prototype chain)
    // This prevents children from altering parents models
    object._data = prototype._data ? $.extend(true, {}, prototype._data) : {};

    //////////////////////////////////////////////////////////////////////////
    //
    //  Extend model, view, controller
    //

    // Just the default prototype
    if (args.length === 0) {
    }
  
    // Prototype differential from single {model,view,controller} object
    else if (args.length === 1 && typeof args[0] === 'object') {
      for (var prop in args[0]) {
        object[prop] = args[0][prop];
      }
    } // {model, view, controller} arg
    
    // Prototype differential from separate {model}, {view}, {controller} arguments
    else {
      
      throw "agility.js: unknown argument";
      
    } // ({model}, {view}, {controller}) args

    //////////////////////////////////////////////////////////////////////////
    //
    //  Bootstrap: Bindings, initializations, etc
    //
    
    // object.* will have their 'this' === object. This should come before call to object.* below.
    util.proxyAll(object, object);

    // Bind all controllers to their events

    return object;
    
  }; // agility
  
  //////////////////////////////////////////////////////////////////////////
  //
  //  Global objects
  //
  
  // Shortcut to prototype for plugins
  agility.fn = defaultPrototype;
  
  // isAgility test
  agility.isAgility = function(obj) {
    if (typeof obj !== 'object') return false;
    return util.isAgility(obj);
  };

  // Globals
  window.agility = window.$$ = agility;

})(window);

window.AdmoApp.Utils = BaseObject.create({

  dashize: function(str){
    var dashes_rx1 = /([A-Z]+)([A-Z][a-z])/g;
    var dashes_rx2 = /([a-z\d])([A-Z])/g;
    return str.replace(dashes_rx1, '$1_$2').replace(dashes_rx2, '$1_$2').replace(/_/g, '-').toLowerCase();
  },

  sku: function(str){
    return getSlug(str);
  },

  mergeObjects: function(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  },
  //http://stackoverflow.com/questions/8047616/get-a-utc-timestamp-in-javascript
  unixEpochTime:function(){
    var now = new Date();
    var nowUtc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    return nowUtc.getTime();
  }
});



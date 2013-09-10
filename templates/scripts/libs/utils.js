window.AdmoApp.Utils = BaseObject.create({

  dashize: function(str){
    var dashes_rx1 = /([A-Z]+)([A-Z][a-z])/g;
    var dashes_rx2 = /([a-z\d])([A-Z])/g;
    return str.replace(dashes_rx1, '$1_$2').replace(dashes_rx2, '$1_$2').replace(/_/g, '-').toLowerCase();
  },

  sku: function(str){
    return getSlug(str);
  }
});



AdmoApp.Components.<%= _.camelize(_.capitalize(component)) %> = Component.create({
  css: '<%= component %>',
  html: function(){
    return '<div class="inner-class"></div>';
  }
};
//*****************************************************************
// Static html text that can be added to a screen and positioned as needed.
//*****************************************************************

StaticHtml = Component.create({
  //Value to display on the screen set it to html ie <div>content</div>
  htmlContent: "",

  //Helper function to wrap creating of an StaticHtml component useful for easy use
  //use like var text = StaticHtml.createHtml('<div>text</div>');
  createHtml: function(htmlContent, css){
    return StaticHtml.create({
       htmlContent: htmlContent,
       css: css || ''
    });
  },
  html: function(){
    return this.htmlContent;
  }
});

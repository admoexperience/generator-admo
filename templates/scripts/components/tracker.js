//*****************************************************************
// Fairly generic functionality to have an object track the user's head or hand.
//
// The following properties should be set:
// - id: the element id (in html)
// - width: the width of the element
// - height: the height of the element
// - border: the border width of the element
// - source: what part of the user to track (User.head | User.hands.left | User.hands.right)
//*****************************************************************
Tracker = Component.create({
  x: 0,
  y: 0,
  z: 0,
  border: 0,

  source: null,

  max: {x: AdmoConfig.screenWidth, y: AdmoConfig.screenHeight},
  fixed: false,

  scaling: false,


  _update: function() {
    this.element = $('#' + this.id);
    this.width = this.element.width();
    this.height = this.element.height();
    // Don't update if nothing has changed
    if (this.fixed){
      //if the element is not on the screen ignore for now.
      var pos = this.element.offset() || this.element.position();
      if (!pos)
        return;
      this.x = pos.left;
      this.y = pos.top;
    }else {
      var x = this.source.x - (this.width)/2;
      var y = this.source.y - (this.height)/2;
      var z = this.source.z;
      if (x < 0)
        x = 0;
      if (x > this.max.x - this.width)
        x = this.max.x - this.width;

      if (y < 0)
        y = 0;
      if (y > this.max.y - this.height)
        y = this.max.y - this.height;

      this.x = x - this.border/2 ;
      this.y = y - this.border/2 ;

      this.element.css({
          left: this.x + 'px',
          top: this.y + 'px'
      });
    }
    this.updateElement();
  },
  update: function() {
    this._update();
  },

  updateElement: function() {

  }
});

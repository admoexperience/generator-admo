/******************************************
 * Websanova.com
 *
 * Resources for web entrepreneurs
 *
 * @author          Websanova
 * @copyright       Copyright (c) 2012 Websanova.
 * @license         This wScratchPad jQuery plug-in is dual licensed under the MIT and GPL licenses.
 * @link            http://www.websanova.com
 * @docs            http://www.websanova.com/plugins/websanova/scratchpad
 * @version         Version x.x
 *
 ******************************************/

    $.fn.wScratchPad = function(option, settings)
    {
        if(typeof option === 'object')
        {
            settings = option;
        }
        else if(typeof option == 'string')
        {
            var data = this.data('_wScratchPad');
            var hit = true;

            if(data)
            {
                if(option == 'reset') data.reset();
                else
                {
                    if($.fn.wScratchPad.defaultSettings[option] !== undefined)
                    {
                        if(settings !== undefined) data.settings[option] = settings;
                        else return data.settings[option];
                    }
                    else hit = false;
                }
            }
            else hit = false;

            return hit;
        }

        settings = $.extend({}, $.fn.wScratchPad.defaultSettings, settings || {});

        return this.each(function()
        {
            var elem = $(this);
            var $settings = jQuery.extend(true, {}, settings);

            //test for HTML5 canvas
            var test = document.createElement('canvas');
            if(!test.getContext)
            {
                elem.html("Browser does not support HTML5 canvas, please upgrade to a more modern browser.");
                return false;
            }

            var sp = new ScratchPad($settings);

            elem.append(sp.generate());

            //get number of pixels of canvas for percent calculations
            sp.pixels = sp.canvas.width * sp.canvas.height;

            elem.data('_wScratchPad', sp);

            sp.init();
        });
    };

    $.fn.wScratchPad.defaultSettings =
    {
        width        : 210,                        // set width - best to match image width
        height        : 100,                        // set height - best to match image height
        image        : ' ',        // set image path
        image2        : ' ',                        // set overlay image path - if set color is not used
        color        : '#336699',                // set scratch color - if image2 is not set uses color
        overlay        : 'none',                    // set the type of overlay effect 'none', 'lighter' - only used with color
        size        : 10,                        // set size of scratcher
        scratchDown    : null,                        // functions to call while scratching - returns event and percentage scratched
        scratchUp    : null,
        scratchMove    : null
    };

    function ScratchPad(settings)
    {
        this.sp = null;
        this.settings = settings;

        this.scratch = false;

        this.canvas = null;
        this.ctx = null;

        return this;
    }

    var tthis;

    ScratchPad.prototype =
    {
        generate: function()
        {
            var $this = this;
            tthis = this;

            this.canvas = this.settings.canvas[0];
            this.ctx = this.canvas.getContext('2d');

            this.sp =
            $('<div></div>')
            .css({cursor: 'default', position: 'relative'})
            .append(
                $(this.canvas)
                .attr('width', this.settings.width + 'px')
                .attr('height', this.settings.height + 'px')
                .css({cursor: 'default'})
            )

            //this.bind('mousedown', 'ScratchDown');
            //this.bind('mousemove', 'ScratchMove');
            //this.bind('mouseup', 'ScratchUp');

            return this.sp;
        },

        test:function(){
            console.log("test function");
        },

        bind: function(event, func)
        {
            var $this = this;

            if(func == 'ScratchDown')
            {
                $(this.canvas).unbind('mousedown');

                $(this.canvas).bind(event, function(e)
                {
                    e.preventDefault();
                    e.stopPropagation();

                    //reset canvas offset in case it has moved
                    $this.canvas_offset = $($this.canvas).offset();

                    $this.scratch = true;
                    $this.scratchFunc(e, $this, 'Down');
                });
            }
            else if(func == 'ScratchMove')
            {
                $(this.canvas).unbind('mousemove');

                $(this.canvas).bind(event, function(e)
                {
                    e.preventDefault();
                    e.stopPropagation();

                    if($this.scratch) $this.scratchFunc(e, $this, 'Move');
                });
            }
            else if(func == 'ScratchUp')
            {
                $(this.canvas).unbind('mouseup');

                $(this.canvas).bind(event, function(e)
                {
                    e.preventDefault();
                    e.stopPropagation();

                    //make sure we are in draw mode otherwise this will fire on any mouse up.
                    if($this.scratch)
                    {
                        $this.scratch = false;
                        $this.scratchFunc(e, $this, 'Up');
                    }
                });
            }

        },

        init: function()
        {
            this.sp.css('width', this.settings.width);
            this.sp.css('height', this.settings.height);

            this.canvas.width = this.settings.width;
            this.canvas.height = this.settings.height;

            this.pixels = this.canvas.width * this.canvas.height;

            if(this.settings.image2)
            {
                this.drawImage(this.settings.image2);
            }
            else
            {
                if(this.settings.overlay != 'none')
                {
                    this.drawImage(this.settings.image);
                    this.ctx.globalCompositeOperation = this.settings.overlay;
                }
                else
                {
                    this.setBgImage();
                }

                this.ctx.fillStyle = this.settings.color;
                this.ctx.beginPath();
                this.ctx.rect(0, 0, this.settings.width, this.settings.height)
                this.ctx.fill();
            }
        },

        reset: function()
        {
            this.ctx.globalCompositeOperation = 'source-over';
            this.init();
        },

        setBgImage: function()
        {
            this.sp.css({backgroundImage: 'url('+this.settings.image+')'});
        },

        drawImage: function(imagePath)
        {
            var $this = this;
            var img = new Image();
              img.src = imagePath;
              $(img).load(function(){
                  $this.ctx.drawImage(img, 0, 0);
                  $this.setBgImage();
              })
        },

        scratchFunc: function(e, $this, event)
        {
            e.pageX = Math.floor(e.pageX - $this.canvas_offset.left);
            e.pageY = Math.floor(e.pageY - $this.canvas_offset.top);

            $this['scratch' + event](e, $this);

            if($this.settings['scratch' + event]) $this.settings['scratch' + event](e, $this.scratchPercentage($this));
        },

        scratchPercentage: function($this)
        {
            var hits = 0;
            var imageData = $this.ctx.getImageData(0,0,$this.canvas.width,$this.canvas.height)

            for(var i=0, ii=imageData.data.length; i<ii; i=i+4)
            {
                if(imageData.data[i] == 0 && imageData.data[i+1] == 0 && imageData.data[i+2] == 0 && imageData.data[i+3] == 0) hits++;
            }

            return (hits / $this.pixels) * 100;
        },

        scratchDown: function(e, $this)
        {

            $this.ctx.globalCompositeOperation = 'destination-out';
            $this.ctx.lineJoin = "round";
            $this.ctx.lineCap = "round";
            $this.ctx.strokeStyle = $this.settings.color;
            $this.ctx.lineWidth = $this.settings.size;

            //draw single dot in case of a click without a move
            $this.ctx.beginPath();
            $this.ctx.arc(e.pageX, e.pageY, $this.settings.size/2, 0, Math.PI*2, true);
            $this.ctx.closePath();
            $this.ctx.fill();

            //start the path for a drag
            $this.ctx.beginPath();
            $this.ctx.moveTo(e.pageX, e.pageY);
        },

        scratchMove: function(e, $this)
        {
            var x = User.head.x;
            console.log(User.head.x);
            $this.ctx.lineTo(x, e.pageY);
            $this.ctx.stroke();
        },

        scratchUp: function(e, $this)
        {
            $this.ctx.closePath();
        },
    }

TransferData = (function () {

  return {
    firstTime:true,
    percentage:0,

    init:function(){
        this.firstTime = true;
        this.percentage = 0;
    },

    penOn: function(x,y){

        if(this.firstTime){
            this.firstTime = false;
            console.log("draw");

            tthis.ctx.globalCompositeOperation = 'destination-out';
            tthis.ctx.lineJoin = "round";
            tthis.ctx.lineCap = "round";
            tthis.ctx.strokeStyle = tthis.settings.color;
            tthis.ctx.lineWidth = tthis.settings.size;

            //draw single dot in case of a click without a move
            tthis.ctx.beginPath();
            tthis.ctx.arc(x, y, tthis.settings.size/2, 0, Math.PI*2, true);
            tthis.ctx.closePath();
            tthis.ctx.fill();

            //start the path for a drag
            tthis.ctx.beginPath();
            tthis.ctx.moveTo(x, y);

        }
        else{

            tthis.ctx.lineTo(x, y);
            tthis.ctx.stroke();

        }

        this.percentage = ScratchPad.prototype.scratchPercentage(tthis);

    },

    penOff:function(){

        if(!this.firsTime){
            this.firstTime = true;
            tthis.ctx.closePath();
        }

    },

  };
})();

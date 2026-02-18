ig.module(
    'plugins.resize'
)
.requires(
    'impact.impact'
).defines(function() {

    ig.resize = {
    
        W: 480,
        H: 288,
        currentW: null,
        currentH: null,
        ratio: null,
        c: null,
        o: null,
        ad: null,

        init: function(orientation) {


            this.orientation = orientation || 'landscape';

            this.c = document.getElementById('canvas');
            this.o = document.getElementById('o');
            this.ad = document.getElementById('ad');
            this.adLarge = document.getElementById('adLarge');

            this.ratio = this.W / this.H;

            this.scale();

            this.c.style.userSelect = 'none';
            this.c.style.touchCallout = 'none';
            this.c.style.touchAction = 'none';
            this.c.style.contentZooming = 'none';
            this.c.style.userDrag = 'none';
            this.c.style.tapHighlightColor = 'rbga(0,0,0,0)';

        },



        scale: function() {

            var w = window.innerWidth;
            window.scrollTo(0, 1);

            this.currentW = window.innerWidth / this.W;
            this.currentH = window.innerHeight / this.H;

            if (window.innerWidth == 480) {
                this.c.style.width = "480px";
                this.c.style.height = "288px";
            }
            if (window.innerWidth > 480 && window.innerWidth < 960) {
                this.c.style.width = "100%";
                this.c.style.height = Math.floor(this.H * this.currentW) + "px";
            }
            if (window.innerWidth == 960) {
                this.c.style.width = "960px";
                this.c.style.height = "576px";
            }
            if (window.innerWidth >= 1024) {
                this.c.style.width = "1024px";
                this.c.style.height = "614px";
            }


            this.ad.style.left = Math.floor((window.innerWidth - 320) / 2) + "px";
            this.ad.style.top = parseInt(this.c.style.height, 10) - 110 + "px";

            // this.adLarge.style.left = ~~(( w / 2 ) - (adLargeW / 2)) + 'px';

            if (window.innerWidth < 480 || window.innerWidth < window.innerHeight) {
                this.o.style.display = "block";
                this.c.style.display = "none";
                this.ad.style.display = 'none';
            } else {
                this.o.style.display = "none";
                this.c.style.display = "block";
            }


        },


        genericScale: function() {

            var gameCanvas = document.getElementById('canvas'),
            ad = document.getElementById('ad'),
            adLarge = document.getElementById('adLarge');

            var widthToHeight = gameCanvas.width / gameCanvas.height;
            var newWidth = window.innerWidth;
            var newHeight = window.innerHeight;
            var newWidthToHeight = newWidth / newHeight;


            if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
            gameCanvas.style.height = newHeight + 'px';
            gameCanvas.style.width = newWidth + 'px';
            } else {
            newHeight = newWidth / widthToHeight;
            gameCanvas.style.width = newWidth + 'px';
            gameCanvas.style.height = newHeight + 'px';
            }

            gameCanvas.style.marginTop = (-newHeight / 2) + 'px';
            gameCanvas.style.marginLeft = (-newWidth / 2) + 'px';


            ad.style.marginLeft = (window.innerWidth / 2) - (ad.offsetWidth / 2) + 'px';
            adLarge.style.marginLeft = (window.innerWidth / 2) - (adLarge.offsetWidth / 2) + 'px';
 
        }



    };

});


// scroll function
scroll = function(endY, duration) {
    endY = endY;
    duration = duration || 200;

    var startY = document.body.scrollTop,
        startT  = +(new Date()),
        finishT = startT + duration;

    var interpolate = function (source, target, shift) { 
        return (source + (target - source) * shift); 
    };

    var easing = function (pos) { 
        return (-Math.cos(pos * Math.PI) / 2) + .5; 
    };

    var animate = function() {
        var now = +(new Date()),
            shift = (now > finishT) ? 1 : (now - startT) / duration;

        window.scrollTo(0, interpolate(startY, endY, easing(shift)));

        (now > finishT) || setTimeout(animate, 15);
    };

    animate();
};

// disable/enable scroll function
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}


// jquery stuff
$(document).ready(function() {

    // some needed variables
    var width = $(window).width();

    // sticky nav bar
    $( window ).scroll(function() {
        
        var scroll = $( window ).scrollTop();

        if (scroll > 156 && width > 600) {
            $('nav').addClass("fixed");
            $('#search-related').css("position", "fixed").css("top", "8%");
            $('#search-divider').css("position", "fixed").css("margin-top", "9%");
        } else {
            $('nav').removeClass("fixed");
            $('#search-related').css("position", "absolute").css("top", "30%");
            $('#search-divider').css("position", "absolute").css("margin-top", "21%");
        } 
      
    });

    // if (width < 480) {
        $('#pull').on('click', function() {
            $('nav ul').toggleClass('after');
        })


    // prevent page scroll
    $( '#stories' ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
        
        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 6;
        e.preventDefault();
    });
    $( '#othervids' ).bind( 'mousewheel DOMMouseScroll', function ( e ) {
        var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
        
        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 6;
        e.preventDefault();
    });

    // scroll on click
    $('.clearfix li:nth-child(1)').on('click', function(){
        $('html, body').animate({scrollTop:0}, 'slow');
        return false;
    });
    $('.clearfix li:nth-child(2)').on('click', function(){
        $("html, body").animate({ scrollTop: $(document).height() }, 1300);        
    });
});
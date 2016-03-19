/* global $:false Modernizr:false siteUrl:false Pizza:false Snap:false */


/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data("inview") || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data("inview", false);
                        $el.trigger("inview", [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data("inview", true);
                        $el.trigger("inview", [ true ]);
                    }
                }
            });
        }
    });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);

/*------------------------------------*\
    ::Hide Youtube until clicked
\*------------------------------------*/
function optimizeYouTubeEmbeds() {
    // Get all iframes
    var frames = document.getElementsByTagName( 'iframe' );

    // Loop through each iframe in the page.
    for ( var i = 0; i < frames.length; i++ ) {

        // Find out youtube embed iframes.
        if ( frames[ i ].src && frames[ i ].src.length > 0 && frames[ i ].src.match(/(www?.youtube)/)) {

            // For Youtube iframe, extract src and id.
            var src=frames[i].src;
            var p = /(?:v|e(?:mbed)?)\/([^]{11})/i;
            var id = (src.match(p)[1]);
            if(id === false) { continue;} // * cant compare strict here because internet explorer chokes on it like it chokes on everything else on the planet.

            // Get width and height.
            var w=frames[i].width;
            var h=frames[i].height;
            if(src === '') {continue;}  // * cant compare strict here because internet explorer chokes on it like it chokes on everything else on the planet.
            // Thease are to position the play button centrally.
            var pw=Math.ceil(w/2-38.5);
            var ph=Math.ceil(h/2+38.5);

            // The image+button overlay code.
            var code = '<div class="youtube-img__wrapper"><a href="javascript:void(0)" onclick="LoadYoutubeVidOnPreviewClick(\'' + id + '\');return false;" id="skipser-youtubevid-' + id + '"><img src="http://i.ytimg.com/vi/' + id + '/maxresdefault.jpg" />' +
                "<div class='playme'></div></a></div>";

            // Replace the iframe with a the image+button code.
            var div = document.createElement('div');
            div.innerHTML=code;
            div=div.firstChild;
            frames[i].parentNode.replaceChild(div, frames[i]);
            i--;
        }
    }
}
// Replace preview image of a video with it's iframe.
function LoadYoutubeVidOnPreviewClick(id) {
    var code='<iframe src="https://www.youtube.com/embed/'+id+'/?controls=0&autoplay=1&modestbranding=1&showinfo=0&rel=0&color=white" frameborder=0 allowfullscreen ></iframe>';
    var iframe = document.createElement('div');
    iframe.innerHTML=code;
    iframe=iframe.firstChild;
    var div=document.getElementById("skipser-youtubevid-"+id);
    div.parentNode.replaceChild( iframe, div);
}

$(function(){

    /*------------------------------------*\
        ::CTA Bar Reveal
    \*------------------------------------*/
    $(".cta-bar__tab").click(function(){
        $(".cta-bar").toggleClass("acti-cta");
    });
    $(".cta-bar__title").click(function(){
        $(".cta-bar").toggleClass("acti-cta");
    });

    /*------------------------------------*\
        ::Responsive Video
        Don't let the title fool you, I'm jut hiding videos.
    \*------------------------------------*/
    if (!Modernizr.touch) {
        var sroot = siteUrl.theUrl;
        var heroVid = $(".page-head__hero.hero--video");
        var fourohVid = $(".page-head__hero.hero--404");
        var iconVid = $(".icon__slider");
        var mediaCont = $(".media--vid");
        var procInception = $("#inception-step.process-step");
        var procCreation = $("#creation-step.process-step");
        var procConstruction = $("#construction-step.process-step");
        var procExecution = $("#execution-step.process-step");
        var procEvolution = $("#evolution-step.process-step");
        heroVid.attr("style", "");
        fourohVid.attr("style", "");
        iconVid.attr("style", "");
        mediaCont.attr("style", "");
        procInception.attr("style", "");
        procCreation.attr("style", "");
        procConstruction.attr("style", "");
        procExecution.attr("style", "");
        procEvolution.attr("style", "");
        heroVid.removeClass("touchy");
        fourohVid.removeClass("touchy");
        iconVid.removeClass("touchy");
        mediaCont.removeClass("touchy");
        procInception.removeClass("touchy");
        procCreation.removeClass("touchy");
        procConstruction.removeClass("touchy");
        procExecution.removeClass("touchy");
        procEvolution.removeClass("touchy");
        $("<video class='hero__video video--fixed' preload='auto' autoplay loop='loop' muted='muted' width='100' height='100'><source src='" + sroot + "/wp-content/themes/zemplate/vids/hero/company-loop.webm' type='video/webm' /><source src='" + sroot + "/wp-content/themes/zemplate/vids/hero/company-loop.mp4' type='video/mp4' /><img src='" + sroot + "/wp-content/themes/zemplate/vids/hero/company-loop.jpg' alt='Wireframing in notebook' title='No video playback capabilities, please download the video below' /></video>").insertAfter(".page-id-2 .page-head__hero.hero--video .video__inner");
        $("<video class='hero__video video--fixed' preload='auto' autoplay loop='loop' muted='muted' width='100' height='100'><source src='" + sroot + "/wp-content/themes/zemplate/vids/hero/company-loop.webm' type='video/webm' /><source src='" + sroot + "/wp-content/themes/zemplate/vids/hero/company-loop.mp4' type='video/mp4' /><img src='" + sroot + "/wp-content/themes/zemplate/vids/hero/company-loop.jpg' alt='Wireframing in notebook' title='No video playback capabilities, please download the video below' /></video>").insertAfter(".error404 .page-head__hero.hero--404 .video__inner");
        $("<video class='bg__video video--fixed' preload='auto' autoplay loop='loop' muted='muted' width='100' height='100'><source src='" + sroot + "/wp-content/themes/zemplate/vids/hero/dom-devin.mp4' type='video/mp4' /><source src='" + sroot + "/wp-content/themes/zemplate/vids/hero/dom-devin.ogv' type='video/ogg' /><img src='" + sroot + "/wp-content/themes/zemplate/vids/hero/dom-devin.jpg' alt='creation wireframing' title='No video playback capabilities, please download the video below' /></video>").appendTo(".icon__slider .bg__video-wrap");
        $("<video class='bg__video video--fixed' preload='auto' autoplay loop='loop' muted='muted' width='100' height='100'><source src='" + sroot + "/wp-content/themes/zemplate/vids/content/culture.webm' type='video/webm' /><source src='" + sroot + "/wp-content/themes/zemplate/vids/content/culture.mp4' type='video/mp4' /><img src='" + sroot + "/wp-content/themes/zemplate/vids/content/culture.jpg' alt='Pinball Machine High Scores' title='No video playback capabilities, please download the video below' /></video>").insertBefore(".media--vid .media__inner");
        $("<video class='step__video' preload='auto' autoplay loop='loop' muted='muted'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/inception.mp4' type='video/mp4'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/inception.ogv' type='video/ogg'><img src='" + sroot + "/wp-content/themes/zemplate/vids/process/inception.jpg' alt='creation wireframing' title='No video playback capabilities, please download the video below'></video>").insertAfter("#inception-step .video__inner");
        $("<video class='step__video' preload='auto' autoplay loop='loop' muted='muted'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/creation.mp4' type='video/mp4'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/creation.ogv' type='video/ogg'><img src='" + sroot + "/wp-content/themes/zemplate/vids/process/creation.jpg' alt='creation wireframing' title='No video playback capabilities, please download the video below'></video>").insertAfter("#creation-step .video__inner");
        $("<video class='step__video' preload='auto' autoplay loop='loop' muted='muted'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/construction.mp4' type='video/mp4'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/construction.ogv' type='video/ogg'><img src='" + sroot + "/wp-content/themes/zemplate/vids/process/construction.jpg' alt='creation wireframing' title='No video playback capabilities, please download the video below'></video>").insertAfter("#construction-step .video__inner");
        $("<video class='step__video' preload='auto' autoplay loop='loop' muted='muted'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/execution.mp4' type='video/mp4'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/execution.ogv' type='video/ogg'><img src='" + sroot + "/wp-content/themes/zemplate/vids/process/execution.jpg' alt='creation wireframing' title='No video playback capabilities, please download the video below'></video>").insertAfter("#execution-step .video__inner");
        $("<video class='step__video' preload='auto' autoplay loop='loop' muted='muted'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/evolution.mp4' type='video/mp4'><source src='" + sroot + "/wp-content/themes/zemplate/vids/process/evolution.ogv' type='video/ogg'><img src='" + sroot + "/wp-content/themes/zemplate/vids/process/evolution.jpg' alt='creation wireframing' title='No video playback capabilities, please download the video below'></video>").insertAfter("#evolution-step .video__inner");
    }

    /*------------------------------------*\
        ::Pizza
    \*------------------------------------*/
    Pizza.init();

    /*------------------------------------*\
        ::Chrome Bug for SVG transition hover
    \*------------------------------------*/
    $(".dumbgfix").on("click", "a", function(e) {
        e.preventDefault();
        var url = $(this).prop("href");
        window.location.href = url.split("?")[0];
    });

    /*------------------------------------*\
        ::Form Validation
    \*------------------------------------*/
    if ($.isFunction($.fn.parsley)) {
        $("#hub_contact").parsley();
        $(".parsley-errors-list").click(function () {
            $("#hub_contact").reset();
        });
        $("#hub_subscribe").parsley();
        $(".parsley-errors-list").click(function () {
            $("#hub_subscribe").reset();
        });
    }

    /*------------------------------------*\
        ::Navigation Handling
    \*------------------------------------*/
    $(".mnav a[href='#']").click(function (e) {
        e.preventDefault();
    });
    $(".mnav").click(function () {
        $("body").toggleClass("noScrollForYou");
        $(".head-nav").toggleClass("lookie");
        $(".hamburger").toggleClass("x-in-disguise");
    });
    $(".menu-item-has-children").click(function () {
        $(this).siblings().removeClass("active-sub");
        $(this).toggleClass("active-sub");
        $(this).siblings().find(".sub-menu").removeClass("sub-drop");
        $(this).find(".sub-menu").toggleClass("sub-drop");
    });
    $(window).resize(function () {
        if ($("body").hasClass("noScrollForYou")) {
            $("body").removeClass("noScrollForYou");
        }
        if ($(".m-head-nav").hasClass("lookie")) {
            $(".m-head-nav").removeClass("lookie");
        }
        if ($(".hamburger").hasClass("x-in-disguise")) {
            $(".hamburger").removeClass("x-in-disguise");
        }
    });

    /*------------------------------------*\
        ::Single Work
    \*------------------------------------*/
    $(".work-flex").flexslider({
        animation: "slide",
        directionNav: true,
        controlNav: false,
        selector: ".flex__slides > .slide__item",
        slideshow: false,
        useCss: false
    });

    /*------------------------------------*\
        ::Flexslider Top Nav
    \*------------------------------------*/
    $(".slider--top-nav").flexslider({
        animation: "slide",
        directionNav: false,
        selector: ".top-nav__slides > .slide__item",
        slideshow: false,
        smoothHeight: true,
        useCss: false
    });

    /*------------------------------------*\
        ::Flexslider Icon Slider
    \*------------------------------------*/
    $(".slider--icon").flexslider({
        animation: "slide",
        directionNav: false,
        selector: ".icon__slides > .slide__item",
        slideshow: false,
        controlsContainer: ".icon__nav",
        manualControls: ".icon__nav > .icon__nav-item",
        useCss: false
    });
    /*------------------------------------*\
        ::Flexslider Trusbar Carousel
    \*------------------------------------*/
    if($(".slider--trustbar").length > 0) { // Check to see if element is on current page
        (function() {
        // store the slider in a local variable
        var $window = $(window),
                      flexslider2;

        // tiny helper function to add breakpoints
        function getGridSize() {
                return (window.innerWidth < 401) ? 1 :
                       (window.innerWidth < 481) ? 2 :
                       (window.innerWidth < 641) ? 3 :
                       (window.innerWidth < 900) ? 4 : 5;
            }
            $window.load(function() {
                $('.slider--trustbar').flexslider({
                    animation: "slide",
                    animationLoop: false,
                    itemWidth: 224,
                    directionNav: true,
                    controlNav: true,
                    slideshow: false,
                    touch: true,
                    minItems: getGridSize(), // use function to pull in initial value
                    maxItems: getGridSize(), // use function to pull in initial value
                    start: function(slider2) {
                        flexslider2 = slider2;
                    }
                });
            });
            // check grid size on resize event
            $window.resize(function() {
                var gridSize = getGridSize();

                flexslider2.vars.minItems = gridSize;
                flexslider2.vars.maxItems = gridSize;
            });
        }());
    }



    /*------------------------------------*\
        ::Circle Stats
    \*------------------------------------*/
    //for each group of stats
    $(".circle__stat").each(function () {
        //cache some stuff
        that = $(this);
        var svgObj = that.find(".circle__svg");
        var perObj = that.find(".circle__per");
        //establish dimentions
        var wide = that.width();
        var center = wide / 2;
        var radius = wide * 0.8 / 2;
        var start = center - radius;
        //gab the stats
        var per = perObj.text().replace("%", "") / 100;
        //set up the shapes
        var svg = Snap(svgObj.get(0));
        var arc = svg.path("");
        var circle = svg.circle(wide / 2, wide / 2, radius);
        //initialize the circle pre-animation
        circle.attr({
            stroke: "#dbdbdb",
            fill: "none",
            strokeWidth: 2
        });
        //empty the percentage
        perObj.text("");
        //gather everything together
        var stat = {
            center: center,
            radius: radius,
            start: start,
            svgObj: svgObj,
            per: per,
            svg: svg,
            arc: arc,
            circle: circle
        };
        //call the animation
        $(".stats").bind("inview", function (event, visible) {
          if (visible === true) {
            run(stat);
            $("[id^='pie']").addClass('donut-fill');
            $("[id^='donut']").addClass('donut-fill');
            $("[id^='line']").addClass('line-grow');
            $("[id^='bar']").addClass('bar-grow');
          } else {
            $("[id^='pie']").removeClass('donut-fill');
            $("[id^='donut']").removeClass('donut-fill');
            $("[id^='line']").removeClass('line-grow');
            $("[id^='bar']").removeClass('bar-grow');
            return false;
          }
        });
        //call the animation
        $(".main-foot__stats").bind("inview", function (event, visible) {
          if (visible === true) {
            run(stat);
          } else {
            return false;
          }
        });
    });
    //animation function
    function run(stat) {
        //establish the animation end point
        var endpoint = stat.per * 360;
        //set up animation (from, to, setter)
        Snap.animate(0, endpoint, function(val) {
            //remove the previous arc
            stat.arc.remove();
            //get the current percentage
            var curPer = Math.round(val / 360 * 100);
            //if it's maxed out
            if (curPer === 100) {
                //color the circle stroke instead of the arc
                stat.circle.attr({
                    stroke: "#199dab"
                });
                //otherwise animate the arc
            } else {
                //calculate the arc
                var d = val;
                var dr = d - 90;
                var radians = Math.PI * (dr) / 180;
                var endx = stat.center + stat.radius * Math.cos(radians);
                var endy = stat.center + stat.radius * Math.sin(radians);
                var largeArc = d > 180 ? 1 : 0;
                var path = "M" + stat.center + "," + stat.start + " A" + stat.radius + "," + stat.radius + " 0 " + largeArc + ",1 " + endx + "," + endy;
                //place the arc
                stat.arc = stat.svg.path(path);
                //style the arc
                stat.arc.attr({
                    stroke: "#199dab",
                    fill: "none",
                    strokeWidth: 2
                });

            }
            //grow the percentage text
            stat.svgObj.prev().html(curPer + "%");

            //animation speed and easing
        }, 1500, mina.easeinout);
    }

    /*--------------------------------------*\
        :: Open Resource Info on Click of image
    \*--------------------------------------*/
    $(".resource").on('click',function() {
        $this = $(this);

        if($this.hasClass('active')){
            $this.parent().nextAll(".info_wrappin").empty();

            $(this).removeClass('active');
        }else {
            $(".resource").each(function(){
                $(this).removeClass('active');
            });
            $this.addClass('active');

            $this.parent().prevAll(".info_wrappin").empty();
            $this.parent().nextAll(".info_wrappin").empty();
            $this.parent().nextAll(".info_wrappin").each(function() {
                if ($(this).is(".info_wrappin")) {
                    var $html = $this.closest('.resource__wrap').find("[class*='info']").clone(true, true);
                    $(this).html($html);
                    return false;
                }
            });
        }
    });
    $(".closer").on('click',function() {
        $(this).parent().parent().empty();
        $(".resource").each(function(){
            $(this).removeClass('active');
        });

        // $('html, body').stop().animate({
        //     'scrollTop': $('.resources').offset().top-200
        // }, 500);
        return false;
    });


    /*------------------------------------*\
        :: Scroll to Nanny description
    \*------------------------------------*/
    var scrollElement = 'html, body',
    $window = $(window);
    $("a[href^='#resource']").click(function(e) {
        e.preventDefault();
        var $this = $(this),
            target = this.hash,
            $target = $(target),
            scroll = $target.offset().top-400;

        if($this.hasClass('active')){
            $(scrollElement).stop().animate({
                'scrollTop': scroll
            }, 500, 'swing', function() {
                window.location.hash = target;
                $window.scrollTop(scroll);
            });
        }
    });

    /*------------------------------------*\
        ::lightbox
    \*------------------------------------*/


    $(".fancyboxIframe").fancybox({
        autoCenter: true,
        scrollOutside: false,
        arrows : false,
        iframe: {
            preload   : false
        },
        helpers: {
           overlay: {
             locked: false
           }
         }
    });


});

/*------------------------------------*\
    //Main
\*------------------------------------*/
if ($(".main")[0]){

} else {
    $("section").last().addClass("main");
}

optimizeYouTubeEmbeds();

/*------------------------------------*\
    ::Form "Honey Pot" Spam Protection
\*------------------------------------*/
jQuery(function($){
    var $hsForm = $('#hub_contact');
    if($hsForm.length > 0){
        $hsForm.submit(function(e){
            if($hsForm.find('.no-bots').val() !== ''){ // * added second = to !==
                alert('Your email has been flagged as spam. If this is incorrect, please refresh the page and try filling out the form again without using your browser\'s auto fill feature.');
                return false;
            } else {
                $hsForm.attr('action', $hsForm.data('action'));
            }
        });
    }
});

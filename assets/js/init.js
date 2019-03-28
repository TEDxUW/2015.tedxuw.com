var isValidEmailAddress = function(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

var submitEmail = function(e) {
    var email = $("#email").val();
    if (email !== "") {
        if (!isValidEmailAddress(email)) {
            $("#stay-in-touch-text").fadeOut(function() {
                $(this).text("Please check your email and try again.");
            }).fadeIn();
            $("#email").focus();
        } else {
            $.ajax({
                type: $('#email-form').attr('method'),
                url: $('#email-form').attr('action'),
                data: $('#email-form').serialize(),
                dataType: 'json',
                success: function(response) {
                  console.log(response);
                  if (response.status !== 'error') {
                    $("#email-form").hide();
                    $("#email-form-header").hide();
                    $("#email-thankyou").slideDown();
                  }
                  else {
                    $("#stay-in-touch-text").fadeOut(function() {
                        $(this).text("Oops, unsuccessful submit. Try again.");
                    }).fadeIn();
                    $("#email").focus();
                  }
                },
                error: function() {
                    $("#stay-in-touch-text").fadeOut(function() {
                        $(this).text("Oops, unsuccessful submit. Try again.");
                    }).fadeIn();
                    $("#email").focus();
                }
            });
        }
    }
};

var submitEmailHeader = function(e) {
    var email = $("#email-header").val();
    if (email !== "") {
        if (!isValidEmailAddress(email)) {
            $("#stay-in-touch-text-header").fadeOut(function() {
                $(this).text("Please check your email and try again.");
            }).fadeIn();
            $("#email-header").focus();
        } else {
            $.ajax({
                type: $('#email-form-header').attr('method'),
                url: $('#email-form-header').attr('action'),
                data: $('#email-form-header').serialize(),
                dataType: 'json',
                success: function(response) {
                  console.log(response);
                  if (response.status !== 'error') {
                    $("#email-form").hide();
                    $("#email-form-header").hide();
                    $("#email-thankyou-header").slideDown();
                  }
                  else {
                    $("#stay-in-touch-text-header").fadeOut(function() {
                        $(this).text("Oops, unsuccessful submit. Try again.");
                    }).fadeIn();
                    $("#email-header").focus();
                  }
                },
                error: function() {
                    $("#stay-in-touch-text-header").fadeOut(function() {
                        $(this).text("Oops, unsuccessful submit. Try again.");
                    }).fadeIn();
                    $("#email-header").focus();
                }
            });
        }
    }
};

(function($) {

    skel
        .breakpoints({
            xlarge: '(max-width: 1680px)',
            large: '(max-width: 1280px)',
            medium: '(max-width: 980px)',
            small: '(max-width: 736px)',
            xsmall: '(max-width: 480px)'
        });

    $(function() {

        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top - 50
                    }, 1000);
                    return false;
                }
            }
        });

        $("#email-form").submit(function(e) {
            e.preventDefault();
            submitEmail(e);
        });

        $("#email-form-header").submit(function(e) {
            e.preventDefault();
            submitEmailHeader(e);
        });


        var allBlocks = $('.accordion > dd').hide();
        var allHeaders = $('.accordion > dt');

        $('.accordion > dt > a').click(function() {
            $infoHeader = $(this).parent();
            $infoBlock =  $infoHeader.next();

            if(!$infoBlock.hasClass('active')){
                allBlocks.removeClass('active').slideUp();
                allHeaders.removeClass('open');
                $infoHeader.addClass('open');
                $infoBlock.addClass('active').slideDown();
            } else {
                $infoHeader.removeClass('open');
                $infoBlock.removeClass('active').slideUp();
            }
          
            return false;
        });


        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#page-wrapper'),
            $banner = $('#banner'),
            $header = $('#header');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-loading');
            }, 100);
        });

        // Mobile?
        if (skel.vars.isMobile)
            $body.addClass('is-mobile');
        else
            skel
            .on('-medium !medium', function() {
                $body.removeClass('is-mobile');
            })
            .on('+medium', function() {
                $body.addClass('is-mobile');
            });

        // Scrolly.
        $('.scrolly')
            .scrolly({
                speed: 1500,
                offset: $header.outerHeight()
            });

        // Menu.
        var $menu = $('#menu'),
            $menuClose = $('<a class="close">').appendTo($menu),
            $menuToggle = $('.menuToggle');

        // Move to end of body.
        $menu
            .appendTo($body);

        // Close.
        $menuClose
            .on('click touchend', function(event) {

                event.preventDefault();
                event.stopPropagation();

                $body.removeClass('is-menu-visible');

            });

        // Toggle.
        $menuToggle
            .on('click touchend', function(event) {

                event.preventDefault();
                event.stopPropagation();

                $body.toggleClass('is-menu-visible');

            });

        // Wrapper.
        $wrapper
            .on('click touchend', function(event) {

                if ($body.hasClass('is-menu-visible')) {

                    event.preventDefault();
                    event.stopPropagation();

                    $body.removeClass('is-menu-visible');

                }

            });

        // Header.
        if (skel.vars.IEVersion < 9)
            $header.removeClass('alt');

        if ($banner.length > 0 && $header.hasClass('alt')) {

            $window.on('resize', function() {
                $window.trigger('scroll');
            });

            $banner.scrollex({
                bottom: $header.outerHeight() + 1,
                terminate: function() {
                    $header.removeClass('alt');
                },
                enter: function() {
                    $header.addClass('alt');
                },
                leave: function() {
                    $header.removeClass('alt');
                }
            });

        }

    });



})(jQuery);


(function() {
    var v = document.getElementsByClassName("youtube-player");
    for (var n = 0; n < v.length; n++) {
        var p = document.createElement("div");
        p.innerHTML = labnolThumb(v[n].dataset.id);
        p.onclick = labnolIframe;
        v[n].appendChild(p);
    }
})();
 
function labnolThumb(id) {
    return '<img class="youtube-thumb" src="//i.ytimg.com/vi/' + id + '/hqdefault.jpg"><div class="play-button"></div>';
}
 
function labnolIframe() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src", "//www.youtube.com/embed/" + this.parentNode.dataset.id + "?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=1");
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("id", "youtube-iframe");
    this.parentNode.replaceChild(iframe, this);
}

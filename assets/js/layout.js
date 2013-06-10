//= require jquery
//= require github
//= require jquery
//= require highlight
//= require faq
//= require document-nav

$(function() {

    var $window = $(window);

    // Scroll, show/hide header
    // ========================
    $window.on('scroll', function() {
        var scrollTop = $window.scrollTop();

        $('.page-nav, .document-nav').toggleClass('fixed', scrollTop > 49);
        $('.page-head').css('marginTop', Math.min(0, -1*scrollTop));
    }).trigger('scroll');


    // Get github files
    // ================
    $('.github-embed').each(function() {
        var $el = $(this);

        $.getGithubFile($el.data(), function(content, path, url) {
            if($el.data('lang')) {
                $el.append('<pre><code>'+hljs.highlight($el.data('lang'), content).value+'</code><footer><span>Github file:</span> <a href="'+url+'">'+path+'</a></footer></pre>');    
            }
            else {
                $el.append('<pre><code>'+hljs.highlightAuto(content).value+'</code><footer><span>Github file:</span> <a href="'+url+'">'+path+'</a></footer></pre>');
            }
        });
    });


    // Animate page-nav
    // ================
    $('.page-nav .parent a').each(function() {
        var menu = new submenu();
        menu.init( $(this) )
    });
});



var submenu = function() {
    var opening
      , closing
      , $el
      , $li
      , $submenu;

    this.init = function(el) {
        $el = el;
        $li = $el.parent();
        $submenu = $('.page-nav .sub-menu.'+$el.attr('class'));

        $el.add($submenu)
           .on('mouseenter', this.open)
           .on('mouseleave', this.close);
    }

    this.open = function() {
        clearTimeout(closing);

        opening = setTimeout(function() {
            $li.addClass('active')
            $submenu.addClass('open')
        }, 300);
    }

    this.close = function() {
        clearTimeout(opening);
        closing = setTimeout(function() {
            $li.removeClass('active')
            $submenu.removeClass('open')
        }, 300);
    }
}
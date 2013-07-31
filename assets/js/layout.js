//= require jquery
//= require github
//= require jquery
//= require highlight
//= require accordion
//= require document-nav

$(function() {

    var $window = $(window);

    // Scroll, show/hide header
    // ========================
    $window.on('resize', function() {
        var windowWidth = $window.width();

        $('body').toggleClass('left-nav-narrow', windowWidth < 1100)

        $('.rest').each(function() {
            $el = $(this)
            $el.toggleClass('narrow', $el.closest('.full, .left, .right, section').width() < 500)
        });
    }).trigger('resize');

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
    var self = this
      , opening
      , closing
      , state = 'close'
      , $el
      , $li
      , $submenu;

    this.init = function(el) {
        $el = el;
        $li = $el.parent();
        $submenu = $('.page-nav .sub-menu.'+$el.attr('class'));

        $el.on('click', this.toggle);

        $el.add($submenu)
           .on('mouseenter', this.enter)
           .on('mouseleave', this.leave);
    }

    this.toggle = function(event) {
        var $link = $(event.target)

        if($link.is('span')) {
            $link = $link.parent()
        }

        if($link.attr('href') == '#' || $link.attr('href') == '') {
            event.preventDefault()
        }

        if(state == 'close') {
            self.open();
        }
        else {
            self.close();
        }
    }

    this.enter = function() {
        clearTimeout(closing);
        opening = setTimeout(function() {
            self.open();
        }, 300);
    }

    this.leave = function() {
        clearTimeout(opening);
        closing = setTimeout(function() {
            self.close();
        }, 300);
    }

    this.open = function() {
        $li.addClass('active');
        $submenu.addClass('open');
        state = 'open';
    }

    this.close = function() {
        $li.removeClass('active');
        $submenu.removeClass('open');
        state = 'close';
    }
}
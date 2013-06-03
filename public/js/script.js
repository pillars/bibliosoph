$(function() {

    var $documentNav = $('.document-nav');

    if($documentNav.length) {

        var targets = []
          , $window = $(window);

        $documentNav.find('a').each(function() {
            targets.push( $($(this).attr('href')) )
        });

        function setActive($current) {
            var $parent = $current.closest('li')
              , $parentParent = $parent.parent().closest('li');


            $documentNav.find('.current, .active').removeClass('current active')
            $current.addClass('current')

            if($parentParent.length) {
                $parentParent.addClass('active')
            } else {
                $parent.addClass('active')
            }
        }

        // HASH change, update menu
        // ========================
        $window.on('hashchange', function() {
            setTimeout(function() {
                setActive($documentNav.find('[href='+location.hash+']'))
            }, 1);
        });

        // Scroll, update menu
        // ===================
        $window.on('scroll', function() {
            var scrollTop = $window.scrollTop();

            $('.page-nav, .document-nav').toggleClass('fixed', scrollTop > 49);
            $('.page-head').css('marginTop', Math.min(0, -1*scrollTop));

            $.each( targets, function($index, $el) {
                var sectionBottom = (targets[$index+1] && targets[$index+1].offset().top - 1) || $window.height()
                if ($el.length && scrollTop - sectionBottom < -48) {
                    setActive($documentNav.find('[href=#'+$el.attr('id')+']'))
                    return false;
                }
            });
        });

        // Animate the menu
        // ================
        $('.page-nav .parent a').each(function() {
            var menu = new submenu();
            menu.init( $(this) )
        });
    }


    // Scroll, show/hide header
    // ========================
    $window.on('scroll', function() {
        $('.page-head').css('marginTop', Math.min(0, -1*$window.scrollTop()));
    }).trigger('scroll');


    // Get github files
    // ================
    $('.github-embed').each(function() {
        var $el = $(this);
        console.log($el.get(0));
        $.getGithubFile($el.data(), function(content, path, url) {
            if($el.data('lang')) {
                $el.append('<pre><code>'+hljs.highlight($el.data('lang'), content).value+'</code><footer><span>Github file:</span> <a href="'+url+'">'+path+'</a></footer></pre>');    
            }
            else {
                $el.append('<pre><code>'+hljs.highlightAuto(content).value+'</code><footer><span>Github file:</span> <a href="'+url+'">'+path+'</a></footer></pre>');
            }
        });
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
$(function() {

    var $documentNav = $('.document-nav');

    if($documentNav.length) {

        var targets = []
          , $window = $(window)
          , changeHash = false;

        $documentNav.find('a').each(function() {
            targets.push( $($(this).attr('href')) )
        });

        function setActive(hash) {
            var $current = $documentNav.find('[href='+hash+']')
              , $parent = $current.closest('li')
              , $parentParent = $parent.parent().closest('li');


            $documentNav.find('.current, .active').removeClass('current active')
            $current.addClass('current')

            if($parentParent.length) {
                $parentParent.addClass('active')
            } 
            else {
                $parent.addClass('active')
            }

            if(history.pushState) {
                history.pushState(null, null, hash);
            }
            else {
                location.hash = hash;
            }
        }

        // Scroll, update menu
        // ===================
        $window.on('scroll', function() {
            var scrollTop = $window.scrollTop();
            console.log ('scroll', scrollTop);

            $.each( targets, function($index, $el) {
                var sectionBottom = (targets[$index+1] && targets[$index+1].offset().top - 1) || $window.height()
                if ($el.length && scrollTop - sectionBottom < -48) {
                    setActive('#'+$el.attr('id'))
                    return false;
                }
            });
        });
    }
});

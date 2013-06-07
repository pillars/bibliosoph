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

            $.each( targets, function($index, $el) {
                var sectionBottom = (targets[$index+1] && targets[$index+1].offset().top - 1) || $window.height()
                if ($el.length && scrollTop - sectionBottom < -48) {
                    setActive($documentNav.find('[href=#'+$el.attr('id')+']'))
                    return false;
                }
            });
        });
    }
});

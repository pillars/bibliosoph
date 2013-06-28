$(function() {
    $('.accordion dd, .accordion .description').slideUp('fast')
    $('.accordion dt, .accordion .title').on('click', function() {
        var $dd = $(this).next('dd, .description');

        if( $dd.hasClass('open') ) {
            $dd.slideUp('fast')
        } else {
            $dd.slideDown('fast')
        }
        $dd.toggleClass('open');
    })
})
$(function() {
    $('.faq.accordion dd').slideUp('fast')
    $('.faq.accordion dt').on('click', function() {
        var $dd = $(this).next('dd');

        if( $dd.hasClass('open') ) {
            $dd.slideUp('fast')
        } else {
            $dd.slideDown('fast')
        }
        $dd.toggleClass('open');
    })
})
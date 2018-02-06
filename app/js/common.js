$(function() {

	$('.accordeon .acc-head').on('click', funcAcc);

	function funcAcc() {
        $('.accordeon .acc-text').not($(this).next()).slideUp(500);
        $('.accordeon .acc-head').not($(this)).removeClass('active');
        $(this).toggleClass('active').next().slideToggle(500);
    }
});

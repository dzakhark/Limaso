$(function() {

    window.onscroll = function() {myFunction()};
    var header = document.getElementsByClassName("header")[0];
    var sticky = header.offsetHeight + 20;

    function myFunction() {
        console.log(window.pageYOffset + "  " + sticky);
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    var priceFromElem = $('.price-from');
    var priceToElem = $('.price-to');
    priceFromElem.val(0);
    priceToElem.val(1400);

    var priceFrom = priceFromElem.val().length ? $('.price-from').val() : 0;
    var priceTo = priceToElem.val().length ? $('.price-to').val() : 1400;

    $('.range-form').on('change', function () {
        priceFrom = priceFromElem.val();
        priceTo = priceToElem.val();
        if (priceFrom > priceTo) {
            priceTo = priceFrom;
            priceToElem.val(priceFrom);
        }

        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 1400,
            values: [priceFrom, priceTo],
            slide: function (event, ui) {
                priceFromElem.val(ui.values[0]);
                priceToElem.val(ui.values[1]);
            }
        });
    });

    $('.accordeon .acc-head').on('click', funcAcc);

    function funcAcc() {
        $('.accordeon .acc-text').not($(this).next()).slideUp(500);
        $('.accordeon .acc-head').not($(this)).removeClass('active');
        $(this).toggleClass('active').next().slideToggle(500);
    }



    $("#slider-range").slider({
        range: true,
        min: 0,
        max: 1400,
        values: [priceFrom, priceTo],
        slide: function (event, ui) {
            priceFromElem.val(ui.values[0]);
            priceToElem.val(ui.values[1]);
        }
    });



    $('.btn-dropdown').on('click', function () {
        $('.dropdown-content').slideToggle(500);
    });

    $('.sort-item').on('click', function () {
        console.log($('.btn-dropdown').text());
        $('.btn-dropdown').text($(this).text());
        $('.dropdown-content').slideUp(500);
    });

    $(document).click(function(event) {
        if ($(event.target).closest('.btn-dropdown').length) return;
        $('.dropdown-content').slideUp(500);
        event.stopPropagation();
    });
});

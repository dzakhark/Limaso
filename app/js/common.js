$(function() {

    //sticky header
    $(window).scroll(function(){
        var header = $('.header').eq(0);
        var sticky = header.offset().top ;
        if ($(window).scrollTop() === 0) {
            header.removeClass('sticky');
        } else if ($(window).scrollTop() >= sticky) {
            header.addClass('sticky');

        }
    });

    //click hamburger
    $('button.hamburger').click(function () {
        $(this).toggleClass( "is-active");
        if ($(this).is('.is-active')) {
            $('.header__nav').slideDown(1000);
        } else {
            $('.header__nav').slideUp(1000);
        }
    });


    //range form
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


    //accordeon
    $('.accordeon .acc-head').on('click', funcAcc);

    function funcAcc() {
        $('.accordeon .acc-text').not($(this).next()).slideUp(500);
        $('.accordeon .acc-head').not($(this)).removeClass('active');
        $(this).toggleClass('active').next().slideToggle(500);
    }


    //range
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

    //sort products list
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


    //work with modal
    var overlay = $('#overlay');
    var open_modal = $('.btn-buy, .btn-look');
    var close = $('.modal-close, #overlay');
    var modal = $('.modal');

    open_modal.click( function(event){
        event.preventDefault();
        var div = $(this).attr('href');
        overlay.fadeIn(400,
            function(){
                $(div)
                    .css('display', 'block')
                    .animate({opacity: 1, top: '93px'}, 200);
            });
        createMonth(12);
    });

    close.click( function(){
        modal.animate({opacity: 0, top: '45%'}, 200,
                function(){
                    $(this).css('display', 'none');
                    overlay.fadeOut(400);
                }
            );
        errorNumber = false;
        errorDate = false;
        errorName = false;
        errorCode = false;
        $(".error.number").hide();
        $('.number-inputs .item').css("border", "1px solid #e4e9ee");
        $(".error.date").hide();
        $(".date-year, .date-month").css("border", "1px solid #e4e9ee");
        $(".error.name").hide();
        $('.owner').css("border", "1px solid #e4e9ee");
        $(".error.code").hide();
        $('.code.input').css("border", "1px solid #e4e9ee");
    });

    function createMonth(count) {
        var daySelect = $('.date-month');
        for (var i = 0; i < count; i++) {
            daySelect.append('<option>' + (i + 1) + '</option>');
        }
    }

    //validation
    $(".error.number").hide();
    $(".error.date").hide();
    $(".error.name").hide();
    $(".error.code").hide();

    var errorNumber = false;
    var errorDate = false;
    var errorName = false;
    var errorCode = false;

    $(".number-inputs .item").focusout(function(){
        checkNumber();
    });

    $(".date-year, .date-month").change(function() {
        checkDate();
    });

    $(".owner").focusout(function() {
        checkName();
    });

    $(".code").focusout(function() {
        checkCode();
    });

    $('.owner').keypress(function (e) {
        return /[a-zA-Zа-яА-ЯёЁіІїЇ .]/.test(String.fromCharCode(e.keyCode));
    });

    $(".number-inputs .item").keypress(function (e) {
        return e.charCode >= 48 && e.charCode <= 57;
    });

    $(".code.input").keypress(function (e) {
        return e.charCode >= 48 && e.charCode <= 57;
    });

    function checkNumber() {
        var number = $('.number-inputs .item');


        if (number.eq(0).val().length === 4 && number.eq(1).val().length === 4 &&
            number.eq(2).val().length === 4 && number.eq(3).val().length === 4) {
            $(".error.number").hide();
            $('.number-inputs .item').css("border", "1px solid #e4e9ee");
        } else {
            $(".error.number").html("В каждом поле должно быть 4 цифры").show();
            $('.number-inputs .item').css("border","1px solid #F90A0A");
            errorNumber = true;
        }
    }
    
    function checkDate() {

        if ($(".date-year").val() !== '- -' && $(".date-month").val() !== '- -') {
            $(".error.date").hide();
            $(".date-year, .date-month").css("border", "1px solid #e4e9ee");
        } else {
            $(".error.date").html("Заполните скок действия карты").show();
            $(".date-year, .date-month").css("border","1px solid #F90A0A");
            errorDate = true;
        }
    }

    function checkName() {
        var name = $('.owner').val();
        if (name.length >= 4) {
            $(".error.name").hide();
            $('.owner').css("border", "1px solid #e4e9ee");
        } else {
            $(".error.name").html("Введите имя (минимум 4 символа)").show();
            $('.owner').css("border", "1px solid #F90A0A");
            errorName = true;
        }
    }

    function checkCode() {
        var code = $('.code.input').val();
        if (code.length === 3) {
            $(".error.code").hide();
            $('.code.input').css("border", "1px solid #e4e9ee");
        } else {
            $(".error.code").html("В поле должно быть 3 цифры").show();
            $('.code.input').css("border", "1px solid #F90A0A");
            errorCode = true;
        }
    }

    $(".buy-form").submit(function() {
        errorNumber = false;
        errorDate = false;
        errorName = false;
        errorCode = false;

        checkNumber();
        checkDate();
        checkName();
        checkCode();

        if (errorNumber === false && errorDate === false && errorName === false && errorCode === false) {
            return true;
        } else {
            return false;
        }
    });

    //open modal window and ajax request
    $('.btn-look').click(function () {
        $.ajax({
            url: "./show.txt",
            async: true,
            success: function (data){
                data = JSON.parse(data);
                $('#modal-ajax .modal-title').html(data.title);
                $('#modal-ajax .p1').html(data.p1);
                $('#modal-ajax .p2').html(data.p2);
            }
        });
    });
});

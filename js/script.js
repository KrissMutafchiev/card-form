$(function() {

    var owner = $('#owner');
    var cardNumber = $('#cardNumber');
    var cardNumberField = $('#card-number-field');
    var CVV = $("#cvv");
    var mastercard = $("#mastercard");
    var visa = $("#visa");
    var amex = $("#amex");
    var cardExpDataMounts = $('#mounts');
    var cardExpDataYear = $('#year');
    var confirmButton = $('#confirm-purchase');

    cardNumber.payform('formatCardNumber');
    CVV.payform('formatCardCVC');
    
    cardNumber.keyup(function() {

        amex.removeClass('transparent');
        visa.removeClass('transparent');
        mastercard.removeClass('transparent');

        if ($.payform.validateCardNumber(cardNumber.val()) == false) {
            cardNumberField.addClass('has-error');
        } else {
            cardNumberField.removeClass('has-error');
            cardNumberField.addClass('has-success');
        }

        if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
            mastercard.addClass('transparent');
            amex.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
            mastercard.addClass('transparent');
            visa.addClass('transparent');
        } else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
            amex.addClass('transparent');
            visa.addClass('transparent');
        }
    });

    confirmButton.click(function(e) {

        e.preventDefault();

        var isCardValid = $.payform.validateCardNumber(cardNumber.val());
        var isCvvValid = $.payform.validateCardCVC(CVV.val());

        if(owner.val().length < 5){
            alert("Wrong owner name");
        } else if (!isCardValid) {
            alert("Wrong card number");
        } else if (!isCvvValid) {
            alert("Wrong CVV");
        } else {
            generateData(owner,cardExpDataMounts,cardExpDataYear,cardNumber,CVV);

        }
    });

    function generateData(owner,cardExpDataMounts,cardExpDataYear,cardNumber,cvv) {

        var ownerData = $('#owner-data');
        var cardData = $('#exp-data');
        var cardNumberData = $('#card-number-data');
        var cardCvvData = $('#cvv-data');

        $('#main-box').css('display','none');
        $('#data-form').css('display','block');

        ownerData.empty().append(owner.val());
        cardData.empty().append(cardExpDataMounts.val() +' - '+ cardExpDataYear.val());
        cardNumberData.empty().append(cardNumber.val());
        cardCvvData.empty().append(cvv.val());
    }

    $('#back-home').on('click',function backHomePage() {

        $('#main-box').css('display','block');
        $('#data-form').css('display','none');
    })

});

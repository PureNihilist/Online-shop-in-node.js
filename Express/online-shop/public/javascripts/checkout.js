Stripe.setPublishableKey('pk_test_POBZE5ahmDluvARZGxZw2TZ9'); //klucz publiczny do transakcji

var $form = $('#checkout-form');

$form.submit(function(event) {
    //usuwanie starych bledow
    $('#charge-error').addClass('hidden');

    $form.find('button').prop('disabled', true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        name: $('#card-name').val()
    }, stripeResponseHandler);
    return false;
});

function stripeResponseHandler(status, response) {
    if(response.error) {
        //pokazywanie bledow w form
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    } else {
        var token = response.id; //zwraca id tokena
        //wrzucenie tokena do form zeby byl przeslany do serwera
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        //wrzucenie forma na serwer
        $form.get(0).submit();
    }
}

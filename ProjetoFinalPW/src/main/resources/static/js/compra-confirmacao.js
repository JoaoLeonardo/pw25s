$(document).ready(function () {
    // Calcula o total da compra
    calcularTotalCompra();

    // Implementa os eventos da confirmação da compra
    implementEvents();
});

function implementEvents() {
    $('input[name="frete"]').change(function () {
        calcularTotalCompra();
    });
}

/*
 * Calcula o total da compra e seta o resultado na div compraConfirmacaoValor
 */
function calcularTotalCompra() {
    let url = window.location;
    let baseUrl = url.protocol + "//" + url.host + "/";
    let freteSelecionado = $('input[type=radio][name="frete"]:checked').val();

    $.ajax({
        type: 'POST',
        url: baseUrl.concat('compra/total-compra'),
        data: {freteId: freteSelecionado},
        success: function (result) {
            $('#compraConfirmacaoValor').text('R$' + result.toFixed(2));
        },
        error: function (result) {
            // TODO: sweet alert
        }
    });
}
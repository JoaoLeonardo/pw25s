$(document).ready(function () {
    if (!lerCookie('carrinhoCount') && localStorage.getItem('carrinhoCompras')) {
        // ajusta o localStorage do carrinho
        localStorage.removeItem('carrinhoCompras');
    }
    // inicializa a exibição do carrinho
    atualizarNumeroCarrinhoCompras();
});

/*
 * Adiciona o produto ao carrinho
 */
function adicionarNoCarrinho(produtoId, callerElement) {
    let listaItensCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));

    if (listaItensCompras && listaItensCompras.length > 0) {
        const indexIncluso = listaItensCompras.findIndex(item => item.produtoId === produtoId);

        if (indexIncluso != null && indexIncluso >= 0) {
            // incrementa a quantidade do produto que já havia sido incluso
            listaItensCompras[indexIncluso].quantidade++;
        } else {
            // adiciona um novo elemento com quantidade 1
            listaItensCompras.push({produtoId: produtoId, quantidade: 1});
        }
    } else {
        // inicializa o cookie com um novo elemento de quantidade 1
        listaItensCompras = [{produtoId: produtoId, quantidade: 1}];
    }

    // seta o cookie no local storage
    localStorage.setItem('carrinhoCompras', JSON.stringify(listaItensCompras));

    // envia para o servidor
    let url = window.location;
    let baseUrl = url .protocol + "//" + url.host + "/";

    $.ajax({
        type: 'POST',
        url: baseUrl.concat('compra/adicionar-carrinho'),
        data: {carrinhoCompras: formatarCarrinhoComprasAsCookie()},
        success: function (result) {
            criarCookie('carrinhoCount', JSON.parse(localStorage.getItem('carrinhoCompras')).length);
            atualizarNumeroCarrinhoCompras(callerElement);
        },
        error: function (result) {
            // TODO: sweet alert
        }
    });
}

/*
 * Retorna o carrinho de compras do localStorage formatado para ser setado como cookie
 */
function formatarCarrinhoComprasAsCookie() {
    let strFormatada = '';
    let parsedCarrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));

    for (let i = 0; i < parsedCarrinhoCompras.length; i++) {
        strFormatada = strFormatada.concat(
            `p${parsedCarrinhoCompras[i].produtoId}q${parsedCarrinhoCompras[i].quantidade}.`
        );
    }

    return strFormatada;
}


/*
 * Atualiza a exibição do número de produtos no carrinho
 */
function atualizarNumeroCarrinhoCompras(flickerElement) {
    const elementCarrinho = $(document).find('#carrinhoContador');
    const cookie = lerCookie('carrinhoCount');

    if (cookie) {
        // atualiza o número
        elementCarrinho.text(cookie);

        if (flickerElement) {
            // pisca a div como feedback da alteração
            flickerElement.classList.add('flicker-me');
            elementCarrinho.parent('div').addClass('flicker-me');
            setTimeout(() => {
                flickerElement.classList.remove('flicker-me');
                elementCarrinho.parent('div').removeClass('flicker-me');
            }, 600);
        }
    } else {
        // inicializa o número como 0
        elementCarrinho.text('0');
    }
}

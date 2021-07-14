// Armazena o resultado do cálculo do desconto total da compra
var quantidadeTotalCompra = 0;

// Armazena o resultado do cálculo de preço total da compra
var valorTotalCompra = 0.00;

// Armazena o resultado do cálculo do desconto total da compra
var valorTotalCompraDesconto = (0.00).toFixed(2);

// Armazena o resultado do cálculo de preço real da compra
var valorRealCompra = 0.00;

/*
 * Monta a página de compra
 */
function criarPaginaCarrinhoCompra() {
    document.getElementById('mainContentContainer').innerHTML = '';

    const paginaCompra = criarElemento('div', ['width-full']);
    const carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));

    if (carrinhoCompras.length > 0) {
        const dvCompra = criarElemento('div', ['row', 'no-m-sides']);
        const dvDetalhesCompra = criarElemento('div', ['col-lg-4', 'col-sm-12', 'compra-pg-detalhes', 'no-pad-left']);
        const dvDetalhesCompraCard = criarElemento('div', ['card', 'container', 'compra-pg-detalhes', 'width-full']);
    
        paginaCompra.innerHTML = `
            <div class="col-12 no-pad-sides">
                <!-- Título -->
                <h3 class="font-weight-bold">Carrinho</h3>
            </div>
        `;

        dvDetalhesCompraCard.setAttribute('id', 'dvDetalhesCompraCard')
        dvDetalhesCompraCard.appendChild(criarPaginaCarrinhoCompraDetalhesCompra());
        dvDetalhesCompra.appendChild(dvDetalhesCompraCard);

        dvCompra.setAttribute('id', 'paginaCarrinhoCompraContainer');
        dvCompra.appendChild(criarPaginaCarrinhoCompraItens());
        dvCompra.appendChild(dvDetalhesCompra);

        paginaCompra.appendChild(dvCompra);
    } else {
        paginaCompra.innerHTML = `
            <div class="col-12 no-pad-sides">
                <h3 class="col-12">Sem dados...</h3>
            </div>
        `;
    }

    document.getElementById('mainContentContainer').appendChild(paginaCompra);

    paginaCarrinhoCompraCalcularQuantidade();
    paginaCarrinhoCompraCalcularValorTotal();
}

/*
 * Retorna um novo elemento html do tipo container de produtos da compra
 */
function criarPaginaCarrinhoCompraItens() {
    const carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));
    const dvProdutos = criarElemento('div', ['col-lg-8', 'col-sm-12', 'no-pad-left', 'mb-2']);

    if ($('#paginaCarrinhoCompraContainer').find('#paginaCarrinhoCompraDvProdutos')) {
        $('#paginaCarrinhoCompraContainer').find('#paginaCarrinhoCompraDvProdutos').remove();
    }

    dvProdutos.setAttribute('id', 'paginaCarrinhoCompraDvProdutos');
    carrinhoCompras.forEach(item =>
        dvProdutos.appendChild(criarPaginaCarrinhoCompraNovoItem(item.produtoId, item.quantidade))
    );

    return dvProdutos;
}

/*
 * Retorna um novo elemento html do tipo item da compra
 */
function criarPaginaCarrinhoCompraNovoItem(produtoId, quantidade) {
    const dvProduto = criarElemento('div', ['col', 'no-m-sides', 'no-pad-sides', 'row', 'border', 'grid', 'bg-white', 'align-items-center']);
    const produto = Filmes.find(filme => filme.id === produtoId);

    dvProduto.innerHTML = `
        <!-- Imagem -->
        <div class="p-3 d-flex col-lg-5 col-sm-12 justify-content-center align-items-center">
            <img class="produto-img align-self-center" src="${produto.foto}">
        </div>
        <!-- Detalhes -->
        <div class="col-lg-7 col-sm-12 p-3">        
            <!-- Texto -->
            <div class="justify-text flex-column">
                <div><b>Título:</b> ${produto.titulo}</div>
                <div><b>Diretor:</b> ${produto.diretor}</div>
                <div><b>Ano:</b> ${produto.ano}</div>
                <div><b>Sinopse:</b> ${produto.sinopse}</div>
                <h4 class="text-align-center m-2">R$${produto.preco}</h4>
            </div>    
            <!-- Ações -->
            ${AcoesItemPgCompra}
        </div>
    `;
    $(dvProduto).find('#quantidadeItemCompra').val(quantidade);
    $(dvProduto).find('#quantidadeItemCompra').mask('00');
    $(dvProduto).find('#quantidadeItemCompra').change(function () {
        paginaCarrinhoCompraAtualizarQuantidadeProduto(produto.id, $(dvProduto).find('#quantidadeItemCompra').val());
    });

    $(dvProduto).find('#btnRemover').click(function() { handleRemoverCompraItem(produto.id) });

    return dvProduto;
}

/*
 * Retorna um novo elemento html dos detalhes e ações da compra
 */
function criarPaginaCarrinhoCompraDetalhesCompra() {
    const dvDetalhes = criarElemento('div', ['col', 'no-m-sides', 'no-pad-sides', 'row', 'grid', 'bg-white']);

    dvDetalhes.innerHTML = `
        <!-- Subtotal -->
        <div class="col-12 d-flex justify-content-between align-items-center border-bottom border-dark">
            <h5 id="dvDetalhesSubtotal">Subtotal (${quantidadeTotalCompra})</h5>
            <b id="dvDetalhesValorTotal">R$ ${valorTotalCompra}</b>
        </div>
        <!-- Frete -->
        <div class="col-12 d-flex justify-content-between align-items-center border-bottom border-dark">
            <h5>Frete</h5>
            <div class="clickable text-decor-link" data-toggle="modal" data-target="#modalOpcoesEntrega">Ver opções de entrega</div>
        </div>
        <!-- Descontos -->
        <div class="col-12 d-flex justify-content-between align-items-center border-bottom border-dark">
            <h5>Descontos</h5>
            <b>R$ ${valorTotalCompraDesconto}</b>
        </div>
        <!-- Valor total -->
        <div class="col-12 d-flex justify-content-between align-items-center border-bottom border-dark">
            <h5>Valor total</h5>
            <div class="d-flex flex-column text-align-end">
                <b id="dvDetalhesValorReal">R$ ${valorRealCompra}</b>
                <div>Em até ${ParcelaMaxima.parcelas}x de <b id="dvDetalhesValorParcelas">R$ ${valorRealCompra / ParcelaMaxima.parcelas}</b> sem juros</div>
            </div>
        </div>
        <!-- Ações -->
        <div class="col-12 d-flex flex-column p-3 justify-content-center bg-color-distinct-group mb-3">
            <button class="btn btn-dark box-shadow mb-2" type="button" onclick="handleContinuarCompraItem()">
                Continuar
            </button>            
            <a class="mb-2 text-align-center" href="#home">Escolher mais produtos</a>
        </div>
    `;
    
    if (!document.getElementById('modalOpcoesEntrega')) {
        document.body.innerHTML += ModalOpcoesEntrega;
    }

    atualizarDadosModalOpcoesEntrega();

    return dvDetalhes;
}

/*
 * Maneja o click do "Continuar", carregando o card de finalização da compra
 */
function handleRemoverCompraItem(produtoId) {
    const carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));
    const itemIndex = carrinhoCompras.findIndex(item => item.produtoId === produtoId);

    if (itemIndex > -1 && window.confirm('Deseja remover o item do carrinho?')) {
        carrinhoCompras.splice(itemIndex, 1);
        localStorage.setItem('carrinhoCompras', JSON.stringify(carrinhoCompras));
        atualizarNumeroCarrinhoCompras();

        if (carrinhoCompras.length > 0) {
            $('#paginaCarrinhoCompraContainer').prepend(criarPaginaCarrinhoCompraItens());
            paginaCarrinhoCompraCalcularQuantidade();
            paginaCarrinhoCompraCalcularValorTotal();
        } else {
            criarPaginaCarrinhoCompra();
        }
    }
}

/*
 * Maneja o click do "Continuar", carregando o card de finalização da compra
 */
function handleContinuarCompraItem() {
    $('#dvDetalhesCompraCard').html('');
    $('#dvDetalhesCompraCard').append(criarPaginaCarrinhoCompraDetalhesFinalCompra());
}

/*
 * Retorna um novo elemento html dos detalhes e ações finais da compra
 */
function criarPaginaCarrinhoCompraDetalhesFinalCompra() {
    const dvDetalhesFinais = criarElemento('div', ['col', 'no-m-sides', 'no-pad-sides', 'row', 'grid', 'bg-white']);

    dvDetalhesFinais.innerHTML = `
        <!-- Entrega -->
        <div class="col-12 border-bottom border-dark d-flex flex-column justify-content-center">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="freteRadioButton" id="freteRadioButtonNormal" value="normal" checked>
                <label class="form-check-label d-flex justify-content-between" for="freteRadioButtonNormal">
                    <i class="mr-1">Normal:</i> 
                    <i class="mr-1">${FreteNormal.texto} ${FreteNormal.valor ? FreteNormal.valor : ""}</i>
                    <i>${FreteNormal.prazo}</i>
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="freteRadioButton" id="freteRadioButtonExpressa" value="expressa">
                <label class="form-check-label d-flex justify-content-between" for="freteRadioButtonExpressa">
                    <i class="mr-1">Expressa:</i>
                    <i class="mr-1">${FreteExpresso.texto} ${FreteExpresso.valor ? FreteExpresso.valor : ""}</i>
                    <i>${FreteExpresso.prazo}</i>
                </label>
            </div>
        </div>
        <!-- Valor total -->
        <div class="col-12 d-flex justify-content-between align-items-center border-bottom border-dark">
        <h5>Valor total</h5>
        <div class="d-flex flex-column text-align-end">
            <b id="dvDetalhesValorReal">R$ ${valorRealCompra}</b>
        </div>
        </div>
        <!-- Ações -->
        <div class="col-12 d-flex flex-column p-3 justify-content-center bg-color-distinct-group mb-3">
            <button class="btn btn-dark box-shadow mb-2" type="button">
                Finalizar compra
            </button>            
            <a class="mb-2 text-align-center" href="#home">Escolher mais produtos</a>
        </div>
    `;

    $(dvDetalhesFinais).find('input[type=radio][name=freteRadioButton]').change(function () {
        if ($(dvDetalhesFinais).find('input[type=radio][name=freteRadioButton]:checked').val() === 'normal') {
            paginaCarrinhoCompraCalcularValorTotal(FreteNormal.valor);
        } else {
            paginaCarrinhoCompraCalcularValorTotal(FreteExpresso.valor);
        }
    });

    return dvDetalhesFinais;
}

/*
 * Atualiza a quantidade do produto armazenada no carrinho (localStorage)
 */
function paginaCarrinhoCompraAtualizarQuantidadeProduto(produtoId, novaQuantidade) {
    const carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));
    const itemCarrinhoIndex = carrinhoCompras.findIndex(item => item.produtoId === produtoId);

    if (itemCarrinhoIndex > -1) {
        carrinhoCompras[itemCarrinhoIndex].quantidade = +novaQuantidade;
        localStorage.setItem('carrinhoCompras', JSON.stringify(carrinhoCompras));
        paginaCarrinhoCompraCalcularQuantidade();
        paginaCarrinhoCompraCalcularValorTotal();
    }
}

/*
 * Calcula a quantidade de itens total e armazena o resultado na variável dedicada
 */
function paginaCarrinhoCompraCalcularQuantidade() {
    quantidadeTotalCompra = 0;
    JSON.parse(localStorage.getItem('carrinhoCompras')).forEach(item => {
        quantidadeTotalCompra += item.quantidade;
    });
    $('#dvDetalhesSubtotal').html(`Subtotal (${(quantidadeTotalCompra)})`);
}

/*
 * Calcula a quantidade de itens total e armazena o resultado na variável dedicada
 */
function paginaCarrinhoCompraCalcularValorTotal(frete) {
    const carrinhoCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));
    valorTotalCompra = 0.00;

    carrinhoCompras.forEach(produto => {
        const filmeIndex = Filmes.findIndex(filme => filme.id === produto.produtoId);

        if (filmeIndex > -1) {
            valorTotalCompra += (Filmes[filmeIndex].preco * produto.quantidade);
        }
    });

    if (frete) {
        valorTotalCompra += +frete;
    }

    valorTotalCompra = valorTotalCompra.toFixed(2);
    valorRealCompra = (valorTotalCompra - valorTotalCompraDesconto).toFixed(2);

    $('#dvDetalhesValorTotal').html(`R$ ${valorTotalCompra}`);
    $('#dvDetalhesValorReal').html(`R$ ${valorRealCompra}`);
    $('#dvDetalhesValorParcelas').html(`R$ ${(valorRealCompra / ParcelaMaxima.parcelas).toFixed(2)}`);
}

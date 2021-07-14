var dvImagemPrincipal;

/*
 * Monta a página interna do filme
 */
function criarPaginaInternaFilme(produto) {
    document.getElementById('mainContentContainer').innerHTML = '';
    const paginaInterna = criarElemento('div', ['produto-pg']);
    const dvProduto = criarElemento('div', ['row', 'no-m-sides']);
    const dvProdutoDetalhes = criarElemento('div', ['card', 'container', 'col-lg-9', 'col-sm-12', 'p-3']);
    const dvProdutoDetalhesImagens = criarElemento('div', ['d-flex', 'flex-column', 'col-12', 'justify-content-center', 'p-3']);
    const dvProdutoCompra = criarElemento('div', ['card', 'container', 'col-lg-3', 'col-sm-12', 'p-3']);

    paginaInterna.innerHTML = `
        <div class="col-12 no-pad-sides">
            <!-- Campo pesquisar -->
            <div class="mb-3">
                ${GlobalSearchField}
            </div>

            <!-- Título -->
            <h3 class="font-weight-bold">${produto.titulo}</h3>
        </div>
    `;

    dvProdutoDetalhesImagens.innerHTML = `
        <img id="dvImgPrincipal" class="produto-pg-img align-self-center clickable" src="${produto.foto}" 
            onclick="abrirImagemPrincipalEmNovaGuia('${produto.foto}')">
    `;
    dvProdutoDetalhesImagens.appendChild(criarPaginaInternaProdutoFormImageList(produto))

    dvProdutoDetalhes.appendChild(dvProdutoDetalhesImagens);
    dvProdutoDetalhes.innerHTML += `
        <!-- Divider -->
        <div class="hor-divider-dark"></div>
        <!-- Texto -->
        <div class="col-12 d-flex justify-text p-3 flex-column">
            <div><b>Título:</b> ${produto.titulo}</div>
            <div><b>Diretor:</b> ${produto.diretor}</div>
            <div><b>Ano:</b> ${produto.ano}</div>
            <div><b>Sinopse:</b> ${produto.sinopse}</div>
        </div>
        <!-- Mais detalhes do produto -->
        <div class="d-flex col-12 justify-text p-3 flex-column bg-color-distinct-group">
        <span><i><b>Mais detalhes</b></i></span>
            <div>
                <i>Avaliação:</i>
                <b class="${criarPaginaInternaEstiloNota(produto.avaliacao)}">
                    ${produto.avaliacao ? (`${produto.avaliacao.nota}/${produto.avaliacao.escala}`) : 'Sem nota'}
                </b>
            </div>
            <div><i>Entregue por:</i> ${produto.fornecedor ? produto.fornecedor : 'Sem fornecedor'}</div>
            <div>
                <i>Informações adicionais:</i> ${produto.infoExterna ? `<a href="${produto.infoExterna}">${produto.infoExterna}</a>` : 'Sem infos'}
            </div>
        </div>
    `;
    dvProdutoCompra.appendChild(criarPaginaInternaProdutoForm(produto));

    dvProduto.appendChild(dvProdutoDetalhes);
    dvProduto.appendChild(dvProdutoCompra);

    paginaInterna.appendChild(dvProduto);
    
    document.getElementById('mainContentContainer').appendChild(paginaInterna);

    localStorage.setItem('produtoEmExibicao', produto.id);
}

function criarPaginaInternaEstiloNota(avaliacao) {
    if (avaliacao) {
        const valorAbsoluto = avaliacao.nota / avaliacao.escala;

        if (valorAbsoluto > 0.7) {
            return 'text-success';
        } else if (valorAbsoluto > 0.4) {
            return 'text-waring';
        }
        return 'text-danger';
    }
}

/*
 * Monta e retorna o form da página interna do filme
 */
function criarPaginaInternaProdutoFormImageList(objetoProduto) {
    const div = criarElemento('div', ['d-flex', 'justify-content-center', 'p-3', 'm-2', 'scroll-x']);
    div.innerHTML = `<img src="${objetoProduto.foto}" class="img-thumbnail produto-img-miniature clickable" onclick="trocarImagemPrincipalExibida('${objetoProduto.foto}')"></img>`;

    if (objetoProduto.imagens) {
        objetoProduto.imagens.forEach(img =>
            div.innerHTML += `<img src="${img}" class="img-thumbnail produto-img-miniature clickable" onclick="trocarImagemPrincipalExibida('${img}')"></img>`
        );
    }

    return div;
}

/*
 * Monta e retorna o form da página interna do filme
 */
function criarPaginaInternaProdutoForm(objetoProduto) {
    const form = criarElemento('form', ['d-flex', 'flex-column', 'height-full', 'align-items-center', 'justify-content-between', 'no-m-sides']);
    form.setAttribute('method', 'post');
    form.setAttribute('action', window.location.href);

    const dvCep = criarElemento('div', ['d-flex', 'flex-column', 'height-full', 'width-full', 'align-items-center', 'justify-content-center'])
    dvCep.innerHTML = FormPgInternaProduto;
    $(dvCep).find('#cepEntregaProduto').mask('00000-000');
    $(dvCep).find('#calcFreteBtn').click(function() { calcularFrete($('#spValorFrete')) });

    const dvBotaoPrestacao = criarElemento('div', ['p-3', 'd-flex', 'justify-content-center', 'height-full', 'width-full',
        'align-items-center', 'border-top', 'border-bottom', 'border-dark']);
    const botaoPrestacao = criarElemento('button', ['btn', 'btn-secondary', 'box-shadow']);
    botaoPrestacao.innerHTML = `Prestações`;
    botaoPrestacao.setAttribute('type', 'button');
    botaoPrestacao.setAttribute('data-toggle', 'modal');
    botaoPrestacao.setAttribute('data-target', '#modalPrestacoes');
    dvBotaoPrestacao.appendChild(botaoPrestacao)

    const dvBotaoCompra = criarElemento('div', ['p-3', 'd-flex', 'justify-content-center', 'height-full', 'width-full', 'align-items-center', 'bg-color-distinct-group']);
    const botaoCompra = criarBotaoCompra(objetoProduto.preco);
    dvBotaoCompra.appendChild(botaoCompra)

    dvBotaoCompra.addEventListener('click', function () { adicionarNoCarrinho(objetoProduto, dvBotaoCompra) }, false);

    if (!document.getElementById('modalPrestacoes')) {
        document.body.innerHTML += ModalPrestacoes;
    }
    
    atualizarDadosModalPrestacoes(objetoProduto.preco);

    form.appendChild(dvCep);
    form.appendChild(dvBotaoPrestacao);
    form.appendChild(dvBotaoCompra);
    return form;
}

/*
 * Abre uma nova aba exibindo somente a imagem
 */
function abrirImagemPrincipalEmNovaGuia(imagem) {
    window.open(imagem, '_blank');
}

/*
 * Realiza a troca da imagem exibida como foto principal
 */
function trocarImagemPrincipalExibida(novaImagem) {
    $('#dvImgPrincipal').attr('src', novaImagem);
    $('#dvImgPrincipal').attr('onclick', `abrirImagemPrincipalEmNovaGuia('${novaImagem}')`);
}

/*
 * Calcula o valor do frete para o produto
 */
function calcularFrete(dvValorFrete) {
    dvValorFrete.html('Frete: Grátis!');
}
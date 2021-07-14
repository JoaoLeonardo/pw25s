/*
 * Monta a homepage no HTML
 */
function criarHomepage() {
    document.getElementById('mainContentContainer').innerHTML = `
        <div class="mb-3">
            ${GlobalSearchField}
        </div>
        <div class="col-12 mb-3 no-pad-sides">
            ${HomepageCarousel}
        </div>
        <div class="card mb-3 card-homepage">
            <h2 class="p-4 font-weight-bold">Boas vindas!</h2>
            <div class="px-4">
                <div class="hor-divider-dark"></div>
            </div>
            <p class="p-4"> 
                ${HomepageText}
            </p>
            <p class="p-4"> 
                ${HomepageText} ${HomepageText}
            </p>
            <div class="row p-2 no-m-sides justify-content-end">
                ${PageLogo}
            </div>
        </div>
    `;
    displayDestaqueProduto();
}

/*
 * Exibe os produtos de uma categoria aleatória como destaque
 */
function displayDestaqueProduto() {
    switch(Math.floor(Math.random() * 3) + 1) {
        case 1:
            displayFilmes('terror', true);
            break;
        case 2:
            displayFilmes('comedia', true);
            break;
        case 3:
            displayFilmes('cult', true);
            break;
    }
}

/*
 * Monta a lista de filmes no HTML que corresponde a categoria recebida
 */
function displayFilmes(categoria, preventClearPrevious) {
    let mainContentContainer = document.getElementById('mainContentContainer');
    let filmesCategoria = Filmes.filter(filme => filme.tipo === categoria);

    if (!preventClearPrevious) {
        mainContentContainer.innerHTML = GlobalSearchField;
    }

    filmesCategoria.forEach(item => {
        const novoFilme = criarNovoProdutoFilme(item);
        mainContentContainer.appendChild(novoFilme);
    });
}

/*
 * Retorna um novo elemento html do tipo produto
 */
function criarNovoProduto(foto, texto, preco, objetoProduto) {
    const dvContainerProduto = criarElemento('div', ['col', 'm-2', 'hoverable-box']);
    const dvProduto = criarElemento('a', ['clickable', 'no-m-sides', 'row', 'border', 'grid', 'no-text-decor', 'bg-white']);
    dvProduto.setAttribute('href', '#' + 'produto/' + objetoProduto.tipo + '/' + objetoProduto.id);

    dvProduto.innerHTML = `
        <!-- Imagem -->
        <div class="p-3 d-flex col-12 justify-content-center">
            <img class="produto-img align-self-center" src="${foto}">
        </div>
        <!-- Texto -->
        ${texto}
    `;

    const dvBotao = criarElemento('div', ['p-3', 'd-flex', 'justify-content-end']);
    const botaoCompra = criarBotaoCompra(preco);
    dvBotao.appendChild(botaoCompra)

    dvContainerProduto.appendChild(dvProduto);
    dvContainerProduto.appendChild(dvBotao);

    dvProduto.addEventListener('click', function () { abrirPaginaInternaFilme(objetoProduto) }, false);
    botaoCompra.addEventListener('click', function () { adicionarNoCarrinho(objetoProduto, dvProduto) }, false);

    return dvContainerProduto;
}

/*
 * Retorna um novo elemento html do tipo produto do tipo filme
 */
function criarNovoProdutoFilme(produto) {
    return criarNovoProduto(
        produto.foto, ` 
        <div class="justify-text p-3 flex-column">
            <div><b>Título:</b> ${produto.titulo}</div>
            <div><b>Diretor:</b> ${produto.diretor}</div>
            <div><b>Ano:</b> ${produto.ano}</div>
            <div><b>Sinopse:</b> ${produto.sinopse}</div>
        </div>`,
        produto.preco,
        produto
    );
}

/*
 * Abre a página interna do produto
 */
function abrirPaginaInternaFilme(produto) {
    criarPaginaInternaFilme(produto);
}
// Seta a execuçução inicial
window.onload = function () {
    setDisplayPage();
    resetCarrinho();
}

// Seta o ouvinte da seleção do menu
window.addEventListener("hashchange", setDisplayPage, false);

/*
 * Verifica a url da página e carrega os dados correspondentes no HTML
 * * É executado no evento de hashchange da janela
 */
function setDisplayPage() {
    if (window.location.href.includes('home')) {
        // exibe a homepage
        criarHomepage();
    } else if (window.location.href.includes('login')) {
        criarPaginaLoginUsuario();
    } else if (window.location.href.includes('cadastro')) {
        criarPaginaCadastroUsuario();
    } else if (window.location.href.includes('carrinho')) {
        criarPaginaCarrinhoCompra();
    } else if (window.location.href.includes('produtos')) {
        // exibe os filmes do tipo
        for (tipo in TiposFilmesEnum) {
            if (window.location.href.includes(TiposFilmesEnum[tipo])) {
                displayFilmes(TiposFilmesEnum[tipo]);
                return;
            }
        }
    } else if (window.location.href.includes('produto')) {
        criarPaginaInternaFilme(Filmes.find(filme => filme.id === +localStorage.getItem('produtoEmExibicao')));
    } else {
        criarHomepage();
    }
}
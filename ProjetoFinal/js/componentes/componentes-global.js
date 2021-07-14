/*
 * Retorna um novo elemento html genérico
 */
function criarElemento(elemento, classe) {
    let componente = document.createElement(elemento);
    classe.map(item => componente.classList.add(item));
    return componente;
}

/*
 * Retorna um novo elemento html do tipo botão de compra
 */
function criarBotaoCompra(preco) {
    const botaoGroup = criarElemento('div', []);

    const botao = criarElemento('button', ['btn', 'btn-success', 'box-shadow', 'mr-2', 'mb-2']);
    botao.innerHTML = `<i class="bi bi-cart" aria-hidden="true"></i>Adicionar ao carrinho`;
    botao.setAttribute('type', 'button');

    const btnPreco = criarElemento('button', ['btn', 'box-shadow', 'bg-color-primary', 'text-color-primary', 'mb-2']);
    btnPreco.innerHTML = `R$${preco}`;
    btnPreco.setAttribute('type', 'button');

    botaoGroup.appendChild(botao);
    botaoGroup.appendChild(btnPreco);
    return botaoGroup;
}

/*
 * Retorna um novo elemento html do tipo botão de compra
 */
function criarBotaoGravar() {
    const botao = criarElemento('button', ['btn', 'btn-gravar', 'fab', 'bg-success', 'text-white', 'rounded-circle']);
    botao.innerHTML = `
        <svg width="48" height="64" fill="white" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
        </svg>
    `;
    return botao;
}

/*
 * Adiciona o produto ao carrinho
 */
function adicionarNoCarrinho(produto, flickerDiv) {
    let listaItensCompras = JSON.parse(localStorage.getItem('carrinhoCompras'));

    if (listaItensCompras && listaItensCompras.length > 0) {
        const indexIncluso = listaItensCompras.findIndex(item => item.produtoId === produto.id);

        if (indexIncluso != null && indexIncluso >= 0) {
            listaItensCompras[indexIncluso].quantidade++;
        } else {
            listaItensCompras.push({ produtoId: produto.id, quantidade: 1 });
        }
    } else {
        listaItensCompras = [{ produtoId: produto.id, quantidade: 1 }];
    }

    localStorage.setItem('carrinhoCompras', JSON.stringify(listaItensCompras));
    document.getElementById('carrinhoContador').innerText = listaItensCompras.length;

    if (flickerDiv) {
        flickerDiv.classList.add('flicker-me');
        setTimeout(() => flickerDiv.classList.remove('flicker-me'), 600);
    }
}

/*
 * impa os dados armazenados do carrinho de compras
 */
function atualizarNumeroCarrinhoCompras() {
    document.getElementById('carrinhoContador').innerText = JSON.parse(localStorage.getItem('carrinhoCompras')).length;
}

/*
 * impa os dados armazenados do carrinho de compras
 */
function resetCarrinho() {
    localStorage.setItem('carrinhoCompras', JSON.stringify([]));
    document.getElementById('carrinhoContador').innerText = '0';
}

/*
 * Ajusta os dados exibidos na modal de acordo com o produto
 */
function atualizarDadosModalPrestacoes(produtoPreco) {
    const modalPrestacoesDados = document.getElementById('modalPrestacoesDados');

    if (modalPrestacoesDados) {
        let dadosModal = '';

        for (let i = 1; i <= ParcelaMaxima.parcelas; i++) {
            if (i > 1) {
                dadosModal += `<li>${i} vezes de R$ ${(produtoPreco/i).toFixed(2)}</li>`;
            } else {
                dadosModal += `<li>${i} vez de R$ ${produtoPreco}</li>`;
            }
        }

        modalPrestacoesDados.innerHTML = `<ul>${dadosModal}</ul>`;
    }
}

/*
 * Ajusta os dados exibidos na modal de acordo com os dados mais recentes de prestaçao
 */
function atualizarDadosModalOpcoesEntrega() {
    const modalOpcoesDados = document.getElementById('modalOpcoesEntregaDados');

    if (modalOpcoesDados) {
        modalOpcoesDados.innerHTML = `
            <ul>
                <li>Normal - ${FreteNormal.texto} ${FreteNormal.valor ? FreteNormal.valor : ""} | ${FreteNormal.prazo}</li>
                <li>Expressa - ${FreteExpresso.texto} ${FreteExpresso.valor ? FreteExpresso.valor : ""} | ${FreteExpresso.prazo}</li>
            </ul>
        `;
    }
}
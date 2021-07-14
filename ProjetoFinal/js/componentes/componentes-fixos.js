PageLogo = `
    <div class="divider-dark m-1"></div>
        <img class="icon-container m-1" src="bootstrap4/icons/icons/box-seam.svg"></img>
    <div class="divider-dark m-1"></div>
`

GlobalSearchField = `
    <div class="col-12 mb-3 no-pad-sides">
        <div class="input-group">
            <div class="input-group-prepend">
                <img class="input-group-text" src="bootstrap4/icons/icons/search.svg"></img>
            </div>
            <input type="text" class="form-control" id="globalSearch" placeholder="Pesquisar...">
        </div>
    <div class="col-12 mb-3 no-pad-sides">
`

HomepageCarousel = `
    <div id="carouselHome" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselHome" data-slide-to="0" class="active"></li>
            <li data-target="#carouselHome" data-slide-to="1"></li>
            <li data-target="#carouselHome" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
            <img class="d-block w-100" src="./img/twinpeaks-banner.png" alt="First slide">
            </div>
            <div class="carousel-item">
            <img class="d-block w-100" src="./img/drstrangelove-banner.jpg" alt="Second slide">
            </div>
            <div class="carousel-item">
            <img class="d-block w-100" src="./img/drstrangelove-banner-3.jpg" alt="Third slide">
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselHome" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselHome" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
`

FormCadastroAlertas = `
    <div id="successAlert" class="col-12 alert alert-success alert-dismissible fade show" role="alert">
        <strong>O cadastro foi gravado com sucesso!</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">Entendido!</span>
        </button>
    </div>

    <div id="warnAlert" class="col-12 alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Não foi possível gravar!</strong><span id="warnAlertSpan"></span>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">Entendido!</span>
        </button>
    </div>
`

FormCadastroUsuarioDadosPessoais = `
    <div class="container card row col-12 p-3 mb-3 no-m-sides">

        <div class="col-12">
            <h4 class="font-weight-bold mb-3">Dados pessoais</h4>
            <div class="mb-3">
            <div class="hor-divider-dark"></div>
        </div>

        <div class="col-12 form-group required">
            <label class="control-label" for="inputNomeCompleto">Nome completo</label>
            <input type="text" class="form-control" id="inputNomeCompleto" name="inputNomeCompleto" placeholder="Insira seu nome..." autofocus required="true">
        </div>

        <div class="col-12 form-group required">
            <label class="control-label" for="inputApelido">Apelido</label>
            <input type="text" class="form-control" id="inputApelido" name="inputApelido" placeholder="Insira um apelido..." required="true">
        </div>
                
        <div class="row no-m-sides">
            <div class="col-lg-6 col-sm-12 form-group required">
                <label class="control-label" for="inputGenero">Gênero</label>
                <select class="form-control" id="inputGenero" name="inputGenero" data-placeholder="Selecione seu gênero..." required="true">
                    <option value="MASC">Masculino</option>
                    <option value="FEM">Feminino</option>
                    <option value="OUT">Outro</option>
                </select>
            </div>

            <div class="col-lg-6 col-sm-12 form-group required">
                <label class="control-label" for="inputCPF">CPF</label>
                <input type="text" class="form-control" id="inputCPF" name="inputCPF" placeholder="000.000.000-00" required="true">
            </div>
        </div>

        <div class="row no-m-sides">
            <div class="col-lg-3 col-sm-12 form-group required">
                <label class="control-label" for="inputDataNasc">Data de nascimento</label>
                <input type="date" class="form-control" id="inputDataNasc" name="inputDataNasc" required="true">
            </div>

            <div class="col-lg-3 col-sm-6 form-group">
                <label class="control-label" for="inputTelefone">Telefone</label>
                <input type="text" class="form-control" id="inputTelefone" name="inputTelefone" placeholder="(00) 0000-0000">
            </div>

            <div class="col-lg-3 col-sm-6 form-group">
                <label class="control-label" for="inputCelular">Celular</label>
                <input type="text" class="form-control" id="inputCelular" name="inputCelular" placeholder="(00) 00000-0000">
            </div>
        </div>
                
        <div class="col-12 form-group required">
            <label class="control-label" for="inputEmail">E-mail</label>
            <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="exemplo@email.com" required="true">
        </div>    

        <div class="col-12 form-group required">
            <label class="control-label" for="inputSenha">Senha</label>
            <input type="password" class="form-control" id="inputSenha" name="inputSenha" required="true">
        </div>
                
        <div class="col-12 form-group required">
            <label class="control-label" for="inputConfirmacaoSenha">Confirme a senha</label>
            <input type="password" class="form-control" id="inputConfirmacaoSenha" name="inputConfirmacaoSenha" required="true">
        </div>

    </div>
`

FormCadastroUsuarioEndereco = `
    <div class="container card row col-12 p-3 no-m-sides">

        <div class="col-12">
            <h4 class="font-weight-bold mb-3">Endereço</h4>
            <div class="mb-3">
            <div class="hor-divider-dark"></div>
        </div>

        <div class="row no-m-sides">
            <div class="col-lg-10 col-sm-12 form-group required">
                <label class="control-label" for="inputCidade">Cidade</label>
                <input type="text" class="form-control" id="inputCidade" name="inputCidade" placeholder="Insira o nome da cidade..." required="true">
            </div>

            <div class="col-lg-2 col-sm-12 form-group required">
                <label class="control-label" for="inputEstado">Estado</label>
                <select class="form-control" id="inputEstado" name="inputEstado" data-placeholder="Selecione o estado..." required="true">
                    <option value="PR">Paraná</option>
                    <option value="RJ">Rio de janeiro</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                </select>
            </div>
        </div>

        <div class="row no-m-sides">
            <div class="col-lg-8 col-sm-12 form-group required">
                <label class="control-label" for="inputRua">Rua</label>
                <input type="text" class="form-control" id="inputRua" name="inputRua" placeholder="Insira o nome da rua..." required="true">
            </div>

            <div class="col-lg-4 col-sm-12 form-group">
                <label class="control-label" for="inputComplemento">Complemento</label>
                <input type="text" class="form-control" id="inputComplemento" name="inputComplemento" placeholder="Insira o complemento...">
            </div>
        </div>

        <div class="row no-m-sides">
            <div class="col-lg-4 col-sm-12 form-group required">
                <label class="control-label" for="inputNumeroResidencia">Número</label>
                <input type="text" class="form-control" id="inputNumeroResidencia" name="inputNumeroResidencia" placeholder="000" required="true">
            </div>
                    
            <div class="col-lg-4 col-sm-12 form-group required">
                <label class="control-label" for="inputBairro">Bairro</label>
                <input type="text" class="form-control" id="inputBairro" name="inputBairro" placeholder="Insira o nome do bairro..." required="true">
            </div>

            <div class="col-lg-4 col-sm-12 form-group required">
                <label class="control-label" for="inputCEP">CEP</label>
                <input type="text" class="form-control" id="inputCEP" name="inputCEP" placeholder="00000-000" required="true">
            </div>
        </div>
        
    </div>
`

FormLoginUsuario = `
    <div class="container card row col-12 p-3 no-m-sides">

        <div class="col-12 mb-3">
            <h4 class="font-weight-bold mb-3">Login</h4>
            <div class="mb-3"></div>
            <div class="hor-divider-dark"></div>
        </div>

        <div class="d-flex flex-column align-items-center">
            <div class="col-lg-6 col-sm-12 form-group required">
                <label class="control-label" for="inputLogin">Login</label>
                <input type="text" class="form-control" id="inputLogin" name="inputLogin" placeholder="Insira a indentificação..." required="true">
            </div>

            <div class="col-lg-6 col-sm-12 form-group required">
                <label class="control-label" for="inputSenha">Senha</label>
                <input type="password" class="form-control mb-2" id="inputSenha" name="inputSenha" required="true">
                <a href="#">Esqueci minha senha</a>
            </div>

            <div class="col-lg-6 col-sm-12 mb-2">
                <button class="btn btn-success" style="width: 100%">Confirmar</button>
            </div>
        </div>
        
        <div class="row p-2 no-m-sides justify-content-end">
            ${PageLogo}
        </div>

    </div>

    <div class="col-12 text-align-end p-3">
        <a href="#cadastro">Ainda não tem conta? Cadastre-se aqui!</a>
    </div>
`

FormPgInternaProduto = `
    <div class="input-group p-3 width-unset">
        <div class="input-group-prepend" title="Cep">
            <div class="input-group-text">CEP</div>
        </div>
        <input type="text" class="form-control produto-pg-form-cep mr-2" id="cepEntregaProduto" name="cepEntregaProduto" placeholder="00000-000">
        <span class="p-3" id="spValorFrete">Frete: </span>
    </div>

    <div class="pb-3">
        <button class="btn btn-secondary box-shadow" type="button" id="calcFreteBtn">Calcular frete</button>
    </div>
`

ModalPrestacoes = `
    <div id="modalPrestacoes" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Prestações</h5>
                    <i class="clickable" data-dismiss="modal" aria-label="Fechar">
                        <svg width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </i>
                </div>
                <div class="modal-body" id="modalPrestacoesDados"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
`

ModalOpcoesEntrega = `
    <div id="modalOpcoesEntrega" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Opções de entrega</h5>
                    <i class="clickable" data-dismiss="modal" aria-label="Fechar">
                        <svg width="24" height="24" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                    </i>
                </div>
                <div class="modal-body" id="modalOpcoesEntregaDados"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
`

AcoesItemPgCompra = `
    <div class="row p-3 align-items-center justify-content-center">
        <button id="btnRemover" class="btn btn-secondary box-shadow mb-2" type="button">
            Remover
        </button>
        <div class="input-group width-unset ml-2 mb-2" title="Quantidade">
            <div class="input-group-prepend">
                <div class="input-group-text">Qtde.</div>
            </div>
            <input type="text" class="form-control" id="quantidadeItemCompra" name="quantidadeItemCompra">
        </div>
    </div>
`;
/*
 * Monta a estrutrua página do login de um novo usuário
 */
function criarPaginaLoginUsuario() {
    document.getElementById('mainContentContainer').innerHTML = '';

    $("#mainContentContainer").append('<form id="formLoginUsuario" action="" method="POST" style="width: 100%;">');
    $("#mainContentContainer form").append('<h3 class="font-weight-bold mb-3">Login da conta</h3>');
    $("#mainContentContainer form").append(FormLoginUsuario);
}

/*
 * Cria a página do cadastro de novo usuário
 */
function criarPaginaCadastroUsuario() {
    exibirFormCadastroUsuario();
    implementarMascarasFormCadastroUsuario();

    if (localStorage.getItem('sucessoPendente') === 'true') {
        $('#successAlert').show();
        localStorage.setItem('sucessoPendente', false);
    } else {
        $('#successAlert').hide();
    }
}

/*
 * Monta a estrutrua página do cadastro de um novo usuário
 */
function exibirFormCadastroUsuario() {
    document.getElementById('mainContentContainer').innerHTML = '';

    $("#mainContentContainer").append(FormCadastroAlertas);
    $("#mainContentContainer").append('<form id="formCadastroUsuario" action="" method="POST" class="width-full">');
    $("#mainContentContainer form").append('<h3 class="font-weight-bold mb-3">Cadastro do usuário</h3>');
    $("#mainContentContainer form").append(FormCadastroUsuarioDadosPessoais);
    $("#mainContentContainer form").append(FormCadastroUsuarioEndereco);
    $("#successAlert").hide();
    $("#warnAlert").hide();

    const btnGravar = criarBotaoGravar();
    $("#mainContentContainer form").append(btnGravar)

    $(btnGravar).click(handleGravarFormCadastroUsuario);
}

/*
 * Adiciona as máscaras nos campos do form do usuário
 */
function implementarMascarasFormCadastroUsuario() {
    $("#inputCPF").mask("000.000.000-00");
    $("#inputTelefone").mask("(00) 0000-0000");
    $("#inputCelular").mask("(00) 00000-0000");
    $("#inputNumeroResidencia").mask("#.##0", { reverse: true });
    $("#inputCEP").mask("00000-000");
}

/*
 * Maneja o click do botão gravar
 */
function handleGravarFormCadastroUsuario() {
    window.scrollTo(0, 0);

    if (validarFormCadastroUsuario()) {
        $('#formCadastroUsuario').submit();
        salvarUsuario();
        localStorage.setItem('sucessoPendente', true);
    } else {
        $('#warnAlert').show();
    }
}

/*
 * Valida o preenchimento do form de cadastro do usuário
 * * Retorna true se o valor da senha for igual ao valor do confirmacaoSenha
 */
function validarFormCadastroUsuario() {
    $('#formCadastroUsuario').validate();

    if (!$('#formCadastroUsuario').valid()) {
        $('#warnAlertSpan').text(' Existem campos obrigatórios não preenchidos.');
        return false
    }

    const senha = $("#inputSenha").val();
    const confirmacao = $("#inputConfirmacaoSenha").val();

    if (senha && confirmacao && senha === confirmacao) {
        $('#warnAlertSpan').text('A senha e a confirmação da senha devem ser iguais.');
        return false;
    }

    return true;
}

/*
 * Salva o cadastro do usuário como um Json no LocalStorage
 */
function salvarUsuario() {
    const usuario = {
        nome: $('#inputNomeCompleto').val(),
        apelido: $('#inputApelido').val(),
        genero: $('#inputGenero').val(),
        cpf: $('#inputCPF').val(),
        dataNasc: $('#inputDataNasc').val(),
        telefone: $('#inputTelefone').val(),
        celular: $('#inputCelular').val(),
        email: $('#inputEmail').val(),
        senha: $('#inputSenha').val(),
        endereco: {
            rua: $('#inputRua').val(),
            complemento: $('#inputComplemento').val(),
            numeroResidencia: $('#inputNumeroResidencia').val(),
            bairro: $('#inputBairro').val(),
            cep: $('#inputCEP').val(),
        },
    };

    localStorage.setItem('usuarioCadastrado', JSON.stringify(usuario));
}

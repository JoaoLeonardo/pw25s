$(document).ready(function () {
    // inicializa a imagem principal
    implementarMascarasFormCadastroUsuario();
});

/*
 * Adiciona as máscaras nos campos do form do usuário
 */
function implementarMascarasFormCadastroUsuario() {
    console.log($.find())
    $('#cpf').mask("000.000.000-00");
    $('#telefone').mask("(00) 0000-0000");
    $('#celular').mask("(00) 00000-0000");
    $('#endereco.numero').mask("#.##0", { reverse: true });
    $('#endereco.cep').mask("00000-000");
}

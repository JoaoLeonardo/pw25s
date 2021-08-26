$(document).ready(function () {
    $("#formTrocaSenha").submit(function (e) {
        e.preventDefault();
        trocarSenha();
    });
});

function trocarSenha() {
    let url = window.location;
    let baseUrl = url.protocol + "//" + url.host + "/";
    let formVal = $("#formTrocaSenha").val();

    if (formVal) {
        $.ajax({
            type: 'POST',
            url: baseUrl.concat('login/recuperar-senha-enviar-email'),
            data: {trocaSenha: JSON.stringify(formVal)},
            success: function (response) {
                Swal.fire({
                    title: 'Atualização concluída!',
                    text: `A senha foi atualizada com sucesso.`,
                    type: 'success'
                }).then((result) => {
                        window.location = '/home';
                    }
                );
            }, error: function (data) {
                console.error(data);
                Swal.fire('Erro!', 'Não foi possível eexecutar a atualização.', 'error');
            }
        });
    }
}
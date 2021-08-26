package br.edu.utfpr.pb.pw25s.model;

import br.edu.utfpr.pb.pw25s.model.validators.CamposCoincidentes;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@CamposCoincidentes(campo = "senha", confirmacao = "confirmacaoSenha", message = "As senhas não coincidem.")
public class SenhaTrocaDto {

    private String senha;

    private String confirmacaoSenha;

    private String token;

}

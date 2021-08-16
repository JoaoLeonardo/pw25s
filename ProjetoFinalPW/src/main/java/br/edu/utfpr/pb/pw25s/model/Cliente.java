package br.edu.utfpr.pb.pw25s.model;

import br.edu.utfpr.pb.pw25s.model.validators.CamposCoincidentes;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
@CamposCoincidentes(campo = "senha", confirmacao = "confirmacaoSenha", message = "As senhas não coincidem.")
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "O e-mail deve ser preenchido.")
    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @NotEmpty(message = "O nome de usuário deve ser preenchido.")
    @Column(nullable = false, length = 40)
    private String nomeUsuario;

    @NotEmpty(message = "O nome deve ser preenchido.")
    @Column(nullable = false)
    private String nome;

    @NotEmpty(message = "O CPF deve ser preenchido.")
    @Column(nullable = false, length = 14)
    private String cpf;

    @NotEmpty(message = "A senha deve ser preenchida.")
    @Length(min = 8, message = "A senha deve possuir ao menos oito caracteres.")
    @Column(nullable = false, length = 40)
    private String senha;

    @Transient
    private String confirmacaoSenha;

    @Column(length = 14)
    private String telefone;

    @Column(length = 15)
    private String celular;

    @Column()
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern="dd-MM-YYYY")
    private Date dataNascimento;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cliente_endereco_id", referencedColumnName = "id")
    private Endereco endereco;

}

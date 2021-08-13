package br.edu.utfpr.pb.pw25s.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false, length = 40)
    private String nomeUsuario;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private Long cpf;

    @Column(nullable = false)
    private String senha;

    @Column()
    private Long telefone;

    @Column()
    private Long celular;

    @Column()
    private LocalDate dataNascimento;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cliente_endereco_id", referencedColumnName = "id")
    private Endereco endereco;

}

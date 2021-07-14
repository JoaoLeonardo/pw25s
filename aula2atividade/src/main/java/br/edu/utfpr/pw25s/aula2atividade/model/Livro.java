package br.edu.utfpr.pw25s.aula2atividade.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Livro {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "editora_id")
    private Editora editora;

    @ManyToOne
    @JoinColumn(name = "genero_id")
    private Genero genero;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private Autor autor;

    @Column(nullable = false)
    private LocalDate ano;

    @Column
    private Long isbn;

    @ManyToOne
    @JoinColumn(name = "cidade_id")
    private Cidade cidade;

    @Column(nullable = false)
    private Double valor;

}

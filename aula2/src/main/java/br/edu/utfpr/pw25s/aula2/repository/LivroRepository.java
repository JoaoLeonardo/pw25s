package br.edu.utfpr.pw25s.aula2.repository;

import br.edu.utfpr.pw25s.aula2.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface LivroRepository extends JpaRepository<Livro, Long> {

    // Retorna os Livros pesquisando por parte do nome do autor e ordenando por ano
    List<Livro> findByAutorNomeLikeOrderByAno(String nome);

    // Retornar os livros filtrando por ano
    List<Livro> findByAnoLike(LocalDate ano);

    // Retornar os livros com valores entre A* e B* ordenados por ano
    List<Livro> findByValorBetween(Double valorInicio, Double valorFinal);

}

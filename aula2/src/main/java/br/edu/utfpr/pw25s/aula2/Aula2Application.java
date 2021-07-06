package br.edu.utfpr.pw25s.aula2;

import br.edu.utfpr.pw25s.aula2.model.*;
import br.edu.utfpr.pw25s.aula2.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.time.LocalDate;

@SpringBootApplication
public class Aula2Application implements CommandLineRunner {

	@Autowired
	private LivroRepository livroRepository;

	public static void main(String[] args) { SpringApplication.run(Aula2Application.class, args); }

	@Override
	public void run(String... args) throws Exception {
		Livro livroTeste = criarTeste();
		livroRepository.save(livroTeste);
	}

	private Livro criarTeste() {
		Autor autor = new Autor();
		autor.setNome("Autor 2");

		Cidade cidade = new Cidade();
		cidade.setNome("Cidade 2");

		Editora editora = new Editora();
		editora.setNome("Editora 2");

		Genero genero = new Genero();
		genero.setDescricao("Genero 2");

		Livro livro = new Livro();
		livro.setAutor(autor);
		livro.setCidade(cidade);
		livro.setEditora(editora);
		livro.setGenero(genero);
		livro.setAno(LocalDate.now());
		livro.setIsbn(22222L);
		livro.setValor(30.00);

		return livro;
	}
}

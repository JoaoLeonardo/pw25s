package br.edu.utfpr.pb.pw25s.repository;

import br.edu.utfpr.pb.pw25s.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}

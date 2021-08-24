package br.edu.utfpr.pb.pw25s.repository;

import br.edu.utfpr.pb.pw25s.model.CompraProduto;
import br.edu.utfpr.pb.pw25s.model.CompraProdutoPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompraRepository extends JpaRepository<CompraProduto, CompraProdutoPK>  {
}

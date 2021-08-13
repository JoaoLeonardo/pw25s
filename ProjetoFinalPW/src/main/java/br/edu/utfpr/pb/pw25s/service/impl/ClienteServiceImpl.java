package br.edu.utfpr.pb.pw25s.service.impl;

import br.edu.utfpr.pb.pw25s.model.Cliente;
import br.edu.utfpr.pb.pw25s.repository.ClienteRepository;
import br.edu.utfpr.pb.pw25s.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ClienteServiceImpl extends CrudServiceImpl<Cliente, Long>  implements ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    protected JpaRepository<Cliente, Long> getRepository() { return clienteRepository; }

}

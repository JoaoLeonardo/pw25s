package br.edu.utfpr.pb.pw25s.service.impl;

import br.edu.utfpr.pb.pw25s.model.Destaque;
import br.edu.utfpr.pb.pw25s.repository.DestaqueRepository;
import br.edu.utfpr.pb.pw25s.service.DestaqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class DestaqueServiceImpl extends CrudServiceImpl<Destaque, Long> implements DestaqueService {

    @Autowired
    private DestaqueRepository destaqueRepository;

    @Override
    protected JpaRepository<Destaque, Long> getRepository() { return destaqueRepository; }

}

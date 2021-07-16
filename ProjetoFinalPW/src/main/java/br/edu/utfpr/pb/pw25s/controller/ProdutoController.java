package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("produto")
public class ProdutoController {
	
	@Autowired
	private ProdutoService produtoService;

	@GetMapping
	public String list(Model model) {
		model.addAttribute("produtos", produtoService.findAll());
		return "produto/list";
	}

	private void carregarCombos(Model model) {
		/* model.addAttribute("categorias", categoriaService.findAll());
		model.addAttribute("marcas", marcaService.findAll()); */
	}

}






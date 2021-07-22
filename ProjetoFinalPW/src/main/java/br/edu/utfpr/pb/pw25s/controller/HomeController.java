package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.Destaque;
import br.edu.utfpr.pb.pw25s.service.DestaqueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping
public class HomeController {

	@Autowired
	private DestaqueService destaqueService;

	@GetMapping
	public String mainPage(Model model) { return redirectToHome(model); }

	@GetMapping("inicio")
	public String inicio(Model model) { return redirectToHome(model); }

	@GetMapping("home")
	public String home(Model model) { return redirectToHome(model); }

	@GetMapping("start")
	public String start(Model model) { return redirectToHome(model); }

	private String redirectToHome(Model model) {
		model.addAttribute("destaques", getDestaques());
		return "index";
	}

	@ModelAttribute("destaques")
	public List<Destaque> getDestaques() { return destaqueService.findAll(); }

}

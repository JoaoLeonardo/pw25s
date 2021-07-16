package br.edu.utfpr.pb.pw25s.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("home")
public class HomeController {

	@GetMapping
	public String home() { return "index"; }
	
	@GetMapping("inicio")
	public String inicio() {
		return "inicio";
	}
}

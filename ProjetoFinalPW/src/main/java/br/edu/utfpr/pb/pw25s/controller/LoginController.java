package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.ClienteLogin;
import br.edu.utfpr.pb.pw25s.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("login")
public class LoginController extends BasicController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping()
    public String login(Model model) {
        if (!model.containsAttribute("login")) {
            model.addAttribute("login", new ClienteLogin());
        }
        return "login/form";
    }
}

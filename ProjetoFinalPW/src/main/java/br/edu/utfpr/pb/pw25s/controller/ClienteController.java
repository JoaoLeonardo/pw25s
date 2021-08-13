package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.Cliente;
import br.edu.utfpr.pb.pw25s.model.Endereco;
import br.edu.utfpr.pb.pw25s.model.enumerators.Estado;
import br.edu.utfpr.pb.pw25s.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Collections;

@Controller
@RequestMapping("cliente")
public class ClienteController extends BasicController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/login")
    public String login(Model model) {
        return "cliente/login";
    }

    @GetMapping("/cadastro")
    public String form(Model model) {
        return this.abrirForm(model, new Cliente(), new Endereco());
    }

    @PostMapping
    public String save(
            Cliente cliente,
            Endereco endereco,
            BindingResult result,
            Model model,
            RedirectAttributes attributes
    ) {
        if (result.hasErrors()) {
            return this.abrirForm(model, cliente, endereco);
        }
        clienteService.save(cliente);
        attributes.addFlashAttribute("sucesso",
                "Registro salvo com sucesso!");
        return "redirect:/cliente";
    }

    /**
     * @param model   Model do template
     * @param cliente Cliente que estará sendo editado
     * @description Retorna o template do form inserindo o cliente no model
     */
    private String abrirForm(Model model, Cliente cliente, Endereco endereco) {
        model.addAttribute("cliente", cliente);
        model.addAttribute("endereco", endereco);
        model.addAttribute("estados", getEstados());
        return "cliente/form";
    }

    @ModelAttribute("estados")
    public Estado[] getEstados() {
        return Estado.values();
    }

}

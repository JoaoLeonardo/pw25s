package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.Cliente;
import br.edu.utfpr.pb.pw25s.model.ClienteLogin;
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

import javax.validation.Valid;
import java.security.MessageDigest;

@Controller
@RequestMapping("cliente")
public class ClienteController extends BasicController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping()
    public String cliente(Model model) {
        return this.abrirForm(model, new Cliente());
    }

    @GetMapping("/cadastro")
    public String form(Model model) {
        return this.abrirForm(model, new Cliente());
    }

    @PostMapping
    public String save(
            @Valid Cliente cliente,
            BindingResult result,
            Model model,
            RedirectAttributes attributes
    ) {
        if (result.hasErrors()) {
            return this.abrirForm(model, cliente);
        }

        try {
            // cria um hash da senha e da confirmação
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");
            messageDigest.update(cliente.getSenha().getBytes());
            cliente.setSenha(new String(messageDigest.digest()));
            messageDigest.update(cliente.getConfirmacaoSenha().getBytes());
            cliente.setConfirmacaoSenha(new String(messageDigest.digest()));

            // salva o registro
            clienteService.save(cliente);
            attributes.addFlashAttribute("sucesso", "Cadastro efetuado com sucesso!");

            // redireciona para o login
            model.addAttribute("login", new ClienteLogin(cliente.getEmail(), null, null));
            return "redirect:login";
        } catch (Exception e) {
            System.out.println(e.getMessage());
            attributes.addFlashAttribute("erro", "Não foi possível salvar o registro!");
        }

        return this.abrirForm(model, cliente);
    }

    /**
     * @param model   Model do template
     * @param cliente Cliente que estará sendo editado
     * @description Retorna o template do form inserindo o cliente no model
     */
    private String abrirForm(Model model, Cliente cliente) {
        model.addAttribute("cliente", cliente);
        model.addAttribute("estados", getEstados());
        return "cliente/form";
    }

    @ModelAttribute("estados")
    public Estado[] getEstados() {
        return Estado.values();
    }

}

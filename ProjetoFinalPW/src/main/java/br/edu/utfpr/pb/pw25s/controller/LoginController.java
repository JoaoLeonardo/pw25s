package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.Cliente;
import br.edu.utfpr.pb.pw25s.model.SenhaResetToken;
import br.edu.utfpr.pb.pw25s.model.SenhaTrocaDto;
import br.edu.utfpr.pb.pw25s.repository.ClienteRepository;
import br.edu.utfpr.pb.pw25s.service.impl.ClienteServiceImpl;
import br.edu.utfpr.pb.pw25s.service.impl.SenhaResetTokenServiceImpl;
import br.edu.utfpr.pb.pw25s.util.CompanyMailer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;
import java.util.UUID;

@Controller
@RequestMapping("login")
public class LoginController extends BasicController {

    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    ClienteServiceImpl clienteService;

    @Autowired
    SenhaResetTokenServiceImpl senhaResetTokenService;

    @GetMapping()
    public String login() {
        return "login/form";
    }

    @GetMapping("recuperar-senha")
    public String recuperarSenha() {
        return "login/recuperar-senha";
    }

    @PostMapping("recuperar-senha-enviar-email")
    public ResponseEntity<String> recuperarSenhaEnviarEmail(
            HttpServletRequest request,
            @RequestParam("email") String clienteEmail
    ) {
        Optional<Cliente> cliente = clienteRepository.findByEmail(clienteEmail);

        if (cliente.isPresent()) {
            String token = UUID.randomUUID().toString();
            senhaResetTokenService.createResetSenhaToken(cliente.get(), token);
            CompanyMailer mailer = new CompanyMailer();
            String baseUrl = String.format(
                    "%s:/%s:%d", request.getScheme(), request.getServerName(), request.getServerPort()
            );

            mailer.enviarEmail(mailer.montarEmailRecuperacaoSenha(baseUrl, token, clienteEmail));
        }

        return new ResponseEntity<String>("Request pronto", HttpStatus.OK);
    }

    @GetMapping("trocar-senha")
    public String trocarSenha(@RequestParam("token") String token, Model model) {
        SenhaResetToken resetToken = senhaResetTokenService.validarSenhaResetToken(token);

        if (resetToken != null) {
            SenhaTrocaDto dto = new SenhaTrocaDto();
            dto.setToken(token);
            model.addAttribute("trocaSenha", dto);
            return "login/trocar-senha";
        }

        model.addAttribute("msgErro", "Token inválido!");
        return "layout/layout-erro";
    }

    @RequestMapping(path = "/trocar-senha", method = RequestMethod.POST)
    public ResponseEntity<String> trocarSenhaPost(@Valid SenhaTrocaDto trocaSenha) {
        // TODO: Corrigir retorno para não limpar a tela, IDÉIA (Redirecionar para login/mesma página)
        SenhaResetToken token = senhaResetTokenService.validarSenhaResetToken(trocaSenha.getToken());

        if (token != null) {
            Cliente cliente = token.getCliente();
            clienteService.resetSenha(cliente, trocaSenha.getSenha());
            return new ResponseEntity<String>("Atualização concluída!", HttpStatus.OK);
        }

        return new ResponseEntity<String>("Token inválido!", HttpStatus.INTERNAL_SERVER_ERROR);
    }


}

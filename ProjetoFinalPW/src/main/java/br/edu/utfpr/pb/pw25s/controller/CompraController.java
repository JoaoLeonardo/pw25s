package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.Produto;
import br.edu.utfpr.pb.pw25s.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("compra")
public class CompraController extends BasicController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping()
    public String login(@CookieValue("produtos") String comprasCookie, Model model) {
        if (comprasCookie != null && !comprasCookie.equals("")) {
            model.addAttribute("produtosCompra", getProdutosOfCarrinho(comprasCookie));
            return "carrinho/compra-confirmacao";
        }
        // TODO: página de erro
        return "carrinho/compra-confirmacao";
    }

    @RequestMapping(path = "/adicionar-carrinho")
    public ResponseEntity<String> set(
            @RequestParam("carrinhoCompras") String compras,
            HttpServletResponse response
    ) {
        Cookie cookieCompras = new Cookie("produtos", compras);
        cookieCompras.setSecure(true);
        cookieCompras.setMaxAge(-1);
        response.addCookie(cookieCompras);
        return new ResponseEntity<String>(cookieCompras.toString(), HttpStatus.OK);
    }

    /**
     * Processa a string do cookie para retornar os produtos (em suas respectivas quantidades)
     * @param cookie Cookie do carrinho de compras
     * @return Lista dos produtos adicionados no carrinho
     */
    private List<Produto> getProdutosOfCarrinho(String cookie) {
        List<Produto> produtosAdicionados = new ArrayList<Produto>();
        String[] itensAdicionados = cookie.split("\\.");

        for (String itemAdicionado : itensAdicionados) {
            String[] itemParcionado = itemAdicionado.split("q");
            long id = Long.parseLong(itemParcionado[0].substring(1));
            int quantidade = Integer.parseInt(itemParcionado[1]);

            produtosAdicionados.add(produtoService.findOne(id));
        }
        // TODO: Retornar CompraProdutoDto com produto + quantidade
        return produtosAdicionados;
    }

}

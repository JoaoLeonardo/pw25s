package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.Frete;
import br.edu.utfpr.pb.pw25s.model.ProdutoQuantidade;
import br.edu.utfpr.pb.pw25s.service.FreteService;
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
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("compra")
public class CompraController extends BasicController {

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private FreteService freteService;

    @GetMapping()
    public String login(@CookieValue("produtos") String comprasCookie, Model model) {
        if (comprasCookie != null && !comprasCookie.equals("")) {
            model.addAttribute("produtosCompra", getProdutosOfCarrinho(comprasCookie));
            model.addAttribute("fretes", getFretesDisponiveis());
            return "carrinho/compra-confirmacao";
        }
        // TODO: página de erro
        return "carrinho/compra-confirmacao";
    }

    @RequestMapping(path = "/atualizar-carrinho")
    public ResponseEntity<String> atualizarCarrinho(
            @RequestParam("carrinhoCompras") String compras,
            HttpServletResponse response
    ) {
        Cookie cookieCompras = new Cookie("produtos", compras);
        cookieCompras.setSecure(true);
        cookieCompras.setMaxAge(-1);
        response.addCookie(cookieCompras);
        return new ResponseEntity<String>(cookieCompras.toString(), HttpStatus.OK);
    }

    @RequestMapping(value = "/carrinho-itens", method = RequestMethod.GET)
    public String getCarrinhoItens(@CookieValue("produtos") String comprasCookie, Model model) {
        if (comprasCookie != null && !comprasCookie.equals("")) {
            model.addAttribute("produtosCompra", getProdutosOfCarrinho(comprasCookie));
            return "carrinho/compra-confirmacao :: compra-produtos";
        }
        // TODO: página de erro
        return "carrinho/compra-confirmacao";
    }

    /**
     * Calcula o total da compra com base nos produtos, quantidades e frete informados
     *
     * @param freteId Id do frete selecionado
     * @return Lista dos produtos adicionados no carrinho
     */
    @RequestMapping(value = "/total-compra")
    public  ResponseEntity<Double> getTotalCompra(
            @RequestParam long freteId,
            @CookieValue("produtos") String comprasCookie,
            HttpServletResponse response
    ) {
        double totalCompra = 0;
        List<ProdutoQuantidade> itens = getProdutosOfCarrinho(comprasCookie);
        Optional<Frete> freteSelecionado = getFretesDisponiveis().stream()
                .filter(item -> item.getId() == freteId).findFirst();

        for (ProdutoQuantidade item : itens) {
            totalCompra += item.getProduto().getValor() * item.getQuantidade();
        }

        if (freteSelecionado.isPresent() && freteSelecionado.get().getValorEntrega() != null) {
            totalCompra += freteSelecionado.get().getValorEntrega();
        }

        return new ResponseEntity<Double>(totalCompra, HttpStatus.OK);
    }

    /**
     * Processa a string do cookie para retornar os produtos (em suas respectivas quantidades)
     *
     * @param cookie Cookie do carrinho de compras
     * @return Lista dos produtos adicionados no carrinho
     */
    private List<ProdutoQuantidade> getProdutosOfCarrinho(String cookie) {
        List<ProdutoQuantidade> listProdutoQnt = new ArrayList<ProdutoQuantidade>();
        String[] itensAdicionados = cookie.split("\\.");

        for (String itemAdicionado : itensAdicionados) {
            String[] itemParte = itemAdicionado.split("q");
            long id = Long.parseLong(itemParte[0].substring(1));

            listProdutoQnt.add(new ProdutoQuantidade(produtoService.findOne(id), Integer.parseInt(itemParte[1])));
        }

        // TODO: Retornar CompraProdutoDto com produto + quantidade
        return listProdutoQnt;
    }

    /**
     * Não filtra os registros, apenas retorna os existentes
     *
     * @return Lista dos fretes disponíveis para compra
     */
    private List<Frete> getFretesDisponiveis() {
        return freteService.findAll();
    }

}

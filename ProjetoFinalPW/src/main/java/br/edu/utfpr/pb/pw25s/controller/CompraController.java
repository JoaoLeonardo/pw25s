package br.edu.utfpr.pb.pw25s.controller;

import br.edu.utfpr.pb.pw25s.model.*;
import br.edu.utfpr.pb.pw25s.service.CompraService;
import br.edu.utfpr.pb.pw25s.service.FreteService;
import br.edu.utfpr.pb.pw25s.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("compra")
public class CompraController extends BasicController {

    @Autowired
    private CompraService compraService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private FreteService freteService;

    @GetMapping()
    public String compra(@CookieValue("produtos") String comprasCookie, Model model) {
        if (comprasCookie != null && !comprasCookie.equals("")) {
            model.addAttribute("produtosCompra", getProdutosOfCarrinho(comprasCookie));
            model.addAttribute("fretes", getFretesDisponiveis());
            return "carrinho/compra-confirma";
        }
        // TODO: página de erro
        return "carrinho/compra-confirma";
    }

    @RequestMapping(path = "/final", method = RequestMethod.GET)
    public String confirmarCompra(
            @RequestParam long freteId,
            @CookieValue("produtos") String comprasCookie,
            Model model
    ) {
        if (comprasCookie != null && !comprasCookie.equals("")) {
            model.addAttribute("produtosCompra", getProdutosOfCarrinho(comprasCookie));
            model.addAttribute("valorFinal", calcularValorTotal(freteId, comprasCookie));

            Frete freteSelecionado = freteService.findOne(freteId);

            if (freteSelecionado != null) {
                model.addAttribute("frete", freteSelecionado);
            } else {
                // TODO: error
                return "carrinho/compra-confirma";
            }
            return "carrinho/compra-final";
        }
        // TODO: página de erro
        return "carrinho/compra-confirma";
    }

    @PostMapping
    public ResponseEntity<?> save(
            @RequestParam long freteId,
            @CookieValue("produtos") String comprasCookie,
            BindingResult result,
            Model model
    ) {
        try {
            if (result.hasErrors()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            compraService.save(
                    montarCompra(getProdutosOfCarrinho(comprasCookie), freteService.findOne(freteId))
            );
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
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
        return "compra-confirma";
    }

    @RequestMapping(value = "/total-compra")
    public ResponseEntity<Double> getTotalCompra(
            @RequestParam long freteId,
            @CookieValue("produtos") String comprasCookie
    ) {
        return new ResponseEntity<Double>(calcularValorTotal(freteId, comprasCookie), HttpStatus.OK);
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
     * Calcula o total da compra com base nos produtos, quantidades e frete informados
     *
     * @returns Total da compra como double
     */
    private Double calcularValorTotal(long freteId, String comprasCookie) {
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

        return BigDecimal.valueOf(totalCompra).setScale(3, RoundingMode.HALF_UP).doubleValue();
    }

    /**
     * Não filtra os registros, apenas retorna os existentes
     *
     * @return Lista dos fretes disponíveis para compra
     */
    private List<Frete> getFretesDisponiveis() {
        return freteService.findAll();
    }

    /**
     * Transforma os dados da compra em um objeto Compra
     *
     * @return Compra baseada nos produtos do carrinho e no frete selecionado
     */
    public Compra montarCompra(List<ProdutoQuantidade> produtos, Frete frete) {
        Compra compra = new Compra();
        List<CompraProduto> compraProdutos = new ArrayList<CompraProduto>();

        produtos.forEach(itemCompra -> {
            CompraProdutoPK pk = new CompraProdutoPK();
            pk.setCompra(compra);
            pk.setProduto(itemCompra.getProduto());

            CompraProduto cp = new CompraProduto();
            cp.setId(pk);
            cp.setQuantidade(itemCompra.getQuantidade());
            cp.setValor(pk.getProduto().getValor() * itemCompra.getQuantidade());
            compraProdutos.add(cp);
        });

        compra.setFrete(frete);
        compra.setData(LocalDate.now());
        compra.setCompraProdutos(compraProdutos);

        return compra;
    }

}

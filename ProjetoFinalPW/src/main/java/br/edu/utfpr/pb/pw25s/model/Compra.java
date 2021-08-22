package br.edu.utfpr.pb.pw25s.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = {"id"})
public class Compra implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente Cliente;

    @Column(nullable = false)
    private LocalDate data;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "id.compra")
    private List<CompraProduto> compraProdutos;

    public double getValorTotal() {
        return compraProdutos.stream()
                .map(cp -> cp.getValor() * cp.getQuantidade())
                .mapToDouble(Double::doubleValue).sum();
    }

}

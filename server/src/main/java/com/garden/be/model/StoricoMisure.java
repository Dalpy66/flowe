package com.garden.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;

@Entity
@Table(name = "storico_misure")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoricoMisure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sensore_id", nullable = false)
    private Sensore sensore;

    @Column(name = "timestamp", insertable = false, updatable = false)
    private OffsetDateTime timestamp;

    @Column(name = "umidita")
    private Double umidita;

    @Column(name = "temperatura")
    private Double temperatura;

    @Column(name = "ph")
    private Double ph;

    @Column(name = "conducibilita_ec")
    private Integer conducibilitaEc;

    @Column(name = "azoto_n")
    private Integer azotoN;

    @Column(name = "fosforo_p")
    private Integer fosforoP;

    @Column(name = "potassio_k")
    private Integer potassioK;
}

package com.garden.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "sensori")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sensore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "codice_sensore", nullable = false, length = 50)
    private String codiceSensore;

    @Column(nullable = false)
    private Double latitudine;

    @Column(nullable = false)
    private Double longitudine;

    @Column(name = "nome_pianta", nullable = false, length = 50)
    private String nomePianta;

    @ManyToOne
    @JoinColumn(name = "utente_id", nullable = false)
    private Utente utente;

    @Column(name = "data_installazione", insertable = false, updatable = false)
    private LocalDateTime dataInstallazione;
}
package com.garden.be.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "utenti")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "id_hub", nullable = false, unique = true, length = 150)
    private String idHub;

    @Column(name = "latitudine_hub", nullable = false)
    private Double latitudineHub;

    @Column(name = "longitudine_hub", nullable = false)
    private Double longitudineHub;

    @Column(name = "data_registrazione", insertable = false, updatable = false)
    private LocalDate dataRegistrazione;
}

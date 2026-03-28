package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.model.Utente;

import java.time.LocalDate;

public record InsertUtenteDTO(
            @JsonProperty(value = "nome", required = true)
            String nome,
            @JsonProperty(value = "email", required = true)
            String email,
            @JsonProperty(value = "id_hub", required = true)
            String idHub,
            @JsonProperty(value = "latitudine_hub", required = true)
            Double latitudineHub,
            @JsonProperty(value = "longitudine_hub", required = true)
            Double longitudineHub
) {

    public Utente toUtente() {
        Utente utente = new Utente();

        utente.setNome(this.nome());
        utente.setEmail(this.email());
        utente.setIdHub(this.idHub());
        utente.setLatitudineHub(this.latitudineHub());
        utente.setLongitudineHub(this.longitudineHub());
        utente.setDataRegistrazione(LocalDate.now());

        return utente;
    }
}

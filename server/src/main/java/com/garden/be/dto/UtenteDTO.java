package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.model.Sensore;
import com.garden.be.model.Utente;

import java.util.List;

public record UtenteDTO(
        @JsonProperty(value = "id", required = true)
        Integer id,
        @JsonProperty(value = "nome", required = true)
        String nome,
        @JsonProperty(value = "email", required = true)
        String email,
        @JsonProperty(value = "id_hub", required = true)
        String idHub,
        @JsonProperty(value = "latitudine_hub", required = true)
        Double latitudineHub,
        @JsonProperty(value = "longitudine_hub", required = true)
        Double longitudineHub,
        @JsonProperty(value = "id_sensori", required = true)
        List<Integer> idSensori
) {

    public static UtenteDTO fromUtente(Utente utente, List<Sensore> sensori) {
        return new UtenteDTO(
                utente.getId(),
                utente.getNome(),
                utente.getEmail(),
                utente.getIdHub(),
                utente.getLatitudineHub(),
                utente.getLongitudineHub(),
                sensori.stream().map(Sensore::getId).toList()
        );
    }
}

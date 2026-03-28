package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.model.Sensore;

public record InsertSensoreDTO(
        @JsonProperty(value = "codice_sensore", required = true)
        String codiceSensore,
        @JsonProperty(required = true)
        Double latitudine,
        @JsonProperty(required = true)
        Double longitudine,
        @JsonProperty(value = "nome_pianta", required = true)
        String nomePianta,
        @JsonProperty(value = "id_utente", required = true)
        Integer idUtente
) {

    public Sensore toSensore() {
        Sensore sensore = new Sensore();

        sensore.setCodiceSensore(this.codiceSensore());
        sensore.setLatitudine(this.latitudine());
        sensore.setLongitudine(this.longitudine());
        sensore.setNomePianta(this.nomePianta());

        return sensore;
    }
}

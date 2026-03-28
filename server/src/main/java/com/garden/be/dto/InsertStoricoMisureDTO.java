package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.model.StoricoMisure;

public record InsertStoricoMisureDTO(
        @JsonProperty(value = "sensor_id", required = true)
        String idSensore,

        @JsonProperty(required = true)
        Double temperatura,

        @JsonProperty(required = true)
        Double umidita,

        @JsonProperty(required = true)
        Integer conducibilita,

        @JsonProperty(required = true)
        Double ph,

        @JsonProperty(required = true)
        Integer azoto,

        @JsonProperty(required = true)
        Integer fosforo,

        @JsonProperty(required = true)
        Integer potassio,

        @JsonProperty(value = "id_convertitore", required = true)
        String idHub
) {

    public StoricoMisure toStoricoMisure() {
        StoricoMisure storicoMisure = new StoricoMisure();

        storicoMisure.setUmidita(this.umidita());
        storicoMisure.setTemperatura(this.temperatura());
        storicoMisure.setPh(this.ph());
        storicoMisure.setConducibilitaEc(this.conducibilita());
        storicoMisure.setAzotoN(this.azoto());
        storicoMisure.setFosforoP(this.fosforo());
        storicoMisure.setPotassioK(this.potassio());

        return storicoMisure;
    }
}

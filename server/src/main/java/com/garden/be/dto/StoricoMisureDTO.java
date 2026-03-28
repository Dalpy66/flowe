package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.model.StoricoMisure;

public record StoricoMisureDTO(
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
        Integer potassio
) {
    public static StoricoMisureDTO fromStoricoMisure(StoricoMisure storicoMisure) {

        return new StoricoMisureDTO(
                storicoMisure.getTemperatura(),
                storicoMisure.getUmidita(),
                storicoMisure.getConducibilitaEc(),
                storicoMisure.getPh(),
                storicoMisure.getAzotoN(),
                storicoMisure.getFosforoP(),
                storicoMisure.getPotassioK()
        );
    }
}

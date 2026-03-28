package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record SendRequestReportPiantaDTO(
        @JsonProperty(required = true)
        String pianta,

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
}

package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.enums.StatoPianta;

public record ResponseReportPiantaDTO(
        @JsonProperty(value = "report", required = true)
        String report,
        @JsonProperty(value = "stato_pianta", required = true)
        StatoPianta statoPianta
) {
}

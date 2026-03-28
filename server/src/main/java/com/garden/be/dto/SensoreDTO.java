package com.garden.be.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.garden.be.enums.StatoPianta;
import com.garden.be.model.Sensore;
import com.garden.be.model.StoricoMisure;

import java.util.List;

public record SensoreDTO(
        @JsonProperty(value = "id_sensore", required = true)
        Integer idSensore,
        @JsonProperty(value = "codice_sensore", required = true)
        String codiceSensore,
        @JsonProperty(required = true)
        Double latitudine,
        @JsonProperty(required = true)
        Double longitudine,
        @JsonProperty(value = "nome_pianta", required = true)
        String nomePianta,
        @JsonProperty(value = "stato_pianta", required = true)
        StatoPianta statoPianta,
        @JsonProperty(value = "report", required = true)
        String report,
        @JsonProperty(value = "storico_misure", required = true)
        List<StoricoMisureDTO> storicoMisureDTOList
) {

    public static SensoreDTO fromSensore(
            Sensore sensore,
            List<StoricoMisure> storicoMisure,
            ResponseReportPiantaDTO responseReportPiantaDTO
    ) {
        StatoPianta stato = (responseReportPiantaDTO != null) ? responseReportPiantaDTO.statoPianta() : null;
        String report = (responseReportPiantaDTO != null) ? responseReportPiantaDTO.report() : null;

        return new SensoreDTO(
                sensore.getId(),
                sensore.getCodiceSensore(),
                sensore.getLatitudine(),
                sensore.getLongitudine(),
                sensore.getNomePianta(),
                stato,
                report,
                storicoMisure != null
                        ? storicoMisure.stream().map(StoricoMisureDTO::fromStoricoMisure).toList()
                        : List.of()
        );
    }
}

package com.garden.be.service;

import com.garden.be.dto.InsertStoricoMisureDTO;
import com.garden.be.dto.ResponseReportPiantaDTO;
import com.garden.be.dto.SendRequestReportPiantaDTO;
import com.garden.be.model.Sensore;
import com.garden.be.model.StoricoMisure;
import com.garden.be.repository.StoricoMisureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class StoricoMisureService {
    @Value("${ai.service.ms}")
    private String aiServiceUrl;

    @Autowired
    private StoricoMisureRepository storicoMisureRepository;

    @Autowired
    private SensoreService sensoreService;

    public StoricoMisure insert(InsertStoricoMisureDTO dto) {
        StoricoMisure storicoMisure = dto.toStoricoMisure();

        Sensore sensore = this.sensoreService.getByCodiceAndHub(dto.idSensore(), dto.idHub());
        storicoMisure.setSensore(sensore);

        return this.storicoMisureRepository.save(storicoMisure);
    }

    @Async
    public CompletableFuture<List<StoricoMisure>> getAllBySensoreAsync(Integer id) {
        return CompletableFuture.completedFuture(
                this.storicoMisureRepository.findAllMisureBySensore(id)
        );
    }

    @Async // Indica a Spring di eseguire il metodo in un thread pool separato
    public CompletableFuture<ResponseReportPiantaDTO> getReport(Sensore sensore, StoricoMisure ultimaMisura) {

        SendRequestReportPiantaDTO requestBody = new SendRequestReportPiantaDTO(
                sensore.getNomePianta(),
                ultimaMisura.getTemperatura(),
                ultimaMisura.getUmidita(),
                ultimaMisura.getConducibilitaEc(),
                ultimaMisura.getPh(),
                ultimaMisura.getAzotoN(),
                ultimaMisura.getFosforoP(),
                ultimaMisura.getPotassioK()
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<SendRequestReportPiantaDTO> entityRequest = new HttpEntity<>(requestBody, headers);

        String fullUrl = aiServiceUrl + "/analyze";
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<ResponseReportPiantaDTO> response = restTemplate.postForEntity(fullUrl, entityRequest, ResponseReportPiantaDTO.class);

        return CompletableFuture.completedFuture(response.getBody());
    }
}

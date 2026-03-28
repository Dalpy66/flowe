package com.garden.be.controller;

import com.garden.be.dto.InsertStoricoMisureDTO;
import com.garden.be.dto.ResponseReportPiantaDTO;
import com.garden.be.dto.SensoreDTO;
import com.garden.be.model.Sensore;
import com.garden.be.model.StoricoMisure;
import com.garden.be.service.SensoreService;
import com.garden.be.service.StoricoMisureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/storico-misure")
public class StoricoMisureController {
    @Autowired
    private StoricoMisureService storicoMisureService;

    @Autowired
    private SensoreService sensoreService;

    @PostMapping("/register")
    public ResponseEntity<?> insert(
            @RequestBody InsertStoricoMisureDTO dto
    ) {
        this.storicoMisureService.insert(dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/storico/{idSensore}")
    public CompletableFuture<ResponseEntity<SensoreDTO>> getStorico(
            @PathVariable("idSensore") Integer idSensore
    ) {
        CompletableFuture<Sensore> sensoreFuture = this.sensoreService.getByIdAsync(idSensore);
        CompletableFuture<List<StoricoMisure>> misureFuture = this.storicoMisureService.getAllBySensoreAsync(idSensore);

        return sensoreFuture.thenCombine(misureFuture, (sensore, storicoMisure) -> {
            if (storicoMisure.isEmpty()) {
                throw new NoSuchElementException("Nessuna misura");
            }
            return Map.entry(sensore, storicoMisure);

        }).thenCompose(entry -> {
            Sensore sensore = entry.getKey();
            List<StoricoMisure> storicoMisure = entry.getValue();


            return this.storicoMisureService.getReport(sensore, storicoMisure.getFirst())
                    .thenApply(report -> ResponseEntity.ok(SensoreDTO.fromSensore(sensore, storicoMisure, report)));
        }).exceptionally(ex -> {
            if (ex.getCause() instanceof NoSuchElementException) return ResponseEntity.noContent().build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        });
    }
}

package com.garden.be.service;

import com.garden.be.dto.InsertSensoreDTO;
import com.garden.be.model.Sensore;
import com.garden.be.model.Utente;
import com.garden.be.repository.SensoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class SensoreService {
    @Autowired
    private SensoreRepository sensoreRepository;

    @Autowired
    private UtenteService utenteService;

    public Sensore insert(InsertSensoreDTO dto) {
        Sensore sensore = dto.toSensore();

        Utente utente = this.utenteService.getById(dto.idUtente());

        sensore.setUtente(utente);

        return this.sensoreRepository.save(sensore);
    }

    public Sensore getByCodiceAndHub(String codiceSensore, String idHub) {
        return this.sensoreRepository.findByCodiceAndHub(codiceSensore, idHub).orElseThrow();
    }

    @Async
    public CompletableFuture<Sensore> getByIdAsync(Integer id) {
        return CompletableFuture.completedFuture(
                this.sensoreRepository.findById(id).orElseThrow()
        );
    }

    public List<Sensore> getByUtenteId(Integer idUtente) {
        return this.sensoreRepository.findByUtenteId(idUtente);
    }
}

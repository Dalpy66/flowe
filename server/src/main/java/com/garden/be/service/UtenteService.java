package com.garden.be.service;

import com.garden.be.dto.InsertUtenteDTO;
import com.garden.be.model.Utente;
import com.garden.be.repository.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UtenteService {
    @Autowired
    private UtenteRepository utenteRepository;

    public Utente insert(InsertUtenteDTO dto) {
        return this.utenteRepository.save(dto.toUtente());
    }

    public Utente getById(Integer id) {
        return this.utenteRepository.findById(id).orElseThrow();
    }
}

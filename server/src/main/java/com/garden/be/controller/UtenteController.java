package com.garden.be.controller;

import com.garden.be.dto.InsertUtenteDTO;
import com.garden.be.dto.UtenteDTO;
import com.garden.be.model.Sensore;
import com.garden.be.model.Utente;
import com.garden.be.service.SensoreService;
import com.garden.be.service.UtenteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/utenti")
@CrossOrigin("*")
public class UtenteController {
    @Autowired
    private UtenteService utenteService;

    @Autowired
    private SensoreService sensoreService;

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody InsertUtenteDTO dto
    ) {
        this.utenteService.insert(dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/login/{idUtente}")
    public ResponseEntity<UtenteDTO> login(
            @PathVariable("idUtente") Integer idUtente
    ) {
        Utente utente = this.utenteService.getById(idUtente);
        List<Sensore> sensori = this.sensoreService.getByUtenteId(idUtente);

        return new ResponseEntity<>(UtenteDTO.fromUtente(utente, sensori), HttpStatus.OK);
    }
}

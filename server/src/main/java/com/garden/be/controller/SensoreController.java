package com.garden.be.controller;

import com.garden.be.dto.InsertSensoreDTO;
import com.garden.be.service.SensoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensori")
public class SensoreController {
    @Autowired
    private SensoreService sensoreService;

    @PostMapping("/register")
    public ResponseEntity<?> insert(
            @RequestBody InsertSensoreDTO dto
        ) {
        this.sensoreService.insert(dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }



}

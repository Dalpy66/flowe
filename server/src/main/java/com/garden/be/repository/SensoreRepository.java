package com.garden.be.repository;

import com.garden.be.model.Sensore;
import com.garden.be.model.Utente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SensoreRepository extends JpaRepository<Sensore, Integer> {

    @Query("SELECT s FROM Sensore s JOIN s.utente u WHERE s.codiceSensore = :codice AND u.idHub = :idHub")
    Optional<Sensore> findByCodiceAndHub(
            @Param("codice") String codiceSensore,
            @Param("idHub") String idHub
    );

    List<Sensore> findByUtenteId(Integer utenteId);
}

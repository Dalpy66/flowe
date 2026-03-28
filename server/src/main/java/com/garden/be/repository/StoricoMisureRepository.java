package com.garden.be.repository;

import com.garden.be.model.StoricoMisure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoricoMisureRepository extends JpaRepository<StoricoMisure, Integer> {

    @Query("SELECT sm FROM StoricoMisure sm " +
            "WHERE sm.sensore.id = :sensoreId " +
            "ORDER BY sm.timestamp DESC")
    List<StoricoMisure> findAllMisureBySensore(@Param("sensoreId") Integer sensoreId);
}

package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrescriptionRepository
        extends JpaRepository<Prescription, Long> {

    List<Prescription> findByPatientIdOrderByPrescriptionDateDesc(
            Long patientId
    );
}
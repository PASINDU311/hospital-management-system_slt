package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.LabTest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabTestRepository extends JpaRepository<LabTest, Long> {

    List<LabTest> findByPatientIdOrderByRequestDateDesc(Long patientId);
}
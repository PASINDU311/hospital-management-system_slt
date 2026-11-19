
package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByMedicalRecordNumber(String medicalRecordNumber);

    Optional<Patient> findByPhone(String phone);

    boolean existsByMedicalRecordNumber(String medicalRecordNumber);

    boolean existsByPhone(String phone);
}

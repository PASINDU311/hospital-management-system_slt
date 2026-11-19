
package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Diagnosis;
import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.repository.DiagnosisRepository;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DiagnosisService {

    private final DiagnosisRepository diagnosisRepository;
    private final PatientRepository patientRepository;

    public DiagnosisService(
            DiagnosisRepository diagnosisRepository,
            PatientRepository patientRepository) {
        this.diagnosisRepository = diagnosisRepository;
        this.patientRepository = patientRepository;
    }

    public List<Diagnosis> getDiagnosesByPatient(Long patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found: " + patientId);
        }

        return diagnosisRepository
                .findByPatientIdOrderByDiagnosisDateDesc(patientId);
    }

    @Transactional
    public Diagnosis createDiagnosis(Long patientId, Diagnosis diagnosis) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found: " + patientId));

        diagnosis.setPatient(patient);

        return diagnosisRepository.save(diagnosis);
    }

    @Transactional
    public void deleteDiagnosis(Long diagnosisId) {
        if (!diagnosisRepository.existsById(diagnosisId)) {
            throw new RuntimeException(
                    "Diagnosis not found: " + diagnosisId);
        }

        diagnosisRepository.deleteById(diagnosisId);
    }
}

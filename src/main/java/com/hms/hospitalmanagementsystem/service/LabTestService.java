package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.LabTest;
import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.repository.LabTestRepository;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabTestService {

    private final LabTestRepository labTestRepository;
    private final PatientRepository patientRepository;

    public LabTestService(
            LabTestRepository labTestRepository,
            PatientRepository patientRepository) {
        this.labTestRepository = labTestRepository;
        this.patientRepository = patientRepository;
    }

    public List<LabTest> getLabTestsByPatient(Long patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }

        return labTestRepository
                .findByPatientIdOrderByRequestDateDesc(patientId);
    }

    public LabTest createLabTest(Long patientId, LabTest labTest) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found with ID: " + patientId));

        labTest.setPatient(patient);

        return labTestRepository.save(labTest);
    }

    public void deleteLabTest(Long labTestId) {
        LabTest labTest = labTestRepository.findById(labTestId)
                .orElseThrow(() ->
                        new RuntimeException("Lab test not found with ID: " + labTestId));

        labTestRepository.delete(labTest);
    }
}
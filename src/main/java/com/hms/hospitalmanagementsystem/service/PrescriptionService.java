package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.entity.Prescription;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import com.hms.hospitalmanagementsystem.repository.PrescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrescriptionService {

    private final PrescriptionRepository prescriptionRepository;
    private final PatientRepository patientRepository;

    public PrescriptionService(
            PrescriptionRepository prescriptionRepository,
            PatientRepository patientRepository) {
        this.prescriptionRepository = prescriptionRepository;
        this.patientRepository = patientRepository;
    }

    public List<Prescription> getPrescriptionsByPatient(Long patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }

        return prescriptionRepository
                .findByPatientIdOrderByPrescriptionDateDesc(patientId);
    }

    public Prescription createPrescription(
            Long patientId, Prescription prescription) {

        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found with ID: " + patientId));

        prescription.setPatient(patient);

        return prescriptionRepository.save(prescription);
    }

    public void deletePrescription(Long prescriptionId) {
        Prescription prescription = prescriptionRepository.findById(prescriptionId)
                .orElseThrow(() ->
                        new RuntimeException("Prescription not found with ID: " + prescriptionId));

        prescriptionRepository.delete(prescription);
    }
}
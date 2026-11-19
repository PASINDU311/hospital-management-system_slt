
package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found with ID: " + id));
    }

    @Transactional
    public Patient createPatient(Patient patient) {

        if (patientRepository.existsByPhone(patient.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        patient.setMedicalRecordNumber(generateMedicalRecordNumber());

        return patientRepository.save(patient);
    }

    @Transactional
    public Patient updatePatient(Long id, Patient updatedPatient) {

        Patient existingPatient = getPatientById(id);

        patientRepository.findByPhone(updatedPatient.getPhone())
                .filter(patient -> !patient.getId().equals(id))
                .ifPresent(patient -> {
                    throw new RuntimeException("Phone number already registered");
                });

        existingPatient.setName(updatedPatient.getName());
        existingPatient.setAge(updatedPatient.getAge());
        existingPatient.setGender(updatedPatient.getGender());
        existingPatient.setPhone(updatedPatient.getPhone());
        existingPatient.setBloodGroup(updatedPatient.getBloodGroup());
        existingPatient.setAddress(updatedPatient.getAddress());

        return patientRepository.save(existingPatient);
    }

    @Transactional
    public void deletePatient(Long id) {
        Patient patient = getPatientById(id);
        patientRepository.delete(patient);
    }

    
    private String generateMedicalRecordNumber() {

        long nextNumber = 9001;

        while (patientRepository.existsByMedicalRecordNumber(
                String.format("PT-%04d", nextNumber))) {

            nextNumber++;
        }

        return String.format("PT-%04d", nextNumber);
    }

}


package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Doctor;
import com.hms.hospitalmanagementsystem.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found with ID: " + id));
    }

    public Doctor createDoctor(Doctor doctor) {

        if (doctorRepository.existsByEmail(doctor.getEmail())) {
            throw new RuntimeException("Email already exists.");
        }

        if (doctorRepository.existsByLicenseNumber(doctor.getLicenseNumber())) {
            throw new RuntimeException("License number already exists.");
        }

        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor updatedDoctor) {

        Doctor existingDoctor = getDoctorById(id);

        doctorRepository.findByEmail(updatedDoctor.getEmail())
                .ifPresent(doctor -> {
                    if (!doctor.getId().equals(id)) {
                        throw new RuntimeException("Email already exists.");
                    }
                });

        doctorRepository.findByLicenseNumber(updatedDoctor.getLicenseNumber())
                .ifPresent(doctor -> {
                    if (!doctor.getId().equals(id)) {
                        throw new RuntimeException("License number already exists.");
                    }
                });

        existingDoctor.setFirstName(updatedDoctor.getFirstName());
        existingDoctor.setLastName(updatedDoctor.getLastName());
        existingDoctor.setEmail(updatedDoctor.getEmail());
        existingDoctor.setPhone(updatedDoctor.getPhone());
        existingDoctor.setGender(updatedDoctor.getGender());
        existingDoctor.setDateOfBirth(updatedDoctor.getDateOfBirth());
        existingDoctor.setSpecialization(updatedDoctor.getSpecialization());
        existingDoctor.setDepartment(updatedDoctor.getDepartment());
        existingDoctor.setQualification(updatedDoctor.getQualification());
        existingDoctor.setExperience(updatedDoctor.getExperience());
        existingDoctor.setLicenseNumber(updatedDoctor.getLicenseNumber());
        existingDoctor.setConsultationFee(updatedDoctor.getConsultationFee());
        existingDoctor.setAddress(updatedDoctor.getAddress());

        return doctorRepository.save(existingDoctor);
    }

    public void deleteDoctor(Long id) {
        Doctor doctor = getDoctorById(id);
        doctorRepository.delete(doctor);
    }
}

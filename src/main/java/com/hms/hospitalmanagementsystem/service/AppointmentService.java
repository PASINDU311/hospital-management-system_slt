package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Appointment;
import com.hms.hospitalmanagementsystem.entity.Doctor;
import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.repository.AppointmentRepository;
import com.hms.hospitalmanagementsystem.repository.DoctorRepository;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientRepository patientRepository,
            DoctorRepository doctorRepository
    ) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository
                .findByAppointmentDateOrderByAppointmentTimeAsc(date);
    }

    public List<Appointment> getAppointmentsByDoctorAndDate(
            Long doctorId,
            LocalDate date
    ) {
        return appointmentRepository
                .findByDoctorIdAndAppointmentDateOrderByAppointmentTimeAsc(
                        doctorId, date
                );
    }

    @Transactional
    public Appointment createAppointment(
            String patientMrn,
            Long doctorId,
            LocalDate appointmentDate,
            LocalTime appointmentTime,
            String visitType,
            String priority,
            String symptoms
    ) {
        Patient patient = patientRepository
                .findByMedicalRecordNumber(patientMrn.trim())
                .orElseThrow(() ->
                        new RuntimeException("Patient not found: " + patientMrn));

        Doctor doctor = doctorRepository
                .findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found: " + doctorId));

        if (appointmentDate.isBefore(LocalDate.now())) {
            throw new RuntimeException("Appointment date cannot be in the past");
        }

        boolean slotAlreadyBooked =
                appointmentRepository
                        .existsByDoctorIdAndAppointmentDateAndAppointmentTime(
                                doctorId, appointmentDate, appointmentTime
                        );

        if (slotAlreadyBooked) {
            throw new RuntimeException("This doctor already has an appointment at that time");
        }

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(appointmentDate);
        appointment.setAppointmentTime(appointmentTime);
        appointment.setVisitType(visitType);
        appointment.setPriority(priority);
        appointment.setSymptoms(symptoms);
        appointment.setStatus("Confirmed");
        appointment.setRoom("Not Assigned");

        return appointmentRepository.save(appointment);
    }

    public void deleteAppointment(Long appointmentId) {
        if (!appointmentRepository.existsById(appointmentId)) {
            throw new RuntimeException("Appointment not found: " + appointmentId);
        }

        appointmentRepository.deleteById(appointmentId);
    }
}
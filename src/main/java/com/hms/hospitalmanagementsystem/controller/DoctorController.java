
package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.Doctor;
import com.hms.hospitalmanagementsystem.service.DoctorService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @PostMapping
    public ResponseEntity<Doctor> createDoctor(
            @RequestBody Doctor doctor) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(doctorService.createDoctor(doctor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(
            @PathVariable Long id,
            @RequestBody Doctor doctor) {
        return ResponseEntity.ok(
                doctorService.updateDoctor(id, doctor));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.noContent().build();
    }
}

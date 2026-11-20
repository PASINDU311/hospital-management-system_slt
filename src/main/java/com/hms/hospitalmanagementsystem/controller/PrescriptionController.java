package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.Prescription;
import com.hms.hospitalmanagementsystem.service.PrescriptionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/{patientId}/prescriptions")
@CrossOrigin(origins = "http://localhost:5173")
public class PrescriptionController {

    private final PrescriptionService prescriptionService;

    public PrescriptionController(PrescriptionService prescriptionService) {
        this.prescriptionService = prescriptionService;
    }

    @GetMapping
    public List<Prescription> getPrescriptions(
            @PathVariable Long patientId) {
        return prescriptionService.getPrescriptionsByPatient(patientId);
    }

    @PostMapping
    public Prescription createPrescription(
            @PathVariable Long patientId,
            @RequestBody Prescription prescription) {
        return prescriptionService.createPrescription(patientId, prescription);
    }

    @DeleteMapping("/{prescriptionId}")
    public void deletePrescription(
            @PathVariable Long patientId,
            @PathVariable Long prescriptionId) {
        prescriptionService.deletePrescription(prescriptionId);
    }
}
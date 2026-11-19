
package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.Diagnosis;
import com.hms.hospitalmanagementsystem.service.DiagnosisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/{patientId}/diagnoses")
@CrossOrigin(origins = "http://localhost:5173")
public class DiagnosisController {

    private final DiagnosisService diagnosisService;

    public DiagnosisController(DiagnosisService diagnosisService) {
        this.diagnosisService = diagnosisService;
    }

    @GetMapping
    public ResponseEntity<List<Diagnosis>> getDiagnoses(
            @PathVariable Long patientId) {
        return ResponseEntity.ok(
                diagnosisService.getDiagnosesByPatient(patientId));
    }

    @PostMapping
    public ResponseEntity<Diagnosis> createDiagnosis(
            @PathVariable Long patientId,
            @RequestBody Diagnosis diagnosis) {

        Diagnosis savedDiagnosis =
                diagnosisService.createDiagnosis(patientId, diagnosis);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedDiagnosis);
    }

    @DeleteMapping("/{diagnosisId}")
    public ResponseEntity<Void> deleteDiagnosis(
            @PathVariable Long patientId,
            @PathVariable Long diagnosisId) {

        diagnosisService.deleteDiagnosis(diagnosisId);
        return ResponseEntity.noContent().build();
    }
}

package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.LabTest;
import com.hms.hospitalmanagementsystem.service.LabTestService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/{patientId}/lab-tests")
@CrossOrigin(origins = "http://localhost:5173")
public class LabTestController {

    private final LabTestService labTestService;

    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @GetMapping
    public List<LabTest> getLabTests(@PathVariable Long patientId) {
        return labTestService.getLabTestsByPatient(patientId);
    }

    @PostMapping
    public LabTest createLabTest(
            @PathVariable Long patientId,
            @RequestBody LabTest labTest) {
        return labTestService.createLabTest(patientId, labTest);
    }

    @DeleteMapping("/{labTestId}")
    public void deleteLabTest(@PathVariable Long patientId,
                              @PathVariable Long labTestId) {
        labTestService.deleteLabTest(labTestId);
    }
}
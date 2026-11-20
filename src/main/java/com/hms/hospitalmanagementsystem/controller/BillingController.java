package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.Billing;
import com.hms.hospitalmanagementsystem.service.BillingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/{patientId}/billing")
@CrossOrigin(origins = "http://localhost:5173")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @GetMapping
    public List<Billing> getBilling(@PathVariable Long patientId) {
        return billingService.getBillingByPatient(patientId);
    }

    @PostMapping
    public Billing createBilling(
            @PathVariable Long patientId,
            @RequestBody Billing billing) {
        return billingService.createBilling(patientId, billing);
    }

    @DeleteMapping("/{billingId}")
    public void deleteBilling(
            @PathVariable Long patientId,
            @PathVariable Long billingId) {
        billingService.deleteBilling(billingId);
    }
}
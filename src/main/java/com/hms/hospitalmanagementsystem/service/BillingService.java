package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Billing;
import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.repository.BillingRepository;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class BillingService {

    private final BillingRepository billingRepository;
    private final PatientRepository patientRepository;

    public BillingService(
            BillingRepository billingRepository,
            PatientRepository patientRepository) {
        this.billingRepository = billingRepository;
        this.patientRepository = patientRepository;
    }

    public List<Billing> getBillingByPatient(Long patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }

        return billingRepository.findByPatientIdOrderByInvoiceDateDesc(patientId);
    }

    public Billing createBilling(Long patientId, Billing billing) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException(
                        "Patient not found with ID: " + patientId));

        BigDecimal total = billing.getTotalAmount();
        BigDecimal paid = billing.getPaidAmount();

        if (total == null || paid == null) {
            throw new RuntimeException("Total amount and paid amount are required.");
        }

        if (total.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("Total amount must be greater than zero.");
        }

        if (paid.compareTo(BigDecimal.ZERO) < 0) {
            throw new RuntimeException("Paid amount cannot be negative.");
        }

        if (paid.compareTo(total) > 0) {
            throw new RuntimeException("Paid amount cannot exceed total amount.");
        }

        BigDecimal balance = total.subtract(paid);

        billing.setPatient(patient);
        billing.setBalance(balance);

        if (balance.compareTo(BigDecimal.ZERO) == 0) {
            billing.setPaymentStatus("Paid");
        } else if (paid.compareTo(BigDecimal.ZERO) > 0) {
            billing.setPaymentStatus("Partially Paid");
        } else {
            billing.setPaymentStatus("Pending");
        }

        return billingRepository.save(billing);
    }

    public void deleteBilling(Long billingId) {
        Billing billing = billingRepository.findById(billingId)
                .orElseThrow(() -> new RuntimeException(
                        "Billing record not found with ID: " + billingId));

        billingRepository.delete(billing);
    }
}
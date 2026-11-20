package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.Billing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    List<Billing> findByPatientIdOrderByInvoiceDateDesc(Long patientId);

}
package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.TreatmentTimeline;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TreatmentTimelineRepository
        extends JpaRepository<TreatmentTimeline, Long> {

    List<TreatmentTimeline> findByPatientIdOrderByVisitDateDesc(Long patientId);
}
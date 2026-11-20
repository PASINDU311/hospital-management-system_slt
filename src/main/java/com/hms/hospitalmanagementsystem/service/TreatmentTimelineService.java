package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Patient;
import com.hms.hospitalmanagementsystem.entity.TreatmentTimeline;
import com.hms.hospitalmanagementsystem.repository.PatientRepository;
import com.hms.hospitalmanagementsystem.repository.TreatmentTimelineRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TreatmentTimelineService {

    private final TreatmentTimelineRepository timelineRepository;
    private final PatientRepository patientRepository;

    public TreatmentTimelineService(
            TreatmentTimelineRepository timelineRepository,
            PatientRepository patientRepository) {
        this.timelineRepository = timelineRepository;
        this.patientRepository = patientRepository;
    }

    public List<TreatmentTimeline> getTimelineByPatient(Long patientId) {
        if (!patientRepository.existsById(patientId)) {
            throw new RuntimeException("Patient not found with ID: " + patientId);
        }

        return timelineRepository.findByPatientIdOrderByVisitDateDesc(patientId);
    }

    public TreatmentTimeline createTimeline(Long patientId, TreatmentTimeline timeline) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException(
                        "Patient not found with ID: " + patientId));

        timeline.setId(null);
        timeline.setPatient(patient);

        return timelineRepository.save(timeline);
    }

    public void deleteTimeline(Long timelineId) {
        TreatmentTimeline timeline = timelineRepository.findById(timelineId)
                .orElseThrow(() -> new RuntimeException(
                        "Treatment record not found with ID: " + timelineId));

        timelineRepository.delete(timeline);
    }
}
package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.TreatmentTimeline;
import com.hms.hospitalmanagementsystem.service.TreatmentTimelineService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients/{patientId}/treatment-timeline")
@CrossOrigin(origins = "http://localhost:5173")
public class TreatmentTimelineController {

    private final TreatmentTimelineService timelineService;

    public TreatmentTimelineController(TreatmentTimelineService timelineService) {
        this.timelineService = timelineService;
    }

    @GetMapping
    public List<TreatmentTimeline> getTimeline(@PathVariable Long patientId) {
        return timelineService.getTimelineByPatient(patientId);
    }

    @PostMapping
    public TreatmentTimeline createTimeline(
            @PathVariable Long patientId,
            @RequestBody TreatmentTimeline timeline) {
        return timelineService.createTimeline(patientId, timeline);
    }

    @DeleteMapping("/{timelineId}")
    public void deleteTimeline(
            @PathVariable Long patientId,
            @PathVariable Long timelineId) {
        timelineService.deleteTimeline(timelineId);
    }
}
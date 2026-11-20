
package com.hms.hospitalmanagementsystem.controller;

import com.hms.hospitalmanagementsystem.entity.DoctorSchedule;
import com.hms.hospitalmanagementsystem.service.DoctorScheduleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/doctor-schedules")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorScheduleController {

    private final DoctorScheduleService scheduleService;

    public DoctorScheduleController(DoctorScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping
    public ResponseEntity<List<DoctorSchedule>> getAllSchedules() {
        return ResponseEntity.ok(scheduleService.getAllSchedules());
    }

    @GetMapping("/date/{date}")
    public ResponseEntity<List<DoctorSchedule>> getSchedulesByDate(
            @PathVariable LocalDate date) {
        return ResponseEntity.ok(
                scheduleService.getSchedulesByDate(date));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<DoctorSchedule>> getSchedulesByDoctor(
            @PathVariable Long doctorId) {
        return ResponseEntity.ok(
                scheduleService.getSchedulesByDoctor(doctorId));
    }

    @GetMapping("/doctor/{doctorId}/date/{date}")
    public ResponseEntity<List<DoctorSchedule>> getSchedulesByDoctorAndDate(
            @PathVariable Long doctorId,
            @PathVariable LocalDate date) {
        return ResponseEntity.ok(
                scheduleService.getSchedulesByDoctorAndDate(doctorId, date));
    }

    @PostMapping
    public ResponseEntity<?> createSchedule(
            @RequestBody ScheduleRequest request) {

        try {
            DoctorSchedule schedule = scheduleService.createSchedule(
                    request.getDoctorId(),
                    request.getScheduleDate(),
                    request.getStartTime(),
                    request.getEndTime(),
                    request.getActivity(),
                    request.getRoom(),
                    request.getStatus()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(schedule);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    java.util.Map.of("message", e.getMessage())
            );
        }
    }

    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(
            @PathVariable Long scheduleId) {
        scheduleService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }

    public static class ScheduleRequest {

        private Long doctorId;
        private LocalDate scheduleDate;
        private LocalTime startTime;
        private LocalTime endTime;
        private String activity;
        private String room;
        private String status;

        public Long getDoctorId() {
            return doctorId;
        }

        public void setDoctorId(Long doctorId) {
            this.doctorId = doctorId;
        }

        public LocalDate getScheduleDate() {
            return scheduleDate;
        }

        public void setScheduleDate(LocalDate scheduleDate) {
            this.scheduleDate = scheduleDate;
        }

        public LocalTime getStartTime() {
            return startTime;
        }

        public void setStartTime(LocalTime startTime) {
            this.startTime = startTime;
        }

        public LocalTime getEndTime() {
            return endTime;
        }

        public void setEndTime(LocalTime endTime) {
            this.endTime = endTime;
        }

        public String getActivity() {
            return activity;
        }

        public void setActivity(String activity) {
            this.activity = activity;
        }

        public String getRoom() {
            return room;
        }

        public void setRoom(String room) {
            this.room = room;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }
    }
}


package com.hms.hospitalmanagementsystem.service;

import com.hms.hospitalmanagementsystem.entity.Doctor;
import com.hms.hospitalmanagementsystem.entity.DoctorSchedule;
import com.hms.hospitalmanagementsystem.repository.DoctorRepository;
import com.hms.hospitalmanagementsystem.repository.DoctorScheduleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class DoctorScheduleService {

    private final DoctorScheduleRepository scheduleRepository;
    private final DoctorRepository doctorRepository;

    public DoctorScheduleService(
            DoctorScheduleRepository scheduleRepository,
            DoctorRepository doctorRepository) {
        this.scheduleRepository = scheduleRepository;
        this.doctorRepository = doctorRepository;
    }

    public List<DoctorSchedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public List<DoctorSchedule> getSchedulesByDate(LocalDate date) {
        return scheduleRepository.findByScheduleDateOrderByStartTimeAsc(date);
    }

    public List<DoctorSchedule> getSchedulesByDoctorAndDate(
            Long doctorId, LocalDate date) {
        return scheduleRepository
                .findByDoctorIdAndScheduleDateOrderByStartTimeAsc(doctorId, date);
    }

    public List<DoctorSchedule> getSchedulesByDoctor(Long doctorId) {
        return scheduleRepository
                .findByDoctorIdOrderByScheduleDateAscStartTimeAsc(doctorId);
    }

    public DoctorSchedule createSchedule(
            Long doctorId,
            LocalDate scheduleDate,
            LocalTime startTime,
            LocalTime endTime,
            String activity,
            String room,
            String status) {

        if (startTime == null || endTime == null
                || !startTime.isBefore(endTime)) {
            throw new IllegalArgumentException(
                    "End time must be after start time");
        }

        if (scheduleDate == null || scheduleDate.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                    "Schedule date cannot be in the past");
        }

        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found: " + doctorId));

        List<DoctorSchedule> existingSchedules =
                scheduleRepository
                        .findByDoctorIdAndScheduleDateOrderByStartTimeAsc(
                                doctorId, scheduleDate);

        for (DoctorSchedule existing : existingSchedules) {
            boolean overlaps = startTime.isBefore(existing.getEndTime())
                    && endTime.isAfter(existing.getStartTime());

            if (overlaps) {
                throw new IllegalArgumentException(
                        "Doctor already has a schedule during this time");
            }
        }

        DoctorSchedule schedule = new DoctorSchedule();
        schedule.setDoctor(doctor);
        schedule.setScheduleDate(scheduleDate);
        schedule.setStartTime(startTime);
        schedule.setEndTime(endTime);
        schedule.setActivity(activity);
        schedule.setRoom(room);
        schedule.setStatus(
                status == null || status.isBlank() ? "Available" : status);

        return scheduleRepository.save(schedule);
    }

    public void deleteSchedule(Long scheduleId) {
        if (!scheduleRepository.existsById(scheduleId)) {
            throw new RuntimeException(
                    "Schedule not found: " + scheduleId);
        }

        scheduleRepository.deleteById(scheduleId);
    }
}

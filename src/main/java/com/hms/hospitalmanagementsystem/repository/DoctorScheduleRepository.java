package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Long> {

    List<DoctorSchedule> findByScheduleDateOrderByStartTimeAsc(LocalDate scheduleDate);

    List<DoctorSchedule> findByDoctorIdAndScheduleDateOrderByStartTimeAsc(
            Long doctorId,
            LocalDate scheduleDate
    );

    List<DoctorSchedule> findByDoctorIdOrderByScheduleDateAscStartTimeAsc(Long doctorId);
}
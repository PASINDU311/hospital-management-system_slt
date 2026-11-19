
package com.hms.hospitalmanagementsystem.repository;

import com.hms.hospitalmanagementsystem.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByEmail(String email);

    Optional<Doctor> findByLicenseNumber(String licenseNumber);

    boolean existsByEmail(String email);

    boolean existsByLicenseNumber(String licenseNumber);
}

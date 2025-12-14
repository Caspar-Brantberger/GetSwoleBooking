package com.CasparBrantberger.getSwoleBooking.repository;

import com.CasparBrantberger.getSwoleBooking.model.AccesStatus;
import com.CasparBrantberger.getSwoleBooking.model.GymAcces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GymAccesRepository  extends JpaRepository<GymAcces, Long> {

    List<GymAcces> findByUserId(Long userId);

    List<GymAcces> findByAccesOptionId(Long accesOptionId);
    List<GymAcces> findByStatus(AccesStatus status);
}

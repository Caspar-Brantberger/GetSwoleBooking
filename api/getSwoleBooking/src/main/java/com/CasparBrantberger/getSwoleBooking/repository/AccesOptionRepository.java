package com.CasparBrantberger.getSwoleBooking.repository;

import com.CasparBrantberger.getSwoleBooking.model.AccesOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  AccesOptionRepository extends JpaRepository<AccesOption, Long> {

}

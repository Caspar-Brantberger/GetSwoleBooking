package com.CasparBrantberger.getSwoleBooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GymAccesDTO {
    private Long id;
    private long userId;
    private String username;
    private Long accesOptionId;
    private String accesOptionType;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}

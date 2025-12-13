package com.CasparBrantberger.getSwoleBooking.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccesOptionDTO {
    private Long id;
    private String type;
    private String description;
    private double price;
}

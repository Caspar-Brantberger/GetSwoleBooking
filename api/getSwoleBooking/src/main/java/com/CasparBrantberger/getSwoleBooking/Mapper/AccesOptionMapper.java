package com.CasparBrantberger.getSwoleBooking.Mapper;

import com.CasparBrantberger.getSwoleBooking.dto.AccesOptionDTO;
import com.CasparBrantberger.getSwoleBooking.model.AccesOption;

public class AccesOptionMapper {
    public static AccesOptionDTO toDTO(AccesOption option){
        AccesOptionDTO dto = new AccesOptionDTO();
        dto.setId(option.getId());
        dto.setType(option.getType());
        dto.setDescription(option.getDescription());
        dto.setPrice(option.getPrice());
        return dto;
    }
    public static AccesOption toEntity(AccesOptionDTO dto){
        AccesOption option = new AccesOption();
        option.setId(dto.getId());
        option.setType(dto.getType());
        option.setDescription(dto.getDescription());
        option.setPrice(dto.getPrice());
        return option;

    }
}

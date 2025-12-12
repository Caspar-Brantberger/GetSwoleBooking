package Mapper;

import dto.AccesOptionDTO;
import model.AccesOption;

public class AccesOptionMapper {
    public static AccesOptionDTO toDTO(AccesOption option){
        AccesOptionDTO dto = new AccesOptionDTO();
        dto.setId(option.getId());
        dto.setType(option.getType());
        dto.setPrice(option.getPrice());
        return dto;
    }
    public static AccesOption toEntity(AccesOptionDTO dto){
        AccesOption option = new AccesOption();
        option.setId(dto.getId());
        option.setType(dto.getType());
        option.setPrice(dto.getPrice());
        return option;

    }
}

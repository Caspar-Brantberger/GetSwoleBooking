package Mapper;

import dto.GymDTO;
import model.Gym;

public class GymMapper {
    public static GymDTO toDTO(Gym gym) {
        GymDTO gymDTO = new GymDTO();
        gymDTO.setId(gym.getId());
        gymDTO.setName(gym.getName());
        return gymDTO;

    }
    public static Gym toEntity(GymDTO gymDTO) {
        Gym gym = new Gym();
        gym.setId(gymDTO.getId());
        gym.setName(gymDTO.getName());
        return gym;
    }
}

package service;

import Mapper.GymMapper;
import dto.GymDTO;
import jakarta.persistence.EntityNotFoundException;
import model.Gym;
import org.springframework.stereotype.Service;
import repository.AccesOptionRepository;
import repository.GymRepository;

@Service
public class GymService {

    private final GymRepository gymRepository;
    private final AccesOptionRepository accesOptionRepository;

    public GymService(GymRepository gymRepository, AccesOptionRepository accesOptionRepository) {
        this.gymRepository = gymRepository;
        this.accesOptionRepository = accesOptionRepository;
    }

    public GymDTO getGym(Long gymId) {
        Gym gym = gymRepository.findGymWithAccesOptions(gymId)
                .orElseThrow(() -> new EntityNotFoundException("Gym not found for id:" + gymId));
        return GymMapper.toDTO(gym);
    }

    public GymDTO createGym(GymDTO gymDTO) {
        Gym gym = GymMapper.toEntity(gymDTO);
        gym = gymRepository.save(gym);
        return GymMapper.toDTO(gym);
    }
    public GymDTO updateGym(GymDTO gymDTO) {
        return null;
    }
    public void deleteGym(Long gymId) {
        gymRepository.deleteById(gymId);
    }
}

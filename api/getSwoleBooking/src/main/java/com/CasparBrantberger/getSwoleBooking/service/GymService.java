package com.CasparBrantberger.getSwoleBooking.service;

import com.CasparBrantberger.getSwoleBooking.dto.AccesOptionDTO;
import com.CasparBrantberger.getSwoleBooking.dto.GymDTO;
import jakarta.persistence.EntityNotFoundException;
import com.CasparBrantberger.getSwoleBooking.model.AccesOption;
import com.CasparBrantberger.getSwoleBooking.model.Gym;
import org.springframework.stereotype.Service;
import com.CasparBrantberger.getSwoleBooking.repository.AccesOptionRepository;
import com.CasparBrantberger.getSwoleBooking.repository.GymRepository;

import java.util.List;
import java.util.stream.Collectors;

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

        GymDTO dto = new GymDTO();
        dto.setId(gym.getId());
        dto.setName(gym.getName());
        dto.setAccesOptions(
                gym.getAccesOptions().stream()
                        .map(opt -> new AccesOptionDTO(opt.getId(), opt.getType(),opt.getDescription() ,opt.getPrice()))
                        .collect(Collectors.toList())
        );
        return dto;
    }
    public List<GymDTO> getAllGyms(){
        return gymRepository.findAll().stream().map(gym  -> {
          GymDTO dto = new GymDTO();
          dto.setId(gym.getId());
          dto.setName(gym.getName());
          dto.setAccesOptions(gym.getAccesOptions().stream()
                  .map(opt -> new AccesOptionDTO(opt.getId(), opt.getType(),opt.getDescription() ,opt.getPrice()))
                  .collect(Collectors.toList())
          );
          return dto;
        })
                .collect(Collectors.toList());
    }

    public GymDTO createGym(GymDTO gymDTO) {
        Gym gym = new Gym();
        gym.setName(gymDTO.getName());
        Gym saved = gymRepository.save(gym);

        GymDTO dto = new GymDTO();
        dto.setId(saved.getId());
        dto.setName(saved.getName());
        dto.setAccesOptions(null);
        return dto;
    }

    public GymDTO updateGym(Long gymId,GymDTO gymDTO) {
        Gym gym = gymRepository.findById(gymId).orElseThrow(() -> new EntityNotFoundException("Gym not found for id:" + gymId));

        gym.setName(gymDTO.getName());
        Gym saved = gymRepository.save(gym);

        GymDTO dto = new GymDTO();
        dto.setId(saved.getId());
        dto.setName(saved.getName());
        dto.setAccesOptions(saved.getAccesOptions().stream()
                .map(opt -> new AccesOptionDTO(opt.getId(), opt.getType(),opt.getDescription() ,opt.getPrice()))
                .collect(Collectors.toList())
        );
        return dto;
    }

    public void deleteGym(Long gymId) {
        if(!gymRepository.existsById(gymId)){
            throw new EntityNotFoundException("Gym not found for id:" + gymId);
        }
        gymRepository.deleteById(gymId);
    }

    public AccesOptionDTO addAccesOptionToGym(Long gymId, AccesOptionDTO accesOptionDTO) {
        Gym gym = gymRepository.findById(gymId).orElseThrow(() -> new EntityNotFoundException("Gym not found for id:" + gymId));
        AccesOption option = new AccesOption();

        option.setType(accesOptionDTO.getType());
        option.setPrice(accesOptionDTO.getPrice());
        option.setDescription(accesOptionDTO.getDescription());
        option.setGym(gym);

        AccesOption saved = accesOptionRepository.save(option);

        return new AccesOptionDTO(
                saved.getId(),
                saved.getType(),
                saved.getDescription(),
                saved.getPrice()
        );
    }
    public AccesOptionDTO updateAccesOption(Long gymId, Long accesOptionId, AccesOptionDTO accesOptionDTO) {
        AccesOption option = accesOptionRepository.findById(accesOptionId).orElseThrow(() -> new EntityNotFoundException("AccesOption not found for id:" + accesOptionId));
        option.setType(accesOptionDTO.getType());
        option.setPrice(accesOptionDTO.getPrice());
        option.setDescription(accesOptionDTO.getDescription());
        AccesOption saved = accesOptionRepository.save(option);

        return new AccesOptionDTO(
                saved.getId(),
                saved.getType(),
                saved.getDescription(),
                saved.getPrice()
        );
    }

    public AccesOptionDTO getAccesOption(Long gymId, Long accesOptionId) {
        AccesOption option = accesOptionRepository.findById(accesOptionId).orElseThrow(() -> new EntityNotFoundException("AccesOption not found for id:" + accesOptionId));
        return new AccesOptionDTO(option.getId(), option.getType(), option.getDescription(), option.getPrice());
    }

    public List<AccesOptionDTO> getAllAccesOption(){
        return accesOptionRepository.findAll().stream().map(option -> new AccesOptionDTO(option.getId(),
                option.getType(),option.getDescription(), option.getPrice())).collect(Collectors.toList());
    }

    public void deleteAccesOptionFromGym(Long gymId, Long accesOptionId) {
        Gym gym = gymRepository.findById(gymId).orElseThrow(() -> new EntityNotFoundException("Gym not found for id:" + gymId));

        AccesOption option = gym.getAccesOptions().stream()
                .filter(accesOption -> accesOption.getId().equals(accesOptionId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("AccesOption not found for id:" + accesOptionId));

        gym.getAccesOptions().remove(option);
        accesOptionRepository.delete(option);
    }


}
